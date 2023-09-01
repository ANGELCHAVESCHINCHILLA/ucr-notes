#include <map>
#include <string>

class Object;
class Array;
class Function;

class Variant {
 public:
  enum Type {
    undefined,
    null,
    boolean,
    number,
    string,
    object,
    array,
    function,
  };

  union Value {
    bool boolean;
    double number;
    std::string string;
    Object object;
    Array array;
    Function function;

    Value(bool boolean) : boolean(boolean) { }
    Value(double number) : number(number) { }
    Value(const std::string& string) : string(string) { }
    Value(const Object& object) : object(object) { }
    Value(const Array& array) : array(array) { }
    Value(const Function& function) : function(function) { }
  };

 protected:
  Type type;
  Value value;

 public:
  Variant() : type(undefined), value(false) { }
  explicit Variant(bool value) : type(Variant::boolean), value(value) { }
  explicit Variant(double value) : type(Variant::number), value(value) { }
  explicit Variant(const std::string& value) : type(Variant::string), value(value) { }
  explicit Variant(const Object& value) : type(Variant::object), value(value) { }
  explicit Variant(const Array& value) : type(Variant::array), value(value) { }
  explicit Variant(const Function& value) : type(Variant::function), value(value) { }

 public:
  bool operator==(const Variant& other) const {
    switch (this->type) {
      case undefined:
        switch (other.type) {
          case undefined: return true;
          case null: return false;
          case boolean: return false;
          case number: return false;
          case string: return false;
          case object: return false;
          case array: return false;
        }
      case number:
        switch (other.type) {
          case undefined: return true;
          case null: return this->value.number == 0.0 || this->value.number == NAN;
          case boolean: return false;
          case number: return this->value.number == other.value.number;
          case string: return this->value == std::stod(other.value.string);
          case object: return this->value == other.value.object.valueOf();
          case array: return this->value == other.value.array.valueOf();
        }
    }
  }

  bool isIdentical(const Variant& other) {
    return this->type == other.type && *this == other;
  }

  Object operator[](const std::string& property) const {
    switch (this->type) {
      case undefined: throw std::runtime_error();
      case null: throw std::runtime_error();
      case boolean: return Boolean(this->value.boolean);
      case number: return Number(this->value.number);
      case string: return String(this->value.string);
      case object: return this->value.object;
      case array: return this->value.array;
      case function: return this->value.function;
    }
  }
};

class Object { //  : public std::map<std::string, Variant> {
 protected:
  std::map<std::string, Variant> properties;

 public:
  // obj.prop = val or obj['prop'] = val
  Variant& operator[](const std::string& property) {
    return this->properties[property];
  }

  // let var = obj['prop'] = obj.prop
  Variant operator[](const std::string& property) const {
    std::map<std::string, Variant>::const_iterator itr
      = this->properties.find(property);

    if (itr != this->properties.end()) {
      return itr->second;
    }

    itr = this->properties.find("prototype");
    if (itr != this->properties.end() && itr->second.getType() == Variant::object) {
      return itr->second[property];
    }

    return Variant(); // undefined
  }

 public:
  virtual Variant valueOf() const { return Variant(*this); }
  virtual std::string toString() const { return "[object Object]"; }
};

class Array : public Object {
 public:
  size_t length;

 public:
  Variant& operator[](const std::string& property) {
    size_t position = std::stoi(property);
    if (position > 0 && position > this->length) {
      this->length = position;
    }
    return Object::operator[](property);
  }

  std::string toString() const override { return this->join(","); }

  std::string join(const std::string& separator) const {
    std::string result;
    for (const auto& itr : this->properties) {
      if ( std::stoi(itr->key) >= 0 ) {
        result += itr->value + separator;
      }
    }
    return result;
  }
};

class ByteCode {};

class Function : public Object {
 protected:
  Array arguments;
  std::string body;
  ByteCode byteCode;
  size_t length;
  Object prototype;

 public:
  Function(const std::string& parameters, const std::string& body)
    : arguments(parameters.split(","))
    , body(body)
    , length(this->arguments.length)
  {
  }
  std::string toString() {
    return this->body;
  }
};

class String : public Object {
 public:
  String(const Variant& string);
  String(const std::string& string);
  String toUpperCase() const;
};

class PseudoClass : public Function {

};


/*
let x = 3.14;
Variant x(3.14);

let player = {};
player.nickname = 'Chema';
player['nickname'] = 'Chema';
player.score
*/

#include <map>
#include <string>


class Object;
class Array;
class Function;

/** objeto cuyo tipo de datos puede variar. No siempre se hace así en los
 * intérpretes pero para este ejemplo lo trabajaremos así.
*/
class Variant {
 public:
  // un entero que indica que tipo de datos está almacenando eneste momento
  enum DataType {
    undefined,
    null,
    boolean,
    string,
    number,
    object,
    array,
    function
  };
  // pretende almacenar el valor, si tiene 3 campos, toma el mayor de ellos y
  // ese es el tama;o que puede tomar la union por loq ue solo puede haber un valor
  // almacenado a la vez.
  union Value {
    bool boolean;
    double number;
    std::string string;
    Object object;
    Array array;
    Function function;
  };

 protected:
  // almacena el tipo de datos
  DataType type;
  union Value value;

 public:
  Variant() : type(undefined) { }
  explicit Variant(DataType type) : type(type) { }
  explicit Variant(bool value) : type(Variant::boolean), value.boolean(value) { }
  explicit Variant(double value) : type(Variant::number), value.number(value) { }
  explicit Variant(const std::string& value) : type(Variant::string), value.string(value) { }
  explicit Variant(const Object& value) : type(Variant::object), value.object(value) { }

 public:
  // para intepretar este operador, va a depender del tipo de datos de ambos, se
  // hace una conversión para que ambos queden del mismo tipo. Es un despiche, son
  // muchas decisiones las que hay que tomar 
  bool operator==(const Variant& other) const {
    switch (this->type) {
    case number:
      switch (other.type) {
        case undefined: return true;
        case null: return this->value.number == 0.0 || this->value.number == NAN;
        case boolean: return false;
        case number: return this->value.number == other.value.number;
        case string: return this->value == std::stod(other.value.string);
        case object: return this->value == other.value.object.valueOf();
      }
    case undefined:
      switch (other.type) {
        case undefined: return true;
        case null: return ALGOQUEHAYQUEDECIDIR;
        case boolean: return false;
        case number: return false;
        case string: return false;
      }
    }
  }
  // operador === de Javascript
  bool isIdentical(const Variant& other) {
    return this->type == other.type && *this == other;
  }
};

/**
 * Probablemente no se implemente con herencia pero lo hacemos apra dejar en
 * claro que un objeto es un arreglo ascoiativo que ascoia propiedades (strings)
 * con valores de cualquier tipo (Variant)
 */
class Object { // : public std::map<std::string, Variant> {
 protected:
  std::map<std::string, Variant> properties;

 public:
  /*
  El operador [] permite crear esta asociación de propiedad con valor, la propiedad
  es pasada como un string y se retorna el Variant asociado a esa propiedad.
  */
  Variant& operator[](const std::string& property) {
    return this->properties[property];
  }

  Variant operator[](const std::string& property) const {
    std::map<std::string, Variant>::const_iterator itr = this->properties.find(property);
    if (itr != this->properties.cend()) {
      return itr->second;
    }
    return Variant(Variat::undefined);  
  }

 public:
  virtual Variant valueOf() {
    return Variant(*this);
  }
};

/*
let x = 3.14;
Variant x(3.14;)

let player = {};
player.nickname = 'Chema';
player['nickname'] = 'Chema';
*/

class Array : public Object {
 public:
  size_t length;
};

class Function : public Object {
 
};
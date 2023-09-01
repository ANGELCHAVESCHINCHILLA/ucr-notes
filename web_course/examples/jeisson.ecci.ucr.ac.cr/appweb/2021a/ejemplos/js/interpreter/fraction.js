// class Fraction {
// }

function Fraction1(num = 0, den = 1) {
  return {
    numerator: num,
    denominator: den,
    add: function(other) {
      return Fraction(this.numerator * other.denominator +
          this.denominator * other.numerator,
        this.denominator * other.denominator
      );
    }
  };
}

function Fraction2(num = 0, den = 1) {
  const result = {};

  result.numerator = num;
  result.denominator = den;
  result.prototype = functionPrototype;

  return result;
}

function Fraction(num = 0, den = 1) {
  if (new.target) {
    this.numerator = num;
    this.denominator = den;
    // this.prototype = Fraction.prototype;
  } else {
    throw Error('Fraction not called with new operator');
  }
}

Fraction.prototype.add = function(other) {
  console.log('add()');
  return new Fraction(this.numerator * other.denominator +
      this.denominator * other.numerator,
    this.denominator * other.denominator
  );
};

let fr1 = new Fraction(2, 4);
let fr2 = new Fraction(-5, -3);
let fr3 = fr2.add(fr1);

console.log('fr1 = ', fr1);
console.log('fr2 = ', fr2);
console.log('fr3 = ', fr3);
//console.log('global = ', global);
Fraction.prototype.add = function(other) { return -38; }

let fr4 = fr3.add(fr1)
console.log('fr4 = ', fr4);

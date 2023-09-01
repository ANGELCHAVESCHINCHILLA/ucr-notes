class Fraction {
  constructor(num = 0, den = 1) {
    this.numerator = num;
    this.denominator = den;
  }

  add(other) {
    return new Fraction(this.numerator * other.denominator +
      this.denominator * other.numerator,
      this.denominator * other.denominator
    );
  }

  toString() {
    return `${this.numerator}/${this.denominator}`;
  }
}

let fr1 = new Fraction(2, 4);
let fr2 = new Fraction(-5, -3);
let fr3 = fr2.add(fr1);

console.log(`fr1 = ${fr1}`);
console.log('fr2 = ', fr2);
console.log('fr3 = ', fr3);

// Fraction.prototype.add = function(other) { return -38; }

let fr4 = fr3.add(fr1)
console.log('fr4 = ', fr4);

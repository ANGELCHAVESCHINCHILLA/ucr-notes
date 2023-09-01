let matrix = [];
for ( let i = 1; i <= 20; ++i) {
  let tmprow = [];
  for (let j = 1; j < 20; ++j) {
    tmprow[j] = i * j;
  }
  matrix[i] = tmprow;
}
console.table(matrix)
// Esta forma es posible ya que console es un objeto y como vimos es un mapa.
// console["table"](matrix)
  // for ( let n = 1; n <= 20; ++n )
  //   console.log('%d^2 = %d', n, n * n);
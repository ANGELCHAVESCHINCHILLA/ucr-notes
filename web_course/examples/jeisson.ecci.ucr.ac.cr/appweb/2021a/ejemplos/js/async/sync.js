import fs from 'fs';

function calculateSubtotal1() {
  const error = Math.random() * 100;
  if (error < 50) {
    return 123.45;
  }
  throw new Error('Calculation error');
}

try {
  const subtotal = calculateSubtotal1();
  console.log(`Subtotal1 = ${subtotal}`);
} catch (error) {
  console.error(`Error1: ${error.message}`);
}

// -----------------------------------------------------------------------------

function readJsonSync(filename) {
  const fileContents = fs.readFileSync(filename);
  if (fileContents) {
    return JSON.parse(fileContents);
  }
  throw new Error(`Could not read ${filename}`);
}

function readJsonArray(filename) {
  const json = readJsonSync(filename);
  if (json instanceof Array) {
    return json;
  }
  throw new Error(`${filename} is not an array`);
}

function findById(array, id) {
  return array.find((object) => object.id === id);
}

function calculateSubtotalSync() {
  const cart = readJsonArray('./data/cart.json');
  const products = readJsonArray('./data/products.json');
  let subtotal = 0.0;
  cart.forEach((cartLine) => {
    const product = findById(products, cartLine.productId);
    if (product) {
      subtotal += cartLine.quantity * product.price;
    }
  });
  return subtotal;
}

try {
  const subtotal = calculateSubtotalSync();
  console.log(`SubtotalSync = ${subtotal}`);
} catch (error) {
  console.error(`Error2: ${error.message}`);
}

console.log('Goodbye');

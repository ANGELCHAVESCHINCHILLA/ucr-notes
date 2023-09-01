import fs from 'fs/promises';

function calculateSubtotal1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const error = Math.random() * 100;
      if (error < 50) {
        resolve(123.45);
      } else {
        reject(new Error('Calculation error'));
      }
    }, 2000);
  });
}

try {
  const subtotal = await calculateSubtotal1();
  console.log(`Subtotal1 = ${subtotal}`);
} catch (error) {
  console.error(`Error1: ${error.message}`);
}

// -----------------------------------------------------------------------------

function readJson(filename) {
  return new Promise(async (resolve, reject) => {
    let fileContents = null;
    try {
      fileContents = await fs.readFile(filename);
    } catch (fileError) {
      reject(new Error(`Could not read ${filename}`));
    }

    try {
      resolve(JSON.parse(fileContents));
    } catch (parseError) {
      reject(parseError);
    }
  });
}

async function readJsonArray(filename) {
  const json = await readJson(filename);
  if (json instanceof Array) {
    return json;
  }
  throw new Error(`${filename} is not an array`);
}

function findById(array, id) {
  return array.find((object) => object.id === id);
}

async function calculateSubtotal() {
  const cart = await readJsonArray('./data/cart.json');
  const products = await readJsonArray('./data/products.json');

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
  const subtotal = await calculateSubtotal();
  console.log(`SubtotalAwait = ${subtotal}`);
} catch (error) {
  console.error(`Error2: ${error.message}`);
}

console.log('Goodbye');

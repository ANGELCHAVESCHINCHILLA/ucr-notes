import fs from 'fs';

// type ObjectId = { id: number; description?: string };
interface ObjectId {
  id: number;
  description?: string
}

interface Product {
  id: number;
  title: string;
  price: number;
}

// boolean, number, string, Date, Map, Boolean, String
function readJson(filename: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (fileError, fileContents) => {
      try {
        if (fileError) {
          reject(new Error(`Could not read ${filename}`));
        } else if (fileContents) {
          resolve(JSON.parse(fileContents.toString()));
        }
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

async function readJsonArray(filename: string) {
  const json = await readJson(filename);
  if (json instanceof Array) {
    return json;
  }
  throw new Error(`${filename} is not an array`);
}

function findById(array: ObjectId[], id: number) {
  return array.find((object) => object.id === id);
}

const config = {
  cartFilename: './data/cart.json',
  productFilename: './data/products.json',
  productFile: [ 292, 938, 210 ],
};

async function calculateSubtotal() {
  const cart = await readJsonArray(config.cartFilename);
  const products = await readJsonArray(config.productFilename) as Product[];
  // findById(config.productFile, 4);

  let subtotal = 0.0;
  cart.forEach((cartLine) => {
    const product = findById(products, cartLine.productId) as Product;
    if (product) {
      subtotal += cartLine.quantity * product.price;
    }
  });
  return subtotal;
}

async function main() {
  try {
    const subtotal = await calculateSubtotal();
    console.log(`Subtotal2 = ${subtotal}`);
  } catch (error) {
    console.error(`Error2: ${error.message}`);
  }

  console.log('Goodbye');
}

main();

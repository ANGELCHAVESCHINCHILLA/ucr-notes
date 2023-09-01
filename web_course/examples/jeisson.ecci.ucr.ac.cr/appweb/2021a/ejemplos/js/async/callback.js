import fs from 'fs';

function calculateSubtotal1(callback) {
  setTimeout(() => {
    const error = Math.random() * 100;
    if (error < 50) {
      callback(null, 123.45);
    } else {
      callback(new Error('Calculation error'));
    }
  }, 2000);
}

calculateSubtotal1((error, subtotal) => { // error-first callback function
  if (error) {
    console.error(`Error1: ${error.message}`);
  } else {
    console.log(`Subtotal1 = ${subtotal}`);
  }
});

// -----------------------------------------------------------------------------

function readJson(filename, callback) {
  fs.readFile(filename, (error, fileContents) => {
    try {
      if (error) {
        callback(new Error(`Could not read ${filename}`));
      } else if (fileContents) {
        callback(null, JSON.parse(fileContents));
      }
    } catch (error) {
      callback(error);
    }
  });
}

function readJsonArray(filename, callback) {
  readJson(filename, (error, json) => {
    if (error) {
      callback(error);
    } else if (json instanceof Array) {
      callback(null, json);
    } else {
      callback(new Error(`${filename} is not an array`));
    }
  });
}

function findById(array, id) {
  return array.find((object) => object.id === id);
}

function calculateSubtotal(callback) {
  readJsonArray('./data/cart.json', (cartError, cart) => {
    if (cartError) {
      callback(cartError);
    } else {
      readJsonArray('./data/products.json', (productError, products) => {
        if (productError) {
          callback(productError);
        } else {
          let subtotal = 0.0;
          cart.forEach((cartLine) => {
            const product = findById(products, cartLine.productId);
            if (product) {
              subtotal += cartLine.quantity * product.price;
            }
          });
          callback(null, subtotal);
        }
      });
    }
  });
}

calculateSubtotal((error, subtotal) => {
  if (error) {
    console.error(`Error2: ${error.message}`);
  } else {
    console.log(`SubtotalCallBack = ${subtotal}`);
  }
});

console.log('Goodbye');

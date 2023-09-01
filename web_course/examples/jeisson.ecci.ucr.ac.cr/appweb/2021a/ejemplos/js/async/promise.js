import fs from 'fs';

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

calculateSubtotal1()
  .then((subtotal) => { console.log(`Subtotal1 = ${subtotal}`); })
  .catch((error) => { console.error(`Error1: ${error.message}`); });

/*
const promise1 = calculateSubtotal1();
const promise2 = promise1.then(task2);
const promise3 = promise2.then(task3);
const promise4 = promise3.catch(task4);

fetch('/sessions/1/players.json')
  .then(httpResponse => httpResponse.json())
  .then(playersJson => updateScores(playerJson))
  .catch(console.error);
*/

// -----------------------------------------------------------------------------

function readJson(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (fileError, fileContents) => {
      try {
        if (fileError) {
          reject(new Error(`Could not read ${filename}`));
        } else if (fileContents) {
          resolve(JSON.parse(fileContents));
        }
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

function readJsonArray(filename) {
  return readJson(filename).then((json) => {
    if (json instanceof Array) {
      return json;
    }
    throw new Error(`${filename} is not an array`);
  });
}

function findById(array, id) {
  return array.find((object) => object.id === id);
}

function calculateSubtotal() {
  return readJsonArray('./data/cart.json').then((cart) => {
    return readJsonArray('./data/products.json').then((products) => {
      let subtotal = 0.0;
      cart.forEach((cartLine) => {
        const product = findById(products, cartLine.productId);
        if (product) {
          subtotal += cartLine.quantity * product.price;
        }
      });
      return subtotal;
    });
  });
}

calculateSubtotal()
  .then((subtotal) => { console.log(`SubtotalPromise = ${subtotal}`); })
  .catch((error) => { console.error(`Error2: ${error.message}`); });

console.log('Goodbye');

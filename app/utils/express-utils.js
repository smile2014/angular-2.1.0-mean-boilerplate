'use strict';
module.exports = {
  getNodeEnv: getNodeEnv,
  printObject: printObject
};

function getNodeEnv() {
  return process.env.NODE_ENV || 'development';
}

function printObject(obj) {
  for (let property of Object.keys(obj)) {
    let value = obj[property];
    if (typeof value === 'object') {
      value = JSON.stringify(value, null, ' ');
    }
    console.log(`${property}: ${value}`);
  }
}
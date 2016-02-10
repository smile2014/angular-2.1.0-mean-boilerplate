'use strict';
exports.getNodeEnv = function () {
  return process.env.NODE_ENV || 'development';
}

exports.printObject = function (obj) {
  for (let property of Object.keys(obj)) {
    let value = obj[property];
    if (typeof value === 'object') {
      value = JSON.stringify(value, null, ' ');
    }
    console.log(`${property}: ${value}`);
  }
}
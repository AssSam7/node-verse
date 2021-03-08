// console.log(arguments);
// console.log(require("module").wrapper);

// module.exports
const C = require("./test-module1");
const calc1 = new C();
console.log(calc1.add(10, 20));

// exports
// const calc2 = require("./test-module2");
const { multiply } = require("./test-module2");
console.log(multiply(10, 20));

// caching
require("./test-module3")();
require("./test-module3")();
require("./test-module3")();

const bcrypt = require('bcrypt-nodejs');
let hash = bcrypt.hashSync("bacon");

console.log(bcrypt.compareSync("bacon", hash)); // true
console.log(bcrypt.compareSync("veggies", hash)); // false

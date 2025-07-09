const { log } = require('console');
const path = require('path');

// console.log(path.join('a', 'b', 'c'));
console.log(path.join(process.cwd()), 'hello', 'world');

console.log((path.resolve('a', 'b', 'c')));

console.log(path.dirname(__filename));

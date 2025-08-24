import test from './test.js'

console.log(test(2, 3));

export default (a, b) => {
  return a + b;
}

// {
//   './src/add.js': {
//     deps: {
//       './test.js': './src/test.js'
//     },
//     code: 'import test from \'./test.js\';\n\nconsole.log(test(2, 3));\n\nexport default (a, b) => {\n  return a + b;\n}'
//   }
// }
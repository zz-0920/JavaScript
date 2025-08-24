const fs = require('fs');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const path = require('path');
const babel = require('@babel/core');


const getModuleInfo = (file) => {
  const body = fs.readFileSync(file, 'utf-8')
  const ast = parser.parse(body, {
    sourceType: "module", // 告诉 babel 我们的代码是 ES 模块
  });

  // 遍历 AST 语法树，收集依赖
  const deps = {}
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(file)
      const abspath = './' + path.join(dirname, node.source.value)
      deps[node.source.value] = abspath
    }
  })
  // 根据 ast 生成低版本的 js
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env'],  
  })

  const moduleInfo = {
    file: file,
    deps: deps,
    code: code,
  }
  return moduleInfo
}

const parseModules = (file) => { 
  const entry = getModuleInfo(file) // {file: './src/index.js', deps: {xxxx}, code: '...' }
  // 递归读取依赖
  const temp = [entry]
  for (let i = 0; i < temp.length; i++) {
    const deps = temp[i].deps  // {'./add.js': './src/add.js', xxxxx}
    if (deps) {
      for (const key in deps) {
        if (deps.hasOwnProperty(key)) {
          temp.push(getModuleInfo(deps[key]))
        }
      }
    }
  }
  const depsGraph = {}
  temp.forEach(moduleInfo => {
    depsGraph[moduleInfo.file] = {
      deps: moduleInfo.deps,
      code: moduleInfo.code,
    }
  })
  return depsGraph
}

// 处理一下 require 函数和 exports 对象
const bundle = (file) => {
  const depsGraph = JSON.stringify(parseModules(file))
  return `(function(graph) {
            function require(file) {

              function absRequire(relPath) {
                return require(graph[file].deps[relPath])
              }

              var exports = {};

              (function(require, exports, code) {
                eval(code)
              })(absRequire, exports, graph[file].code);
              
              return exports
            }
            require("${file}");
          })(${depsGraph});`
}

// const content = bundle('./src/index.js'); 
// // console.log(content);
// fs.mkdirSync('./dist')
// fs.writeFileSync('./dist/bundle.js', content)


// "use strict"
// var _add = _interopRequireDefault(require("./add.js"));
// var _minus = require("./minus.js");
// function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// var sum = (0, _add["default"])(1, 2);
// var diff = (0, _minus.minus)(2, 1);
// console.log(sum);
// console.log(diff);



// "use strict";
// Object.defineProperty(exports, "__esModule", {
//   value: true
// });
// exports["default"] = void 0;
// var _default = exports["default"] = function _default(a, b) {
//   return a + b;
// }


// (function(graph) {
//             function require(file) {

//               function absRequire(relPath) {
//                 return require(graph[file].deps[relPath])
//               }

//               var exports = {};

//               (function(require, exports, code) {
//                 eval(code)
//               })(absRequire, exports, graph[file].code);
              
//               return exports
//             }
//             require("./src/index.js");
//           })({"./src/index.js":{"deps":{"./add.js":"./src/add.js","./minus.js":"./src/minus.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\nvar _minus = require(\"./minus.js\");\nfunction _interopRequireDefault(e) { return e && e.__esModule ? e : { \"default\": e }; }\nvar sum = (0, _add[\"default\"])(1, 2);\nvar diff = (0, _minus.minus)(2, 1);\nconsole.log(sum);\nconsole.log(diff);"},"./src/add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports[\"default\"] = void 0;\nvar _default = exports[\"default\"] = function _default(a, b) {\n  return a + b;\n};"},"./src/minus.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.minus = void 0;\nvar minus = exports.minus = function minus(a, b) {\n  return a - b;\n};"}});
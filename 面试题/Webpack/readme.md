# create-react-app
 - 由 webpack 封装得到
 - webpack 将整个项目的所有的依赖文件进行读取，解析，打包成浏览器可以识别的静态资源文件

# webpack 
 1. webpack 只能打包 js 后缀的文件
 2. 遇到高版本的 js 代码，webpack 无法直接打包, 需要使用 babel 进行转换
  @babel/core  核心模块
  @babel/preset-env  提供一个 babel 的配置文件给到我们
  babel-loader  加载器（将babel 集成到 webpack）



# 打包流程
1. 读取项目的入口文件代码
2. 分析代码，递归的去读取模块依赖的文件内容，生成 AST 语法树 （用对象描述代码）
3. 根据 AST 语法树，生成低版本的 js 代码

- 具体细节：
1. 获取主模块的内容  fs
2. 分析模块  @babel/parser (将代码转为 AST)
3. 对 AST 语法进行处理   @babel/traverse
    (遍历AST依赖收集)
    (降 js 版本)  @babel/preset-env  @babel/core
    (递归依赖收集)
4. 生成新的代码 


# 为什么慢？
每次修改代码，webpack 都会从入口文件开始读取、分析、递归获取依赖，然后生成一份最新的代码给浏览器执行

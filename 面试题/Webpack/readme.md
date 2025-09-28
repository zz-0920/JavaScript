# create-react-app
- 由 webpack 封装得到
- webpack 将整个项目的所有的依赖文件进行读取，解析，打包成浏览器可以识别的静态资源文件

# webpack 核心概念
1. **Entry（入口）**：打包的起始点
2. **Output（输出）**：打包后文件的输出位置和命名
3. **Loader（加载器）**：处理非 JS 文件（CSS、图片、TS 等）
4. **Plugin（插件）**：执行更复杂的任务（优化、压缩等）
5. **Module（模块）**：webpack 中一切皆模块
6. **Chunk（代码块）**：多个模块的集合

# Babel 集成
- **@babel/core**：Babel 核心模块，提供转换 API
- **@babel/preset-env**：智能预设，根据目标环境自动选择需要的插件
- **babel-loader**：webpack 的 loader，将 Babel 集成到 webpack 构建流程

# 打包流程
1. **解析入口**：从 entry 开始解析依赖关系
2. **构建依赖图**：递归分析所有模块依赖，生成依赖图
3. **AST 转换**：使用 @babel/parser 将代码转为 AST
4. **代码转换**：
   - 使用 @babel/traverse 遍历 AST
   - 使用 @babel/preset-env 进行语法降级
   - 收集依赖关系
5. **生成 Bundle**：将所有模块打包成最终的输出文件

# 性能问题
## 为什么慢？
1. **冷启动慢**：首次构建需要分析所有依赖
2. **重复工作**：每次修改都重新构建整个依赖图
3. **文件 I/O**：大量的文件读写操作
4. **转换开销**：Babel 转换和 AST 解析耗时

## 优化方案
1. **缓存**：使用 cache 配置启用持久化缓存
2. **增量构建**：只重新构建变更的模块
3. **并行处理**：使用 thread-loader 或 parallel-webpack
4. **代码分割**：使用 splitChunks 减少重复打包

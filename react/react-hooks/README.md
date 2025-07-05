- 单页应用: 整个项目只有一个 HTML 文件，所有页面都做成组件的样子，被添加到这个 HTML 文件中进行渲染

# 组件
1. class 组件
2. function 组件

# hooks (钩子函数)
- 由 React 提供的函数，函数名以 use 开头，只能在 function 组件中使用
1. useState -- 用来处理状态的，定义一个响应式变量，提供一个专门的方法修改变量值
2. useEffect -- 用来处理副作用的
  1. 组件每次加载(挂载)会触发
  2. useEffect 第二个参数为一个空数组时，只会在初次渲染(挂载)时触发
  3. useEffect 第二个参数为一个数组时，数组中传入一个变量时，该变量每次修改值都会带来 useEffect 重新执行
  4. useEffect 第一个参数是函数，该函数内部返回一个新函数，新函数会在组件不展示时(卸载)才触发
3. useLayoutEffect -- 用来处理副作用的，与 useEffect 功能类似，区别在于 useLayoutEffect 会在浏览器绘制前执行
4. useReducer -- 修改 state 的逻辑比较复杂时，用 useReducer 来处理
  1. 传入的 reducer 函数中不能直接修改原 state，必须返回一个新的 state
  2. useReducer 第一个参数为 reducer 函数，第二个参数为 state 的初始值
  3. useReducer 第二个参数为 state 的初始值
  4. useReducer + immer
5. useRef -- 获取 DOM 结构
6. useContext -- 跨组件通信

# UI框架
1. antd
2. element-ui
3. vant

# todo
1. 初次加载页面，展示后端返回的所有数据 get  http://localhost:3001/data
2. 搜索某一条数据的功能   get  http://localhost:3001/data/?q=xxx
3. 删除表格中某一条数据的功能  delete  http://localhost:3001/data/${id}
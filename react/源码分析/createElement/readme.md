# JSX
1. 浏览器读不懂 jsx ，需要使用 babel 编译成 js 代码
2. JSX 是怎么被浏览器执行出效果的
  1. react 会将 jsx 用 React.createElement 方法转换为 js 代码


# React.createElement 在干嘛
1. babel 会调用 React.createElement('div', { className: 'gretting' }, 'hello world')
2. React.createElement 会 调用 ReactElement 并返回一个对象
  { 
    $$typeof: Symbol(react.element),
    type: 'div', 
    props: { 
      className: 'gretting', 
      children: 'hello world' 
    } ,
    key: null,
    ref: null,
  }
3. react 会根据这个对象，用 DOM 方法创建一个 div 元素
  const div = document.createElement('div')
  div.className = 'gretting'
  div.innerHTML = React.createElement(child)  // 'hello world'


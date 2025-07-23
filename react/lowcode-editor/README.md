# 低代码平台
- 物料区
- 画布区
- 组件右侧的属性区

1. 讲物料区的组件拖到画布区即可, 其实就是维护一个 json 对象, 用户执行拖拽, 我们将组件对象添加到 json 的某一层中
2. 在右侧的编辑某组件的属性, 其实就是在改组件的对象中增加属性
3. 将 json 展示成树状图

# tailwindcss
- 原子化css, 只需要写类名, 不需要写 css, 尤其在低代码平台需要

npm install -D tailwindcss@3 postcss
npm i autoprefixer

npx tailwindcss init -p 初始化了一个 tailwindcss 配置文件和 postcss 的配置文件


# 准备
npm install allotment --save  实现拖动改变容器大小

# zustand 仓库
1. npm install zustand --save

# 项目梳理、
1. 创建了 componentsStore 仓库 存放整个json对象 (components数组), 定义了如何往该 json 对象中植入子对象 (组件) 的函数 和 移除子对象, 更新子对象内部属性的函数

2. 创建了 componentConfigStore  仓库, 存放一个对象, 该对象用来记录每一个 json 中的组件名 对应的真实组件的代码

3. 定义了 renderComponents 函数用来将 整个 json 渲染成真实的 html 结构, 这里面借助 React.createElement 函数来实现递归渲染

4. 实现物料区 组件 拖拽到 画布区
  1. react-dnd 跨组件传递
     react-dnd-html5-backend

  2. 真的拖拽了一个组件名到 中间区域 就要将这个名字对应的组件对象 植入到 json 中
 
  3. 借助 react-dnd 中的 useDrop 来接收组件

  4. 抽离useDrop代码, 封装成一个 hook

  5. 当中间画布展示好了组件之后, 我们封装了一个 HoverMask 组件, 为了实现用户鼠标移入哪一个组件, 该组件被选中的效果
    - HoverMask: 接收一个组件类名, 通过 js 获取到该容器的几何属性, 动态的将 mask 容器也设置成相同的大小并覆盖在组件容器上
  
  6. 点击展示组件的编辑框，并且可以移除组件，和hover不一样，点击还要在右侧展示对应的组件属性
    - selectedMask：当用户点击画布中的某个组件是，我们实现跟 hoverMask 一样的蒙层效果
# 说说你对 css 盒子模型的理解
- 是什么
 - 浏览器渲染页面时，会根据标准将容器渲染成一个包含内容，内边距，边框，外边距的盒子。

- 特性
  - 标准盒子模型
    - 宽度 = 内容宽度 + 内边距 + 边框 + 外边距
  - 怪异盒子模型(IE 盒子模型)
    - 宽度 = 内容宽度 + 外边距

- 属性
  - width
  - height
  - padding
  - border
  - margin
  - box-sizing

# css 选择器有哪些？优先级？
 1. 类选择器 .class
 2. id 选择器 .id
 3. 标签选择器 标签名
 4. 通配符选择器 *
 5. 后代选择器 xxx yyy
 6. 子代选择器 xxx > yyy
 7. 并集选择器 xxx,yyy
 8. 交集选择器 无
 9. 伪类选择器 :hover
 10. 伪元素选择器 ::before
 11. 相邻选择器 xxx + yyy

# 说说 em/px/rem/vh/vw 单位的区别
- 是什么
 - px
   - 绝对单位(像素单位)，固定值，不支持响应式

 - em
   - 相对单位(em 是相对父元素的字体大小)，支持响应式
   - 注意：如果父元素没有设置字体大小，那么就会相对于根元素的字体大小
   - 注意：em 是可以继承的

 - rem
   - 相对单位(rem 是相对根元素的字体大小)，支持响应式
   - 注意：如果根元素没有设置字体大小，那么就会相对于浏览器的默认字体大小(16px)
   - 注意：rem 是不可以继承的

 - vh
   - 相对单位(vh 是相对视口高度)，支持响应式

 - vw
   - 相对单位(vw 是相对视口宽度)，支持响应式

- 场景
  - 响应式布局
    - 媒体查询
    - 百分比布局
    - rem 布局
  - 移动端布局
    - vh/vw 布局
    - 百分比布局
    - rem 布局

# 说说 css 中有哪些隐藏元素的方法，区别是什么？
- 是什么
  - 隐藏元素
    - 元素在页面中不显示，但是元素还在 DOM 中
  - 显示元素
    - 元素在页面中显示，元素也在 DOM 中

- 方法
  - display: none
    - 隐藏元素
    - 元素不在 DOM 中
    - 不能使用事件绑定
  - visibility: hidden
    - 隐藏元素
    - 元素还在 DOM 中
    - 可以使用事件绑定
  - opacity: 0
    - 隐藏元素
    - 元素还在 DOM 中
    - 可以使用事件绑定
  - position: absolute
    - 隐藏元素
    - 元素还在 DOM 中
    - 不能使用事件绑定
  - position: fixed
    - 隐藏元素
    - 元素还在 DOM 中
    - 不能使用事件绑定
  - transform: scale(0)
    - 隐藏元素
    - 元素还在 DOM 中
    - 不能使用事件绑定
  - transform: translate(-100%, -100%)
    - 隐藏元素
    - 元素还在 DOM 中
    - 不能使用事件绑定
  - clip-path: polygon(0 0, 0 0, 0 0, 0 0)
    - 隐藏元素
    - 元素还在 DOM 中
    - 不能使用事件绑定

# 说说你对 BFC 的理解
- 是什么
  - BFC(Block Formatting Context) 是块级格式化上下文
  - 是一个独立的渲染区域
  - 内部元素的渲染不会影响到外部元素
  - 外部元素的渲染不会影响到内部元素
- 触发条件
  - float 不是 none
  - position 为 absolute 或者 fixed
  - display 是 flex 或者 grid 或者 inline-xxxx
  - overflow 不是 visible
  - 包含块的高度大于 0
- 应用场景
  - 清除浮动带来的高度塌陷问题
  - 防止 margin 重叠
  - 防止元素被浮动元素覆盖
  - 防止元素被定位元素覆盖
  - 防止元素被伪元素覆盖
  - 防止元素被 overflow: hidden 隐藏
  - 防止元素被 overflow: auto 隐藏
  - 防止元素被 overflow: scroll 隐藏

# 元素水平垂直居中的方法
- 是什么
  - 元素水平垂直居中
- 方法
  -  flex 布局
  -  grid 布局
  -  position 布局
  -  transform 布局
  -  line-height 布局
  -  vertical-align 布局
  -  table 布局
  -  伪元素布局

# 如何实现多栏布局
1. 两栏布局 
   1. 弹性
   2. calc() 计算右侧宽度
   3. 浮动

2. 三栏布局
  1. 弹性 + order （主体内容优先加载）
  2. grid 布局 
  3. 圣杯布局  (浮动 + 定位 + 负 margin)
  4. 双飞翼布局  (浮动 + 负 margin)
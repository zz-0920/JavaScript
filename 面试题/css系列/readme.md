# CSS核心技术面试题集

## 1. CSS盒模型（Box Model）详解

### 概念定义
CSS盒模型是浏览器渲染引擎用于描述和计算HTML元素布局的基础模型。每个元素都被视为一个矩形盒子，由内容区域（content）、内边距（padding）、边框（border）和外边距（margin）四个部分组成。

### 盒模型类型

#### 标准盒模型（W3C Box Model）
- **计算公式**：`element width = content width + padding + border + margin`
- **特点**：width和height属性仅指定内容区域的尺寸
- **触发条件**：`box-sizing: content-box`（默认值）

#### 怪异盒模型（IE Box Model / Border-box Model）
- **计算公式**：`element width = content width + margin`
- **特点**：width和height属性包含内容、内边距和边框
- **触发条件**：`box-sizing: border-box`

### 相关CSS属性
- `width` / `height`：内容区域尺寸
- `padding`：内边距
- `border`：边框
- `margin`：外边距
- `box-sizing`：盒模型类型控制

**总结回答**：CSS盒模型是前端布局的基础概念，分为标准盒模型和怪异盒模型两种。标准盒模型的width/height只包含content，而怪异盒模型包含content+padding+border。通过box-sizing属性可以控制使用哪种盒模型，border-box在响应式布局中更常用。

---

## 2. CSS选择器优先级机制

### 选择器类型分类

#### 基础选择器
1. **类型选择器**（Type Selector）：`element`
2. **类选择器**（Class Selector）：`.className`
3. **ID选择器**（ID Selector）：`#idName`
4. **通用选择器**（Universal Selector）：`*`

#### 组合选择器
5. **后代选择器**（Descendant Combinator）：`ancestor descendant`
6. **子选择器**（Child Combinator）：`parent > child`
7. **相邻兄弟选择器**（Adjacent Sibling Combinator）：`element + sibling`
8. **通用兄弟选择器**（General Sibling Combinator）：`element ~ sibling`
9. **选择器组**（Selector List）：`selector1, selector2`

#### 伪类和伪元素
10. **伪类选择器**（Pseudo-class）：`:hover`, `:focus`, `:nth-child()`
11. **伪元素选择器**（Pseudo-element）：`::before`, `::after`, `::first-line`

### 优先级计算规则（Specificity）
- **内联样式**：1000
- **ID选择器**：100
- **类选择器、属性选择器、伪类**：10
- **元素选择器、伪元素**：1
- **通用选择器**：0
- **!important声明**：覆盖所有优先级

**总结回答**：CSS选择器优先级遵循特异性（Specificity）计算规则，按照内联样式(1000) > ID(100) > 类/属性/伪类(10) > 元素/伪元素(1) > 通用选择器(0)的权重计算。!important具有最高优先级但应谨慎使用。理解优先级机制有助于避免样式冲突和提高CSS代码的可维护性。

---

## 3. CSS长度单位体系

### 绝对长度单位
#### px（像素）
- **定义**：设备无关像素，CSS参考像素
- **特性**：固定值，不支持响应式缩放
- **适用场景**：精确控制、边框、阴影等

### 相对长度单位

#### em
- **定义**：相对于当前元素的字体大小
- **继承特性**：具有继承性，会层层累积
- **计算基准**：父元素font-size（若未设置则继承至根元素）
- **适用场景**：组件内部间距、字体相关尺寸

#### rem（Root em）
- **定义**：相对于根元素（html）的字体大小
- **继承特性**：无继承性，始终相对根元素
- **默认基准**：16px（浏览器默认字体大小）
- **适用场景**：响应式布局、全局尺寸控制

#### 视口单位（Viewport Units）
- **vh（Viewport Height）**：相对于视口高度的1%
- **vw（Viewport Width）**：相对于视口宽度的1%
- **vmin**：vh和vw中的较小值
- **vmax**：vh和vw中的较大值

### 响应式布局策略
- **媒体查询**（Media Queries）：条件性样式应用
- **流式布局**（Fluid Layout）：百分比宽度
- **弹性布局**（Flexible Layout）：rem/em单位
- **视口适配**：vh/vw单位

**总结回答**：CSS长度单位分为绝对单位（px）和相对单位（em、rem、%、vh/vw等）。px适合精确控制，em适合组件内部缩放，rem适合全局响应式设计，视口单位适合全屏布局。选择合适的单位是实现响应式设计的关键。

---

## 4. 元素隐藏技术对比

### 完全移除类
#### display: none
- **渲染行为**：元素从渲染树中移除
- **DOM状态**：保留在DOM树中
- **空间占用**：不占用任何空间
- **事件响应**：无法响应事件
- **性能影响**：触发回流和重绘
- **可访问性**：屏幕阅读器无法读取

### 视觉隐藏类
#### visibility: hidden
- **渲染行为**：元素不可见但保留布局空间
- **空间占用**：保持原有空间占用
- **事件响应**：无法响应事件
- **性能影响**：仅触发重绘
- **可访问性**：屏幕阅读器无法读取

#### opacity: 0
- **渲染行为**：元素完全透明
- **空间占用**：保持原有空间占用
- **事件响应**：可以响应事件
- **性能影响**：可能触发合成层
- **可访问性**：屏幕阅读器可以读取

### 位置偏移类
#### 绝对定位偏移
```css
position: absolute;
left: -9999px;
/* 或 */
position: fixed;
top: -9999px;
```

#### 变换偏移
```css
transform: translateX(-100%);
/* 或 */
transform: scale(0);
```

#### 裁剪隐藏
```css
clip-path: polygon(0 0, 0 0, 0 0, 0 0);
/* 或 */
clip: rect(0, 0, 0, 0);
```

**总结回答**：元素隐藏方法各有特点：display:none完全移除元素但影响布局；visibility:hidden保持布局但不可交互；opacity:0保持交互性；transform和position偏移适合动画；clip-path适合特殊形状裁剪。选择方法需考虑布局影响、交互需求、性能和可访问性。

---

## 5. 块级格式化上下文（BFC）

### 定义与特性
BFC（Block Formatting Context）是Web页面CSS渲染的一部分，是一个独立的渲染区域，决定了其内部块级元素的布局方式，且与外部元素相互隔离。

### 创建条件
- **根元素**：`<html>`
- **浮动元素**：`float` 值不为 `none`
- **绝对定位元素**：`position` 为 `absolute` 或 `fixed`
- **行内块元素**：`display: inline-block`
- **表格相关元素**：`display: table-*`
- **弹性容器**：`display: flex` 或 `inline-flex`
- **网格容器**：`display: grid` 或 `inline-grid`
- **溢出处理**：`overflow` 值不为 `visible`
- **专用创建**：`display: flow-root`
- **多列容器**：`column-count` 或 `column-width`
- **包含块**：`contain: layout`、`contain: paint`

### 布局规则
1. 内部块级元素垂直排列
2. 相邻块级元素的垂直margin会发生合并
3. BFC区域不会与浮动元素重叠
4. 计算BFC高度时包含浮动元素
5. BFC是页面上的独立容器

### 应用场景
- **清除浮动**：解决父容器高度塌陷
- **防止margin合并**：阻止相邻元素margin重叠
- **自适应布局**：防止元素被浮动元素覆盖
- **多列布局**：创建独立的布局上下文

**总结回答**：BFC是CSS布局中的重要概念，创建独立的渲染区域。主要用于解决浮动塌陷、margin合并、元素重叠等布局问题。常用触发方式包括overflow:hidden、display:flow-root、flex/grid容器等。理解BFC有助于解决复杂的布局问题。

---

## 6. 元素居中对齐技术

### 现代布局方案

#### Flexbox布局方案
```css
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center;     /* 垂直居中 */
}
```

#### Grid布局方案
```css
.container {
  display: grid;
  place-items: center;
}
```

### 传统布局方案

#### 绝对定位方案
```css
.element {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 行高居中（单行文本）
```css
.text {
  line-height: 容器高度;
  text-align: center;
}
```

#### 表格单元格方案
```css
.container {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
```

#### margin自动居中（已知宽度）
```css
.element {
  width: 200px;
  margin: 0 auto;
}
```

**总结回答**：元素居中有多种实现方案：Flexbox和Grid是现代推荐方案，语法简洁且功能强大；绝对定位+transform适合固定定位场景；传统方案如line-height、table-cell、margin:auto在特定场景下仍有价值。选择方案需考虑兼容性、布局复杂度和维护成本。

---

## 7. 多栏布局实现方案

### 两栏布局

#### Flexbox实现
```css
.container {
  display: flex;
}
.sidebar {
  flex: 0 0 200px; /* 固定宽度 */
}
.main {
  flex: 1; /* 自适应 */
}
```

#### 浮动实现
```css
.sidebar {
  float: left;
  width: 200px;
}
.main {
  margin-left: 200px;
}
```

#### calc()计算实现
```css
.sidebar {
  float: left;
  width: 200px;
}
.main {
  float: right;
  width: calc(100% - 200px);
}
```

### 三栏布局

#### Flexbox实现（推荐）
```css
.container {
  display: flex;
}
.left {
  flex: 0 0 150px;
  order: 1;
}
.main {
  flex: 1;
  order: 2;
}
.right {
  flex: 0 0 200px;
  order: 3;
}
```

#### Grid布局实现
```css
.container {
  display: grid;
  grid-template-columns: 150px 1fr 200px;
  grid-template-areas: "left main right";
}
```

#### 圣杯布局（Holy Grail）
- **核心技术**：浮动 + 负margin + 相对定位
- **优势**：主内容优先加载
- **劣势**：实现复杂，兼容性要求高

#### 双飞翼布局（Double Wing）
- **核心技术**：浮动 + 负margin + 内层容器
- **优势**：相对简单，主内容优先
- **劣势**：需要额外HTML结构

**总结回答**：多栏布局方案从传统的浮动、定位发展到现代的Flexbox、Grid。Flexbox适合一维布局，Grid适合二维布局，都具有良好的响应式特性。圣杯和双飞翼布局是经典的三栏布局方案，虽然实现复杂但理解其原理有助于深入掌握CSS布局机制。

---

## 8. CSS动画技术体系

### 过渡动画（Transitions）
```css
.element {
  transition-property: all;        /* 过渡属性 */
  transition-duration: 0.3s;       /* 过渡时长 */
  transition-timing-function: ease; /* 缓动函数 */
  transition-delay: 0s;            /* 延迟时间 */
  
  /* 简写语法 */
  transition: all 0.3s ease 0s;
}
```

### 变换动画（Transforms）
```css
.element {
  transform: translateX(100px) rotate(45deg) scale(1.2);
  transform-origin: center center;
}
```

### 关键帧动画（Keyframe Animations）
```css
@keyframes slideIn {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

.element {
  animation-name: slideIn;              /* 动画名称 */
  animation-duration: 1s;               /* 动画时长 */
  animation-timing-function: ease-out;   /* 缓动函数 */
  animation-delay: 0.5s;                /* 延迟时间 */
  animation-iteration-count: infinite;   /* 重复次数 */
  animation-direction: alternate;        /* 播放方向 */
  animation-fill-mode: forwards;         /* 填充模式 */
  animation-play-state: running;         /* 播放状态 */
  
  /* 简写语法 */
  animation: slideIn 1s ease-out 0.5s infinite alternate forwards;
}
```

**总结回答**：CSS动画包括Transition（过渡）、Transform（变换）和Animation（关键帧动画）三大技术。Transition适合简单的状态变化，Animation适合复杂的动画序列，Transform提供2D/3D变换能力。合理使用CSS动画可以提升用户体验，同时要注意性能优化，优先使用transform和opacity属性。

---

## 9. 浏览器渲染机制与性能优化

### 页面渲染流程

#### 网络层处理
1. **DNS解析**：域名到IP地址转换
2. **TCP连接建立**：三次握手建立连接
3. **HTTP请求发送**：发送请求报文
4. **服务器响应**：接收响应数据
5. **连接关闭**：四次挥手关闭连接

#### 浏览器渲染层处理
1. **HTML解析**：构建DOM树（Document Object Model）
2. **CSS解析**：构建CSSOM树（CSS Object Model）
3. **渲染树构建**：合并DOM和CSSOM生成Render Tree
4. **布局计算**（Layout/Reflow）：计算元素几何属性
5. **绘制处理**（Paint）：填充像素数据
6. **合成处理**（Composite）：图层合并输出

### 回流（Reflow）机制

#### 定义
回流是浏览器重新计算元素几何属性（位置、尺寸）并重新构建渲染树的过程。

#### 触发条件
- **几何属性变更**：width、height、padding、margin、border
- **位置属性变更**：top、left、right、bottom
- **布局属性变更**：position、float、clear、display
- **内容变更**：文本内容、图片尺寸、字体大小
- **布局查询**：offsetWidth、scrollTop、getComputedStyle()
- **Flexbox/Grid属性变更**：flex-direction、justify-content等

### 重绘（Repaint）机制

#### 定义
重绘是浏览器重新绘制元素外观样式的过程，不涉及几何属性计算。

#### 触发条件
- **颜色属性**：color、background-color、border-color
- **视觉效果**：box-shadow、border-radius、outline
- **可见性**：visibility、opacity

### 性能优化策略

#### 减少回流重绘
1. **批量DOM操作**：使用DocumentFragment
2. **CSS类切换**：避免逐个样式修改
3. **脱离文档流**：使用absolute/fixed定位
4. **使用transform**：替代位置属性变更
5. **使用克隆节点**：避免直接操作DOM

#### 利用GPU加速
```css
.element {
  will-change: transform; /* 提示浏览器优化 */
  transform: translateZ(0); /* 强制硬件加速 */
}
```

#### 避免强制同步布局
```javascript
// 避免
element.style.width = '100px';
console.log(element.offsetWidth); // 强制回流

// 推荐
const width = element.offsetWidth; // 先读取
element.style.width = '100px';     // 后修改
```

**总结回答**：浏览器渲染包括解析、布局、绘制、合成四个阶段。回流影响布局计算，重绘影响视觉呈现，回流必然引起重绘。性能优化的核心是减少回流重绘次数，通过批量操作、使用transform、避免强制同步布局等方式提升渲染性能。

---

## 10. CSS绘制三角形技术

### 边框三角形原理
```css
.triangle {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-bottom: 100px solid red;
}
```

### 多种三角形实现

#### 向上三角形
```css
.triangle-up {
  width: 0;
  height: 0;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  border-bottom: 50px solid #000;
}
```

#### 向右三角形
```css
.triangle-right {
  width: 0;
  height: 0;
  border-top: 25px solid transparent;
  border-bottom: 25px solid transparent;
  border-left: 50px solid #000;
}
```

#### 使用clip-path实现
```css
.triangle-clip {
  width: 100px;
  height: 100px;
  background: red;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
```

**总结回答**：CSS绘制三角形主要利用border属性的特性，通过设置元素宽高为0，然后设置不同方向的border来形成三角形。现代方案可以使用clip-path属性实现更灵活的形状。这种技术常用于制作箭头、提示框等UI组件。

---

## 11. 响应式布局设计

### 概念定义
响应式布局（Responsive Web Design）是指网页能够根据不同的设备屏幕尺寸、分辨率和方向，自动调整布局、内容和交互方式，以提供最佳的用户体验。

### 核心技术

#### 媒体查询（Media Queries）
```css
/* 移动设备 */
@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

/* 平板设备 */
@media screen and (min-width: 769px) and (max-width: 1024px) {
  .container {
    grid-template-columns: 1fr 1fr;
  }
}

/* 桌面设备 */
@media screen and (min-width: 1025px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### 弹性布局（Flexbox）
```css
.container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item {
  flex: 1 1 300px; /* 最小宽度300px，可伸缩 */
}
```

#### 网格布局（Grid）
```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

#### 响应式图片
```html
<!-- 使用srcset属性 -->
<img src="image-small.jpg" 
     srcset="image-small.jpg 480w, 
             image-medium.jpg 800w, 
             image-large.jpg 1200w"
     sizes="(max-width: 480px) 100vw, 
            (max-width: 800px) 50vw, 
            25vw"
     alt="响应式图片">

<!-- 使用picture元素 -->
<picture>
  <source media="(max-width: 480px)" srcset="image-mobile.jpg">
  <source media="(max-width: 800px)" srcset="image-tablet.jpg">
  <img src="image-desktop.jpg" alt="响应式图片">
</picture>
```

### 设计原则
1. **移动优先**（Mobile First）：从小屏幕开始设计
2. **渐进增强**（Progressive Enhancement）：逐步添加功能
3. **内容优先**：确保核心内容在所有设备上可访问
4. **性能优化**：针对不同设备优化资源加载

### 优势与挑战

#### 优势
- **设备适配性强**：一套代码适配多种设备
- **用户体验一致**：保持品牌和交互的一致性
- **维护成本低**：相比独立的移动版本
- **SEO友好**：单一URL，便于搜索引擎索引

#### 挑战
- **设计复杂度高**：需要考虑多种屏幕尺寸
- **性能优化难度大**：需要平衡功能和性能
- **测试工作量大**：需要在多种设备上测试
- **兼容性问题**：老旧浏览器支持有限

**总结回答**：响应式布局是现代Web开发的标准做法，通过媒体查询、弹性布局、网格布局等技术实现跨设备适配。核心是移动优先的设计理念和渐进增强的开发策略。虽然增加了设计和开发复杂度，但能够提供一致的用户体验和更好的维护性。

---

## 12. 1像素边框问题解决方案

### 问题背景
在高DPR（Device Pixel Ratio）设备上，CSS的1px边框会被渲染为多个物理像素，导致边框看起来过粗，影响视觉效果。

### 解决方案

#### 方案一：transform缩放
```css
.border-1px {
  position: relative;
}

.border-1px::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  border: 1px solid #ddd;
  transform: scale(0.5);
  transform-origin: 0 0;
  box-sizing: border-box;
}

/* 针对不同DPR的媒体查询 */
@media (-webkit-min-device-pixel-ratio: 2) {
  .border-1px::after {
    width: 200%;
    height: 200%;
    transform: scale(0.5);
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .border-1px::after {
    width: 300%;
    height: 300%;
    transform: scale(0.33333);
  }
}
```

#### 方案二：viewport缩放
```html
<meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, minimum-scale=0.5, user-scalable=no">
```

#### 方案三：border-image
```css
.border-1px {
  border-bottom: 1px solid transparent;
  border-image: linear-gradient(to bottom, transparent 50%, #ddd 50%) 0 0 1 0;
}
```

#### 方案四：box-shadow
```css
.border-1px {
  box-shadow: inset 0 -1px 0 0 #ddd;
}
```

#### 方案五：SVG背景
```css
.border-1px {
  background-image: url("data:image/svg+xml;charset=utf-8,%3csvg width='100%25' height='1px' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='0' y1='0' x2='100%25' y2='0' stroke='%23ddd'/%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: bottom;
}
```

**总结回答**：1像素边框问题是移动端开发的经典问题，主要由高DPR设备的物理像素与CSS像素不匹配造成。解决方案包括transform缩放、viewport缩放、border-image、box-shadow和SVG背景等。transform缩放方案最为常用，兼容性好且效果稳定。

---

## 13. 小字体显示技术

### 问题背景
大部分浏览器都有最小字体限制（通常为12px），当设置小于12px的字体时，浏览器会自动将其调整为12px，这在某些设计场景下会影响视觉效果。

### 解决方案

#### 方案一：transform缩放
```css
.small-font {
  font-size: 12px;
  transform: scale(0.8); /* 缩放到9.6px效果 */
  transform-origin: left top;
  display: inline-block;
}

/* 精确控制缩放比例 */
.font-10px {
  font-size: 12px;
  transform: scale(0.833); /* 12px * 0.833 ≈ 10px */
}

.font-8px {
  font-size: 12px;
  transform: scale(0.667); /* 12px * 0.667 ≈ 8px */
}
```

#### 方案二：zoom属性（非标准）
```css
.small-font {
  font-size: 12px;
  zoom: 0.8; /* 仅Webkit内核支持 */
}
```

#### 方案三：SVG文本
```html
<svg width="100" height="20">
  <text x="0" y="15" font-size="8" fill="#333">8px文字</text>
</svg>
```

#### 方案四：Canvas绘制
```javascript
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '8px Arial';
ctx.fillText('8px文字', 0, 10);
```

#### 方案五：图片替换
```css
.small-text {
  width: 50px;
  height: 12px;
  background: url('small-text.png') no-repeat;
  text-indent: -9999px;
  overflow: hidden;
}
```

### 注意事项
1. **可访问性**：确保文本仍然可被屏幕阅读器识别
2. **性能影响**：transform会创建新的层叠上下文
3. **布局影响**：缩放可能影响周围元素的布局
4. **兼容性**：不同浏览器的最小字体限制可能不同

**总结回答**：小字体显示问题主要通过transform缩放解决，这是最兼容且实用的方案。其他方案如zoom属性、SVG、Canvas各有特点但使用场景有限。在实际应用中需要权衡视觉效果、可访问性和性能影响，建议优先考虑设计层面的解决方案。

---

## 14. CSS预处理器技术体系

### 概念定义
CSS预处理器（CSS Preprocessor）是一种脚本语言，它扩展了CSS的功能，允许开发者使用变量、函数、嵌套规则、混合（Mixin）、继承等高级特性来编写样式代码，然后通过编译器将其转换为标准的CSS代码。

### 主流预处理器对比

#### Sass/SCSS（Syntactically Awesome Style Sheets）
- **语法特点**：支持两种语法格式
  - **Sass语法**：缩进式语法，不使用大括号和分号
  - **SCSS语法**：类似CSS的语法，使用大括号和分号
- **编译方式**：Ruby Sass、Dart Sass、LibSass
- **特色功能**：强大的函数库、条件语句、循环语句

```scss
// SCSS语法示例
$primary-color: #3498db;
$border-radius: 4px;

@mixin button-style($bg-color) {
  background-color: $bg-color;
  border-radius: $border-radius;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: darken($bg-color, 10%);
  }
}

.btn-primary {
  @include button-style($primary-color);
}
```

#### Less（Leaner Style Sheets）
- **语法特点**：完全兼容CSS语法
- **编译方式**：Node.js、浏览器端编译
- **特色功能**：JavaScript表达式支持、客户端编译

```less
// Less语法示例
@primary-color: #3498db;
@border-radius: 4px;

.button-style(@bg-color) {
  background-color: @bg-color;
  border-radius: @border-radius;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: darken(@bg-color, 10%);
  }
}

.btn-primary {
  .button-style(@primary-color);
}
```

#### Stylus
- **语法特点**：极简语法，可选的大括号、冒号、分号
- **编译方式**：Node.js
- **特色功能**：Python风格的语法、强大的内置函数

```stylus
// Stylus语法示例
primary-color = #3498db
border-radius = 4px

button-style(bg-color)
  background-color bg-color
  border-radius border-radius
  padding 10px 20px
  border none
  cursor pointer
  
  &:hover
    background-color darken(bg-color, 10%)

.btn-primary
  button-style(primary-color)
```

### 核心功能特性

#### 变量（Variables）
```scss
// 全局变量
$font-size-base: 16px;
$line-height-base: 1.5;
$color-primary: #007bff;

// 局部变量
.component {
  $local-padding: 20px;
  padding: $local-padding;
}
```

#### 嵌套规则（Nesting）
```scss
.navbar {
  background-color: #fff;
  padding: 1rem;
  
  .nav-item {
    display: inline-block;
    margin-right: 1rem;
    
    &:last-child {
      margin-right: 0;
    }
    
    .nav-link {
      color: #333;
      text-decoration: none;
      
      &:hover {
        color: #007bff;
      }
    }
  }
}
```

#### 混合（Mixins）
```scss
// 定义混合
@mixin flex-center($direction: row) {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: $direction;
}

@mixin responsive-font($min-size, $max-size) {
  font-size: clamp(#{$min-size}px, 4vw, #{$max-size}px);
}

// 使用混合
.modal {
  @include flex-center(column);
  @include responsive-font(14, 18);
}
```

#### 继承（Inheritance）
```scss
// 占位符选择器
%button-base {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  @extend %button-base;
  background-color: #007bff;
  color: white;
}

.btn-secondary {
  @extend %button-base;
  background-color: #6c757d;
  color: white;
}
```

#### 函数（Functions）
```scss
// 内置函数
.element {
  color: lighten(#333, 20%);
  background: rgba(255, 0, 0, 0.5);
  width: percentage(3/4);
}

// 自定义函数
@function rem($pixels, $base: 16px) {
  @return ($pixels / $base) * 1rem;
}

.title {
  font-size: rem(24px);
  margin-bottom: rem(16px);
}
```

#### 条件语句与循环
```scss
// 条件语句
@mixin theme-color($theme) {
  @if $theme == 'dark' {
    background-color: #333;
    color: #fff;
  } @else if $theme == 'light' {
    background-color: #fff;
    color: #333;
  } @else {
    background-color: #f5f5f5;
    color: #666;
  }
}

// 循环语句
@for $i from 1 through 12 {
  .col-#{$i} {
    width: percentage($i / 12);
  }
}

$breakpoints: (xs: 480px, sm: 768px, md: 992px, lg: 1200px);
@each $name, $width in $breakpoints {
  @media (min-width: $width) {
    .container-#{$name} {
      max-width: $width;
    }
  }
}
```

### 模块化与导入

#### 文件组织结构

src/
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss
│   │   ├── _mixins.scss
│   │   └── _functions.scss
│   ├── base/
│   │   ├── _reset.scss
│   │   └── _typography.scss
│   ├── components/
│   │   ├── _buttons.scss
│   │   └── _cards.scss
│   ├── layout/
│   │   ├── _header.scss
│   │   └── _footer.scss
│   └── main.scss

#### 导入语法
```scss
// main.scss
@import 'abstracts/variables';
@import 'abstracts/mixins';
@import 'abstracts/functions';

@import 'base/reset';
@import 'base/typography';

@import 'layout/header';
@import 'layout/footer';

@import 'components/buttons';
@import 'components/cards';
```

### 构建工具集成

#### Webpack配置
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                outputStyle: 'compressed'
              }
            }
          }
        ]
      }
    ]
  }
};
```

#### Vite配置
```javascript
// vite.config.js
export default {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  }
};
```

### 性能优化策略

#### 编译优化
1. **按需编译**：只编译修改的文件
2. **并行处理**：利用多核CPU并行编译
3. **缓存机制**：缓存编译结果
4. **Source Map**：生成源码映射便于调试

#### 代码优化
```scss
// 避免过深嵌套（建议不超过3层）
.nav {
  .item {
    .link {
      // 最多3层嵌套
    }
  }
}

// 合理使用混合，避免代码膨胀
@mixin button-variant($color) {
  @if lightness($color) > 50% {
    color: #333;
  } @else {
    color: #fff;
  }
  background-color: $color;
}
```

### 优势与局限性

#### 优势
1. **开发效率提升**：减少重复代码，提高可维护性
2. **代码组织性**：模块化管理，结构清晰
3. **功能扩展性**：变量、函数、混合等高级特性
4. **团队协作**：统一的代码规范和样式指南
5. **工程化支持**：与构建工具无缝集成

#### 局限性
1. **学习成本**：需要掌握预处理器语法
2. **编译依赖**：需要构建工具支持
3. **调试复杂性**：需要Source Map支持
4. **文件体积**：可能产生冗余CSS代码
5. **兼容性问题**：不同预处理器间语法差异

### 最佳实践

#### 命名规范
```scss
// BEM命名方法论
.block {
  &__element {
    &--modifier {
      // 样式规则
    }
  }
}

// 变量命名
$color-primary: #007bff;
$font-size-large: 18px;
$breakpoint-mobile: 768px;
```

#### 文件组织
```scss
// 7-1架构模式
// 7个文件夹，1个主文件
sass/
├── abstracts/     // 工具和辅助文件
├── vendors/       // 第三方库
├── base/          // 基础样式
├── layout/        // 布局组件
├── components/    // UI组件
├── pages/         // 页面特定样式
├── themes/        // 主题样式
└── main.scss      // 主文件
```

**总结回答**：CSS预处理器是现代前端开发的重要工具，通过变量、嵌套、混合、继承、函数等特性大幅提升开发效率和代码质量。主流的Sass/SCSS、Less、Stylus各有特色，Sass功能最强大，Less兼容性最好，Stylus语法最简洁。预处理器的核心价值在于提供编程语言特性、模块化管理和工程化支持，但也带来了学习成本和构建复杂性。选择预处理器需要考虑团队技术栈、项目需求和维护成本。

---

## 总结

本CSS面试题集涵盖了前端开发中的核心CSS技术点，从基础的盒模型、选择器到高级的布局技术、性能优化，每个知识点都配有详细的技术说明和实际应用场景。掌握这些内容有助于：

1. **建立完整的CSS知识体系**
2. **解决实际开发中的布局和样式问题**
3. **提升代码质量和性能优化能力**
4. **应对各种CSS相关的技术面试**

建议结合实际项目练习，深入理解每个技术点的原理和应用场景，形成系统性的CSS技能。
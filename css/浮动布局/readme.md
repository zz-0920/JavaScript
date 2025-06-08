# 文档流
- 浏览器页面从左到右，从上到下排列元素

# 浮动布局
- 浮动存在的意义
  1. 文字环绕图片

- 水平布局
  1. display: inline-block； 会出现空白间隙  解决： 给父元素添加 font-size: 0;
  2. float: left;  会导致父元素高度塌陷  解决： 给父元素添加 overflow: hidden;

- 浮动布局
  1. 浮动元素的高度不计算在父元素的高度中，导致父容器和后续元素重叠
  2. 清除浮动
    1. 直接设置父元素的高度 --- 不推荐
    2. 在浮动元素的后面添加一个空的 div 标签，给这个空的 div 标签设置 clear: both; --- 不推荐
    3. 伪元素清除浮动 --- 推荐
      - 给父元素添加伪元素 ::after {
        content: '';
        display: block;
        clear: both;
      }
    4. 给被浮动影响的容器做清楚浮动 clear: both; --- 不推荐
    5. 给父元素设置 overflow: hidden; --- 推荐

# BFC - block format context - 块级格式化上下文
- 是一个独立的渲染区域，只有块级盒子参与，它规定了内部的块级盒子如何布局，并且与这个区域外部毫不相干。
- 默认情况下，子容器的 margin-top 会和父容器的 margin-top 发生重叠, BFC 可以用来解决这个问题
- 如何创建BFC容器
  1. overflow: hidden || auto || scroll || overlay;
  2. position: absolute || fixed;
  3. display: inline-block || table-cell || table-caption || flex || inline-flex;
  4. float: left || right;
- 形成BFC的条件
  1. 浮动元素
  2. 绝对定位元素
  3. 行内块元素
- BFC容器的特点
  1. 当一个容器被设置为 BFC 容器后，它有一套独特的渲染规则
  2. 子容器的 margin-top 不会和父容器的 margin-top 发生重叠
  3. BFC 容器在计算高度时，会将浮动元素也计算在内
# 动画
1. 过度动画
 transition: width 2s ease-in-out;
 控制容器的某一个属性值 发生变更时 施加一个过渡时间

2. 复杂动画(自定义动画)
 @keyframes xxx 可以定义一个动画
 animation: xxx 3s linear infinite; 让自定义的动画生效

3. 项目开发中一些特别复杂的交互动画
 1. css 动画库 animate.css
 2. react-spring 实现弹簧动画效果
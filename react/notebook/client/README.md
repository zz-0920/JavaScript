# 移动端适配问题
rem: 相对于页面跟字体大小
例如: 跟字体是 10px， 1ren = 10px，一个容器设置为 10rem 宽，当用户使用更大的手机屏幕时，我们需要将跟字体调大。

# UI库
react-vant

# css 预处理器
less

# HTML 标签样式重置
reset.css

# 项目梳理
- 安装路由 react-router-dom

1. 集中式路由配置
  - 集中式路由配置的作用是将所有路由配置放在一个地方，方便管理。
  - 集中式路由配置的实现方式是使用 useRoutes 这个 Hook 函数。
  - 路由懒加载(提高首页加载速度)：将每个路由组件都用 React.lazy 函数包裹起来，只有当用户访问该路由时，才会加载该路由组件。

2. 开发登录页面
  - css 样式隔离 xxx.module.less
    - css 样式隔离的作用是将每个页面的 css 样式隔离开来，避免不同页面的 css 样式互相影响。
  - 发登录请求 axios (XMlHttpRequest, fetch)
  
  axios.post('http://192.168.3.1:3000/login')
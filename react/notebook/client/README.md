# 移动端适配问题
rem: 相对于页面跟字体大小
例如: 跟字体是 10px， 1ren = 10px，一个容器设置为 10rem 宽，当用户使用更大的手机屏幕时，我们需要将跟字体调大。

# UI库
react-vant

# css 预处理器
less

# HTML 标签样式重置
reset.css

# 路由传参
1. navigate('/home?id=1') useSearchParams() // 获取当前路由的信息

2. navigate('/home/1') 配置路由时 path: '/home/:id' useParams() 获取当前路由的参数

3. navigate('/home', { state: { title: '首页' } }) // useLocation()  和第一种的区别是，第一种是在 url 中添加参数，第二种是在 state 中添加参数，这样的好处是不会在 url 中暴露参数，而是在 state 中添加参数。

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
  
  axios.post('login')

3. 因为react-vantToast 组件不兼容react 19，所以使用了 antd-mobile 组件库

4. 登录鉴权
 - 当用户未登录，就访问首页时，且首页在加载时会向后端发送请求，后端会判断用户是否登录。
 - 后端在登录接口中生成一个 token，将 token 发送给前端。
 - 前端将 token 存储在 localStorage 中。
 - 前端在每次请求时，都会将 token 发送给后端。
 - 后端会判断 token 是否存在，如果存在，就说明用户已登录，不存在就返回 401 状态码。
 - 前端就知道用户未登录，就跳转到登录页面。
 
 - 以上功能实现了鉴权，但是 token 在规定的时间后就会过期，过期后就需要重新登录，体验很差。

 实现一个无感刷新 token 的功能
  - 后端在登录接口返回一个长 token 和 一个短 token。

5. 首页 noteClass

6. 列表页 noteList
 - 手动封装
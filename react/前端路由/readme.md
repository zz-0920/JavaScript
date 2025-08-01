# 路由
用来描述服务器上的资源路径

# 前端路由
- 单页引用中

- 构建浏览器 URL 地址和组件之间的映射关系
1. 怎么知道 URL 变更了 -- 监听 hashchange 事件
2. 浏览器不能刷新 -- 采用 hash 模式

# hash模式和history模式
 - 在浏览器眼里， url 中携带了 # ，# 后面的内容都会被认为是 hash 值，浏览器中 hash 值改变不会导致页面刷新
 - history 模式下， url 中没有 # ，但是可以使用 pushState 方法来改变 url ，但是改变 url 不会导致页面刷新

# hash 模式
 原理：
 1. 使用 addEventListener 的 hashchange 事件监听 url 变更事件
 2. 当 url 变更时，使用 location.hash 事件参数获取到 hash 值
 3. 遍历路由表，根据 hash 值找到对应的组件，将组件渲染到页面中

# history 模式
 原理：
 1. 使用 addEventListener 的 popstate 事件监听 url 变更事件
 2. 当 url 变更时，使用 location.pathname 事件参数获取到 pathname 值
 3. 遍历路由表，根据 pathname 值找到对应的组件，将组件渲染到页面中
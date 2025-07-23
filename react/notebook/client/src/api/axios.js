import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3000'
// 告诉浏览器，如果发送的是 post 请求，那么后端一定会返回 json 数据，让浏览器以解析 json 的方式解析响应体
axios.defaults.headers.post['Content-Type'] = 'application/json'

export default axios
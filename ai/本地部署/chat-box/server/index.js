const Koa = require('koa')
const app = new Koa()
const Router = require('@koa/router')
const router = new Router()
const { bodyParser } = require('@koa/bodyparser')
const axios = require('axios')

app.use(async (ctx, next) => {
  // 设置响应头
  ctx.set('Access-Control-Allow-Origin', '*')  // 允许所有域名访问，也可以指定域名
  ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  if (ctx.method === 'OPTIONS') {  // 预检请求
    ctx.status = 204
    return
  }
  await next()
})

app.use(bodyParser())


router.post('/chat', async(ctx) => {
  const message = ctx.request.body
  // console.log(message);
  const data = {
    model: 'deepseek-r1:1.5b',
    messages: [message],
    stream: false,
  }

  const res = await axios.post('http://localhost:11434/api/chat', data)
  // console.log(res.data.message.content);
  ctx.body = {
    code: 1,
    data: res.data.message.content,
  }
})


app.use(router.routes())


app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
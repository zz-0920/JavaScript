const Koa = require('koa');
const app = new Koa();
const userRouter = require('./router/user.js');
const noteRouter = require('./router/note.js');
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');

// app.use(async ctx => {
//     console.log(ctx);
//     if (ctx.url === '/home') {
//         ctx.body = 'Hello World';
//     }
// });

app.use(cors()); // 告诉浏览器，允许前端跨域请求我
app.use(bodyParser()); // 辅助 koa 解析请求体中的数据

// 1. 被 app.use() 调用的函数中一点会有 ctx 参数，ctx 是 Koa 中的上下文对象
// 2. userRouter.routes() 就是 user.js 中所有的 router
app.use(userRouter.routes(), userRouter.allowedMethods());
app.use(noteRouter.routes(), noteRouter.allowedMethods());

app.listen(3000, () => {
    console.log('server is running at port 3000');
});
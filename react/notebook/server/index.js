const Koa = require('koa');
const app = new Koa();
const userRouter = require('./router/user.js');
const noteRouter = require('./router/note.js');
const cors = require('@koa/cors');
const { bodyParser } = require('@koa/bodyparser');

app.use(cors());

// 修改这里：增加请求体大小限制
app.use(bodyParser({
  jsonLimit: '50mb',    // JSON请求体限制50MB
  formLimit: '50mb',    // 表单请求体限制50MB
  textLimit: '50mb',    // 文本请求体限制50MB
  enableTypes: ['json', 'form', 'text']
}));

app.use(userRouter.routes(), userRouter.allowedMethods());
app.use(noteRouter.routes(), noteRouter.allowedMethods());

app.listen(3000, () => {
    console.log('server is running at port 3000');
});
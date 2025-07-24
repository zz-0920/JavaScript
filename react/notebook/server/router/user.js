const Router = require('@koa/router');
const router = new Router();
const { userLogin } = require('../controllers/index.js');

router.prefix('/user'); // 路由前缀，所有的路由都需要添加这个前缀

router.post('/login', async (ctx) => {
    // 1. 获取请求体中的用户名和密码
    // post 请求携带的参数，在 ctx.request.body 中
    const { username, password } = ctx.request.body;
    // console.log(username, password);
    // 2. 校验请求体中的账号密码是否合法
    // 去数据库查询账号密码是否正确
    const result = await userLogin(username, password);
    try {
        if (result.length) {
            let data = {
                id: result[0].id,
                username: result[0].username,
                nickname: result[0].nickname,
                create_time: result[0].create_time,
            }
            ctx.body = {
                code: '1',
                msg: '登录成功',
                data: data
            }
        } else {  // 逻辑性错误
            ctx.body = {
                code: '0',
                msg: '账号或密码错误',
                data: {}
            }
        }
    } catch (error) { // 程序性错误
        ctx.body = {
            code: '-1',
            msg: '服务器异常',
            data: error
        }
    }
});

module.exports = router;
const Router = require('@koa/router');
const router = new Router();
const { userLogin, findUser, register } = require('../controllers/index.js');
const { sign, verify } = require('../utils/jwt.js');
const { escape } = require('../utils/security.js');

router.prefix('/user'); // 路由前缀，所有的路由都需要添加这个前缀

// 登录接口
router.post('/login', async (ctx) => {
    // 1. 获取请求体中的用户名和密码
    // post 请求携带的参数，在 ctx.request.body 中
    let { username, password } = ctx.request.body;
    // console.log(username, password);
    // 2. 校验请求体中的账号密码是否合法
    // 去数据库查询账号密码是否正确
    const result = await userLogin(username, password);
    username = escape(username);
    password = escape(password);
    try {
        if (result.length) {
            let data = {
                id: result[0].id,
                username: result[0].username,
                nickname: result[0].nickname,
                create_time: result[0].create_time,
            }
            const accessToken = sign(data, '1h');
            const refreshToken = sign(data, '7d');
            console.log('accessToken:', accessToken); // ✅ 修复这里
            console.log('refreshToken:', refreshToken); // ✅ 添加这行用于调试
            ctx.body = {
                code: '1',
                msg: '登录成功',
                data: data,
                accessToken: accessToken, // 短 token
                refreshToken: refreshToken, // 长 token
            }
        } else {  // 逻辑性错误
            ctx.body = {
                code: '0',
                msg: '账号或密码错误',
                data: {}
            }
        }
    } catch (error) { // 程序性错误
        console.error('登录错误:', error); // 添加错误日志
        ctx.body = {
            code: '-1',
            msg: '服务器异常',
            data: error.message || error
        }
    }
});

// 测试接口
router.get('/test', verify(), async (ctx) => {
    ctx.body = {
        code: '1',
        msg: '测试成功',
    }
})

// 刷新token接口
router.post('/refresh', async (ctx) => {
    try {
        const { refreshToken } = ctx.request.body

        if (!refreshToken) {
            ctx.status = 401
            ctx.body = {
                code: '0',
                msg: 'refreshToken不能为空',
                data: {}
            }
            return
        }

        // 验证refreshToken
        const jwt = require('jsonwebtoken')
        const decoded = jwt.verify(refreshToken, 'zz是个大帅哥')

        // 生成新的双token
        const newAccessToken = sign({
            id: decoded.id,
            username: decoded.username,
            nickname: decoded.nickname,
            create_time: decoded.create_time
        }, '1h')

        const newRefreshToken = sign({
            id: decoded.id,
            username: decoded.username,
            nickname: decoded.nickname,
            create_time: decoded.create_time
        }, '7d')

        ctx.body = {
            code: '1',
            msg: 'token刷新成功',
            accessToken: newAccessToken,
            refreshToken: newRefreshToken
        }

    } catch (error) {
        ctx.status = 401
        ctx.body = {
            code: '0',
            msg: 'refreshToken无效或已过期',
            data: {}
        }
    }
})

// 注册接口
router.post('/register', async (ctx) => {
    let { username, password, nickname } = ctx.request.body;
    if (!username || !password || !nickname) {
        ctx.body = {
            code: '0',
            msg: '账号、密码、昵称不能为空',
            data: {}
        }
        return
    }
    // 转译标签，防止sql注入
    username = escape(username);
    password = escape(password);
    nickname = escape(nickname);
    // 检验账号是否存在
    const user = await findUser(username);
    if (user.length) {
        ctx.body = {
            code: '0',
            msg: '账号已存在',
            data: {}
        }
        return
    }
    // 注册账号
    const result = await register(username, password, nickname);
    if (result.affectedRows) {
        ctx.body = {
            code: '1',
            msg: '注册成功',
            data: {
                id: result.insertId,
                username,
                nickname,
                create_time: result.create_time,
            }
        }
    } else {
        ctx.body = {
            code: '0',
            msg: '注册失败',
            data: {}
        }
    }
})

module.exports = router;
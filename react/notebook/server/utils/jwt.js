const jwt = require('jsonwebtoken');

function sign(options, time) {
    return jwt.sign(options, 'zz是个大帅哥', {
        expiresIn: time || '24h' // 24小时过期
    })
}

function verify(token) {
    return async (ctx, next) => {
        // 修复1: 正确提取token
        const authHeader = ctx.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            ctx.status = 401;
            ctx.body = {
                code: '0',
                msg: '未登录',
                data: {}
            }
            return;
        }
        
        // 提取实际的token（去掉'Bearer '前缀）
        const token = authHeader.replace('Bearer ', '');
        
        try {
            const decoded = jwt.verify(token, 'zz是个大帅哥');
            // console.log(decoded);
            if (decoded.id) {
                ctx.userId = decoded.id
                await next();
            }
        } catch (error) {
            ctx.status = 401;
            ctx.body = {
                code: '0',
                msg: '登录过期',
                data: {}
            }
        }
    }
}

module.exports = {
    sign,
    verify
}
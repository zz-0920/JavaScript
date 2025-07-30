const Router = require('@koa/router');
const router = new Router();
const { userLogin, findUser, register, findNodeListByType, findNoteDetailById } = require('../controllers/index.js');
const { verify } = require('../utils/jwt.js');
const { escape } = require('../utils/security.js');

router.get('/findNodeListByType', verify(), async (ctx) => {
    const { note_type } = ctx.request.query // 从 url 后面解析参数
    try {
        const res = await findNodeListByType(note_type, ctx.userId);
        ctx.body = {
            code: '1',
            msg: '查询成功',
            data: res
        }
    } catch (error) {
        ctx.body = {
            code: '0',
            msg: '查询失败',
            data: {}
        }
    }
})

router.get('/findNoteDetailById', verify(), async(ctx) => {
    const { id } = ctx.request.query
    try {
        const res = await findNoteDetailById(id);
        ctx.body = {
            code: '1',
            msg: '查询成功',
            data: res
        }
    } catch (error) {
        ctx.body = {
            code: '0',
            msg: '查询失败',
            data: {}
        }
    }

})

module.exports = router
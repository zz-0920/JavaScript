const Router = require('@koa/router');
const router = new Router();
const { userLogin, findUser, register, findNodeListByType, findNoteDetailById, notePublish } = require('../controllers/index.js');
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

router.post('/note-publish', verify(), async(ctx) => {
    const { note_title, note_content, note_img, note_type, create_time, update_time } = ctx.request.body
    try {
        const res = await notePublish(note_title, note_content, note_img, note_type, create_time, update_time, ctx.userId);
        ctx.body = {
            code: '1',
            msg: '发布成功',
            data: {}
        }
    } catch (error) {
        ctx.body = {
            code: '0',
            msg: '发布失败',
            data: {}
        }
    }
})  

module.exports = router
// 创建一个服务
// 定义一个接口 /api/users
// 读取 db.json 文件，向前端返回数据

const http = require('http');
const { console } = require('inspector');

const server = http.createServer((req, res) => {
    if (req.url === '/api/users') { // 接口地址
        console.log('请求成功');
    }
})
server.listen(3000, () => {
    console.log('服务启动成功');
})
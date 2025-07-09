const http = require('http')
const mysql = require('mysql2')

const server = http.createServer((req, res) => {
    // 当前端请求 /user 路径时，将数据库中的 user 表中的数据读取并返回给前端
    if (req.url === '/user') {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'demo'
        })
        connection.query('select * from user', (err, data) => {
            // console.log(data);
            res.end(JSON.stringify(data))
        })
    }
})

server.listen(8080, () => {
  console.log('server is running');
})
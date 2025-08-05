const http = require('http')
const url = require('url')

const responseData = {
  ID: 'zhangsan',
  Name: '张三',
  RegisterDate: '2023年10月1日'
}
function toHTML(data) {
  return `
    <ul>
      <li>账号: ${data.ID}</li>
      <li>昵称: ${data.Name}</li>
      <li>注册时间: ${data.RegisterDate}</li>
    </ul>
  `
}


const server = http.createServer((req, res) => {
  const { pathname } = url.parse(`http://${req.headers.host}${req.url}`)
  if (pathname === '/') {
    const accept = req.headers.accept

    if (accept.indexOf('application/json') >= 0) {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify(responseData))
    } else {
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'})
      res.end(toHTML(responseData))
    }
    
  } else {
    res.writeHead(404, {
      'Content-Type': 'text/html'
    })
    res.end('<h1>404 not found</h1>')
  }
})

server.listen(8080, () => {
  console.log('server is running at http://127.0.0.1:8080')
})
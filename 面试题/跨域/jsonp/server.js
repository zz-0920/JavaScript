const http = require('http')

const server = http.createServer((req, res) => {
    const query = new URL(req.url, `http://${req.headers.host}`).searchParams
    console.log(query.get('cb'));
    if (query.get('cb')) {
        const cb = query.get('cb')
        const data = 'hello world'
        const result = `${cb}("${data}")`  //  'callback("hello world")'
        res.end(result)
    }   
})

server.listen(3000, () => {
    console.log('server is running')
})



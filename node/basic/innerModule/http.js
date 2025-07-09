// const https = require('https')

// https.get(
//   'https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0',
//   (res) => {
//     let content = ''
//     res.on('data', (chunk) => {
//       content += chunk
//     })

//     res.on('end', () => {
//       console.log(content);
//     })

//   }
// )

// const url = new URL('https://api.juejin.cn/content_api/v1/content/article_rank?category_id=1&type=hot&count=3&from=1&aid=2608&uuid=7145810834685003271&spider=0')
// const req = https.request({
//   method: 'GET',
//   hostname: url.hostname,
//   path: url.pathname + url.search,
//   port: 443
// }, (res) => {
//   let content = ''
//   res.on('data', (chunk) => {
//     content += chunk
//   })

//   res.on('end', () => {
//     console.log(content);
//   })
// })
// req.end()

const http = require('http')

const server = http.createServer((req, res) => {
  res.end('hello http server')
})

server.listen(8080, () => {
  console.log('server is running');
})
// 创建一个服务
// 定义一个接口 /api/users
// 读取 db.json 文件，向前端返回数据

require('dotenv').config()
const http = require('http')
const fs = require('fs')
const OpenAI = require('openai')

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: process.env.DEEPSEEK_API_KEY,
});

const server = http.createServer(async(req, res) => {
  // 处理跨域
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', '*')
  res.setHeader('Access-Control-Allow-Methods', '*')


  if (req.url.includes('/api/users')) {  // 接口
    const url = new URL(req.url, `http://${req.headers.host}`)
    const query = url.searchParams.get('name')  // 获取到了前端传递过来的参数
    
    if (query == 'all') { // 如果前端传递过来的参数是 all，那么就返回所有的数据
      const data = fs.readFileSync('./db.json', 'utf-8')
      const users = JSON.parse(data).users

      res.end(JSON.stringify({
        success: true,
        data: users
      }))
    } else {
      // 让 deepseek 去 db.json 文件中查找 哪一条数据的 name 属性值等于 query
      // 将这条数据返回给前端
      const data = fs.readFileSync('./db.json', 'utf-8')
      const users = await openai.chat.completions.create({
        messages: [
          { role: "system", content: "你是一个很好的助手" },
          {
            role: "user",
            content: `请分析${data}中的数据，找 
            出一条数据的 name 属性值等于 ${query}，
            将这条数据读取出来，存放在一个数组中，返回给我，不要任何其他多余的文字，也不要任何特殊的符号和 json 字样，
            形如：{
              "data": [{
                    "id": 4,
                    "name": "刘洋",
                    "age": 30,
                    "address": "赣州"
                }]
            }`,
          }
        ],
        model: "deepseek-chat",
      })
      // console.log(users.choices[0].message.content, '2222');
      res.end(users.choices[0].message.content)

    }
    
  }

})

server.listen(3000, () => {
  console.log('服务启动成功');
})
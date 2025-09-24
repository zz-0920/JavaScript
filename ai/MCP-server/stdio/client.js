import { spawn } from 'child_process'

// 启动 server.js 子进程
const serverProcess = spawn('node', ['server.js'])

// 监听子进程的标准输出 (服务端的响应)
serverProcess.stdout.on('data', (data) => {
  console.log(`子进程的输出: ${data.toString()}`)
})

// 测试消息
const messages = ['你好吗?', '地球是圆的吗?', '再见!']
messages.forEach((message, index) => {
  setTimeout(() => {
    console.log(`发送消息: ${message}`);
    serverProcess.stdin.write(`${message}\n`)
  }, index * 1000)
})

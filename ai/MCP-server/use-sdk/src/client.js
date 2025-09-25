import { spawn } from 'child_process'

// 启动 server.js 子进程
const serverProcess = spawn('node', ['src/server.js'], {
    cwd: 'c:\\Users\\zz\\Desktop\\深索\\ai\\MCP-server\\use-sdk'
})

// 监听子进程的标准输出 (服务端的响应)
serverProcess.stdout.on('data', (data) => {
    console.log(`服务端响应: ${data.toString()}`)
})

// 监听错误输出
serverProcess.stderr.on('data', (data) => {
    console.error(`服务端错误: ${data.toString()}`)
})

// 测试消息
const testMessages = [
    // 初始化请求
    {
        jsonrpc: '2.0',
        method: 'initialize',
        params: {
            capabilities: {
                elicitation: {},
                roots: { listChanged: true },
                sampling: {}
            },
            clientInfo: {
                name: 'ExampleClient',
                title: 'Example Client',
                version: '1.0.0'
            },
            protocolVersion: '2025-06-18'
        },
        id: 1
    },
    // 调用sum工具
    {
        jsonrpc: '2.0',
        method: 'tools/call',
        params: {
            name: 'sum',
            arguments: { a: 5, b: 3 }
        },
        id: 2
    },
    // 直接调用sum方法
    {
        jsonrpc: '2.0',
        method: 'sum',
        params: { a: 10, b: 20 },
        id: 3
    }
]

// 发送测试消息
testMessages.forEach((message, index) => {
    setTimeout(() => {
        console.log(`发送请求: ${JSON.stringify(message)}`)
        serverProcess.stdin.write(JSON.stringify(message) + '\n')
    }, index * 1000)
})

// 5秒后关闭进程
setTimeout(() => {
    serverProcess.kill()
    console.log('测试完成，关闭服务器进程')
}, 5000)
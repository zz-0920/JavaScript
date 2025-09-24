// process.stdout.write(process.pid + '\n') // 标准输入接口

process.stdin.on('data', (data) => {
    data = data.toString().replace(/[?？]/g, '').replace(/我/g, '你').replace(/你/g, '我').replace(/吗/g, '')
    const res = `子进程的回复: ${data.toString()}`
    process.stdout.write(res + '\n')
})

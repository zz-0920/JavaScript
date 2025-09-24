import utils from './utils.js'

process.stdin.on('data', (data) => {
    const req = JSON.parse(data)
    const funcName = req.method
    const params = req.params
    const res = {
        jsonrpc: '2.0',
        result: utils[funcName](params),
        id: req.id
    }
    process.stdout.write(JSON.stringify(res) + '\n')
})
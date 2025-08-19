const websocket = require('ws')

const ws = new websocket.Server({
    port: 3000
})

let count = 0

ws.on('connection', (ws) => {
    console.log('connection')

    ws.on('message', (data) => {
        console.log(data.toString())
        ws.send('hello')
        setInterval(() => {
            count++
            ws.send(count)
        }, 1000)
    })

})

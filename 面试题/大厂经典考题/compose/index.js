const koa = require('koa')
const app = new koa()

// function main(ctx, next) {
//     console.log('start')
//     ctx.response.body = 'hello world'
//     console.log('end')
//     next()
// }

// function logger(ctx, next) {
//     console.log(`${ctx.request.method} ${ctx.request.url}`)
//     next()
// }

// app.use(main)
// app.use(logger)

function A(ctx, next) {
    console.log('A start')
    next()
    console.log('A end')
}

function B(ctx, next) {
    console.log('B start')
    next()
    console.log('B end')
}

function C(ctx, next) {
    console.log('C start')
    next()
    console.log('C end')
}

app.use(A)
app.use(B)
app.use(C)

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})
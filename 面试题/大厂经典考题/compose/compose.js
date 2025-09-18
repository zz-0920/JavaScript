let middlewares = []

middlewares.push((ctx, next) => {
    console.log('A start')
    next()
    console.log('A end')
})

middlewares.push((ctx, next) => {
    console.log('B start')
    next()
    console.log('B end')
})

middlewares.push((ctx, next) => {
    console.log('C start')
    next()
    console.log('C end')
})

let fn = compose(middlewares)

function compose(middlewares) {
    return function (context) {
        function dispatch(i) {
            if (i >= middlewares.length) return
            const nextFn = () => {
                return dispatch(i + 1)
            }
            middlewares[i](context, nextFn)
        }
        return dispatch(0)
    }
}

fn({})
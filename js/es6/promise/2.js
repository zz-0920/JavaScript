function xq() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('xx相亲成功');
            resolve() // 成功
            // reject() // 失败
        }, 1000);
    })
//     setTimeout(() => {
//         console.log('xx相亲成功');
//         marry() // 回调
//     }, 1000);
}

function marry() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        console.log('xx结婚成功');
        resolve()
    }, 2000);
}) 
}

function baby() {
    setTimeout(() => {
        console.log('xx生宝宝成功');
    }, 500);
}

// xq()
// .then(() => { // 成功
//     marry().then(() => {
//         baby()
//     })
// })

// xq
// .catch(() => { // 失败
//     marry()
// })

// 1. 执行 xq() 立即返回一个 promise 实例对象，但是此时该对象的状态是 pending 等待状态
// 2. .then() 立即触发，但是 then() 里面的回调函数没有触发
// 3. 当执行到 resolve() 就会把该对象的状态改为 fulfilled 成功状态, 然后 then() 里面的回调函数就会触发
//    当执行到 reject() 就会把该对象的状态改为 rejected 失败状态, 然后 catch() 里面的回调函数就会触发

// 链式调用
xq() // 里面执行到了 resolve() 就会执行then里面的内容
.then(() => { // then的源码里面也返回了一个 promise 实例对象,状态默认继承自上一个 promise 实例对象
    return marry()
})
.then(() => { // 保证上一个 then() 返回的 promise 实例对象的状态继承于上一个 then() 里面的 promise 实例对象
    baby()
})
function A() {
   return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('A')
            resolve('A success')
        }, 1000);
    })
}

function B() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('B')
            reject('B fail')
        }, 500);
    })
}

function C() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('C')
            resolve('C success')
        }, 1500);
    })
}

Promise.race([A(), B(), C()]).then(res => {
    console.log(res)
}).catch(err => {
    console.log(err)
})
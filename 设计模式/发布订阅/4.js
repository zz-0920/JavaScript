const zz = {
    a: 1
}

Object.defineProperty(zz, 'a', {
    // value: 100, // 初始值
    // writable: false, // 不可修改
    // configurable: false // 不可删除
    get() {
        return 10
    },
    set(newValue) {
        
        console.log(newValue)
    }
})

zz.a = 120
console.log(zz.a) // 10
let a = 1 // 同步代码 -- 不耗时

setTimeout(() => { // 异步代码 -- 耗时
    a = 2
    console.log(a, 'setTimeout');   
}, 1000)

for(let i = 0; i < 1000; i++){ // cpu性能不足 卡了 3s
    console.log(i);
}

console.log(a)
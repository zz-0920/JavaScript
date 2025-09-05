// 红绿灯算法：红绿黄各自亮 3s，2s，1s
// 要求：
// 1. 红灯亮 3s 后，切换到绿灯
// 2. 绿灯亮 2s 后，切换到黄灯
// 3. 黄灯亮 1s 后，切换到红灯

// 方案一：使用定时器不一定准确
// setInterval(() => {
//     console.log('红');

//     setTimeout(() => {
//         console.log('绿');

//         setTimeout(() => {
//             console.log('黄');
//         }, 2000)
//     }, 3000)

// }, 6000)

// 方案二：使用 Promise 实现
function timePromise(time) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, time)
    })
}

function setColor(color, time) {
    console.log(color);
    return timePromise(time)
}

async function run() {
    await setColor('红', 3000)
    await setColor('绿', 2000)
    await setColor('黄', 1000)
    run()
}
run()
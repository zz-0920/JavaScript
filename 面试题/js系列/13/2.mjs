console.log('1. 同步代码开始');

setTimeout(() => {
  console.log('2. setTimeout 1');
  Promise.resolve().then(() => {
    console.log('3. Promise 1 微任务');
    process.nextTick(() => console.log('4. nextTick 1'));
  });
}, 0);

new Promise((resolve) => {
  console.log('5. Promise 构造函数同步代码');
  resolve();
}).then(() => {
  console.log('6. Promise 1 then 微任务');
  setTimeout(() => {
    console.log('7. setTimeout 2');
    queueMicrotask(() => console.log('8. queueMicrotask'));
  }, 0);
});

process.nextTick(() => {
  console.log('9. nextTick 2');
  Promise.resolve().then(() => console.log('10. Promise 2 微任务'));
});

setTimeout(() => {
  console.log('11. setTimeout 3');
  Promise.resolve().then(() => {
    console.log('12. Promise 3 微任务');
    setTimeout(() => console.log('13. setTimeout 4'), 0);
  });
}, 0);

console.log('14. 同步代码结束');


// []
// []
// 1. 同步代码开始
// 5. Promise 构造函数同步代码
// 14. 同步代码结束
// 6. Promise 1 then 微任务
// 9. nextTick 2
// 10. Promise 2 微任务
// 2. setTimeout 1
// 3. Promise 1 微任务
// 4. nextTick 1
// 11. setTimeout 3
// 12. Promise 3 微任务
// '7. setTimeout 2
// 8. queueMicrotask
// 13. setTimeout 4
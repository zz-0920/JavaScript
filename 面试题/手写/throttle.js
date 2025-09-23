/**
 * 节流函数 - 规定在一个单位时间内，只能触发一次函数
 * 应用场景：滚动事件、鼠标移动、拖拽等高频事件
 */

// 时间戳版本 - 第一次立即执行，最后一次不执行
function throttle(fn, interval) {
    let lastTime = 0; // 记录上一次执行时间
    return function (...args) {
        const now = Date.now(); // 当前时间戳
        // 如果当前时间 - 上次执行时间 >= 间隔时间，则执行
        if (now - lastTime >= interval) {
            fn.apply(this, args);
            lastTime = now; // 更新上次执行时间
        }
    };
}

function throttle(fn, interval) {
    let lastTime = 0; // 记录上一次执行时间
    return function (...args) {
        const now = Date.now()
        if (now - lastTime >= interval) {
            fn.apply(this, args);
            lastTime = now; // 更新上次执行时间
        }
    }
}

// 测试用例
console.log('=== 节流函数测试 ===');

// 模拟滚动事件
function handleScroll() {
    console.log(`滚动事件触发: ${new Date().toLocaleTimeString()}`);
}

const throttledScroll = throttle(handleScroll, 1000);

// 模拟快速滚动
console.log('开始快速滚动测试...');
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        throttledScroll();
    }, i * 100);
}

// 不同配置的测试
console.log('\n测试不同配置...');

// 不要首次执行
const noLeading = throttle(handleScroll, 1000, { leading: false });
console.log('不要首次执行:');
noLeading(); // 不会立即执行

// 不要末次执行
const noTrailing = throttle(handleScroll, 1000, { trailing: false });
console.log('不要末次执行:');
noTrailing(); // 立即执行，但不会有延迟执行

// 实际应用示例
const scrollElement = {
    addEventListener: function (event, handler) {
        console.log(`模拟监听 ${event} 事件`);
        // 模拟快速滚动
        for (let i = 0; i < 20; i++) {
            setTimeout(() => handler(), i * 50);
        }
    }
};

// 滚动节流
const handleScrollThrottled = throttle(function () {
    console.log('处理滚动事件 - 更新滚动位置');
}, 100);

scrollElement.addEventListener('scroll', handleScrollThrottled);

// 鼠标移动节流
const handleMouseMove = throttle(function (event) {
    console.log('鼠标移动:', event);
}, 16); // 约60fps

// API请求节流
const handleApiRequest = throttle(function (data) {
    console.log('发送API请求:', data);
}, 1000);

module.exports = {
    throttle,
    throttleTimestamp,
    throttleTimer
};
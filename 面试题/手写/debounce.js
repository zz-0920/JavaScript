/**
 * 防抖函数 - 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * 应用场景：搜索框输入、按钮防重复点击、窗口resize等
 */

// 基础版本
function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
        // 每次触发事件时，清除之前的定时器
        if (timer) clearTimeout(timer);
        // 重新设置定时器，延迟执行函数
        timer = setTimeout(() => {
            fn.apply(this, args); // 确保 this 指向正确
            timer = null; // 执行后清空定时器
        }, delay);
    };
}

function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
            timer = null; // 执行后清空定时器
        }, delay);
    }
}

// 测试用例
console.log('=== 防抖函数测试 ===');

// 模拟搜索功能
function search(keyword) {
    console.log(`搜索: ${keyword}, 时间: ${new Date().toLocaleTimeString()}`);
}

const debouncedSearch = debounce(search, 500);

// 模拟快速输入
console.log('开始快速输入测试...');
debouncedSearch('a');
debouncedSearch('ab');
debouncedSearch('abc');
debouncedSearch('abcd');
// 只有最后一次会执行

// 立即执行版本测试
const immediateSearch = debounceAdvanced(search, 500, true);
console.log('\n立即执行版本测试...');
immediateSearch('立即执行1'); // 立即执行
immediateSearch('立即执行2'); // 被防抖
immediateSearch('立即执行3'); // 被防抖

// 实际应用示例
const inputElement = {
    addEventListener: function (event, handler) {
        console.log(`模拟监听 ${event} 事件`);
        // 模拟用户输入
        setTimeout(() => handler({ target: { value: 'user input' } }), 100);
        setTimeout(() => handler({ target: { value: 'user input 2' } }), 200);
        setTimeout(() => handler({ target: { value: 'user input final' } }), 300);
    }
};

// 搜索框防抖
const handleSearch = debounce(function (event) {
    console.log('执行搜索:', event.target.value);
}, 300);

inputElement.addEventListener('input', handleSearch);

// 按钮防重复点击
const handleSubmit = debounce(function () {
    console.log('提交表单');
}, 1000);

// 窗口resize防抖
const handleResize = debounce(function () {
    console.log('窗口大小改变，重新计算布局');
}, 250);

module.exports = { debounce, debounceAdvanced };
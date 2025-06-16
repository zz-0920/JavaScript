/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    // 边界情况：空函数数组返回恒等函数
    if (functions.length === 0) {
        return function(x) {
            return x;
        };
    }
    
    // 返回复合函数
    return function(x) {
        // 使用 reduceRight 从右到左依次应用函数
        return functions.reduceRight((acc, fn) => fn(acc), x);
    };
};

// 测试用例
const test1 = () => {
    const functions = [x => x + 1, x => x * x, x => 2 * x];
    const fn = compose(functions);
    console.log('测试1:', fn(4)); // 期望输出: 65
    // 执行过程: 2*4=8 -> 8*8=64 -> 64+1=65
};

const test2 = () => {
    const functions = [x => 10 * x, x => 10 * x, x => 10 * x];
    const fn = compose(functions);
    console.log('测试2:', fn(1)); // 期望输出: 1000
    // 执行过程: 10*1=10 -> 10*10=100 -> 10*100=1000
};

const test3 = () => {
    const functions = [];
    const fn = compose(functions);
    console.log('测试3:', fn(42)); // 期望输出: 42
    // 空函数数组，返回恒等函数
};

// 运行测试
test1();
test2();
test3();
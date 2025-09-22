/**
 * 符合大厂面试要求的 MyPromise 实现
 * 包含完整的 Promise A+ 规范核心特性
 */
class MyPromise {
    constructor(executor) {
        // 三种状态
        this.state = 'pending';
        this.value = undefined;
        this.reason = undefined;
        
        // 回调队列 - 处理异步情况
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];

        const resolve = (value) => {
            // 处理 resolve 一个 Promise 的情况（重要！）
            if (value instanceof MyPromise) {
                return value.then(resolve, reject);
            }
            
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                // 异步执行所有回调
                this.onFulfilledCallbacks.forEach(callback => callback());
            }
        };

        const reject = (reason) => {
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                this.onRejectedCallbacks.forEach(callback => callback());
            }
        };

        try {
            executor(resolve, reject);
        } catch (error) {
            reject(error);
        }
    }

    then(onFulfilled, onRejected) {
        // 参数可选处理 - Promise A+ 规范要求
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        // 返回新的 Promise 实现链式调用
        const promise2 = new MyPromise((resolve, reject) => {
            
            if (this.state === 'fulfilled') {
                // 异步执行 - 重要！确保在下一个事件循环执行
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        // 关键：处理返回值
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            if (this.state === 'rejected') {
                setTimeout(() => {
                    try {
                        const x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            if (this.state === 'pending') {
                this.onFulfilledCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });

                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onRejected(this.reason);
                            this.resolvePromise(promise2, x, resolve, reject);
                        } catch (error) {
                            reject(error);
                        }
                    }, 0);
                });
            }
        });

        return promise2;
    }

    /**
     * 核心方法：处理 then 返回值 - 大厂面试重点！
     * 这是 Promise A+ 规范的核心，面试官经常问这部分
     */
    resolvePromise(promise2, x, resolve, reject) {
        // 防止循环引用
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'));
        }

        // 防止多次调用
        let called = false;

        // 如果 x 是 Promise 实例
        if (x instanceof MyPromise) {
            if (x.state === 'pending') {
                x.then(value => {
                    this.resolvePromise(promise2, value, resolve, reject);
                }, reject);
            } else {
                x.then(resolve, reject);
            }
            return;
        }

        // 如果 x 是对象或函数（可能是 thenable）
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                const then = x.then;
                if (typeof then === 'function') {
                    // x 是 thenable 对象
                    then.call(x, 
                        value => {
                            if (called) return;
                            called = true;
                            this.resolvePromise(promise2, value, resolve, reject);
                        },
                        reason => {
                            if (called) return;
                            called = true;
                            reject(reason);
                        }
                    );
                } else {
                    // x 是普通对象
                    resolve(x);
                }
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // x 是基本类型
            resolve(x);
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected);
    }

    finally(onFinally) {
        return this.then(
            value => MyPromise.resolve(onFinally()).then(() => value),
            reason => MyPromise.resolve(onFinally()).then(() => { throw reason; })
        );
    }

    // 静态方法 - 大厂常考
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value;
        }
        return new MyPromise(resolve => resolve(value));
    }

    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }

    // Promise.all - 高频面试题
    static all(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'));
            }

            const results = [];
            let completedCount = 0;
            const total = promises.length;

            if (total === 0) {
                return resolve(results);
            }

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = value;
                        completedCount++;
                        if (completedCount === total) {
                            resolve(results);
                        }
                    },
                    reject
                );
            });
        });
    }

    // Promise.race - 高频面试题
    static race(promises) {
        return new MyPromise((resolve, reject) => {
            if (!Array.isArray(promises)) {
                return reject(new TypeError('Argument must be an array'));
            }

            promises.forEach(promise => {
                MyPromise.resolve(promise).then(resolve, reject);
            });
        });
    }

    // Promise.allSettled - 新增常考方法
    static allSettled(promises) {
        return new MyPromise(resolve => {
            if (!Array.isArray(promises)) {
                return resolve([]);
            }

            const results = [];
            let completedCount = 0;
            const total = promises.length;

            if (total === 0) {
                return resolve(results);
            }

            promises.forEach((promise, index) => {
                MyPromise.resolve(promise).then(
                    value => {
                        results[index] = { status: 'fulfilled', value };
                        completedCount++;
                        if (completedCount === total) {
                            resolve(results);
                        }
                    },
                    reason => {
                        results[index] = { status: 'rejected', reason };
                        completedCount++;
                        if (completedCount === total) {
                            resolve(results);
                        }
                    }
                );
            });
        });
    }
}

// 测试用例 - 展示给面试官看
console.log('=== MyPromise 测试 ===');

// 基本功能测试
const p1 = new MyPromise((resolve, reject) => {
    setTimeout(() => resolve('成功'), 100);
});

p1.then(value => {
    console.log('1. 基本then:', value);
    return '链式调用';
}).then(value => {
    console.log('2. 链式调用:', value);
}).catch(error => {
    console.log('错误:', error);
});

// Promise.all 测试
const p2 = MyPromise.resolve(1);
const p3 = MyPromise.resolve(2);
const p4 = new MyPromise(resolve => setTimeout(() => resolve(3), 50));

MyPromise.all([p2, p3, p4]).then(values => {
    console.log('3. Promise.all:', values); // [1, 2, 3]
});

// Promise.race 测试
MyPromise.race([
    new MyPromise(resolve => setTimeout(() => resolve('慢'), 100)),
    new MyPromise(resolve => setTimeout(() => resolve('快'), 50))
]).then(value => {
    console.log('4. Promise.race:', value); // '快'
});

module.exports = MyPromise;
/**
 * 自定义 Promise 类实现，遵循 Promise A+ 规范
 * 提供异步操作的处理机制，支持链式调用和异步流程控制
 */
class MyPromise {
    /**
     * 构造函数，初始化 Promise 实例
     * @param {Function} exector - 执行器函数，接收 resolve 和 reject 两个参数
     */
    constructor(exector) {
        // Promise 的三种状态：pending（等待中）、fulfilled（已成功）、rejected（已失败）
        this.state = 'pending';
        // 存储成功的值
        this.value = null;
        // 存储失败的原因
        this.reason = null;
        // 存储成功回调函数队列
        this.onResolvedCallbacks = [];
        // 存储失败回调函数队列
        this.onRejectedCallbacks = [];

        /**
         * 成功回调函数
         * @param {*} value - 成功的值
         */
        const resolve = (value) => {
            // 只有在 pending 状态才能转变为 fulfilled 状态
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                // 异步执行所有成功回调（使用 setTimeout 模拟微任务）
                this.onResolvedCallbacks.forEach(callback => setTimeout(callback, 0));
            }
        };

        /**
         * 失败回调函数
         * @param {*} reason - 失败的原因
         */
        const reject = (reason) => {
            // 只有在 pending 状态才能转变为 rejected 状态
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                // 异步执行所有失败回调（使用 setTimeout 模拟微任务）
                this.onRejectedCallbacks.forEach(callback => setTimeout(callback, 0));
            }
        };

        // 执行执行器函数，捕获可能的错误
        try {
            exector(resolve, reject);
        } catch (error) {
            // 如果执行器出错，直接 reject
            reject(error);
        }
    }

    /**
     * .then 方法，处理 Promise 的结果
     * @param {Function} onFulfilled - 成功时的回调函数
     * @param {Function} onRejected - 失败时的回调函数
     * @returns {MyPromise} - 返回新的 Promise 实例，支持链式调用
     */
    then(onFulfilled, onRejected) {
        // 处理非函数参数的情况
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        // 创建新的 Promise 实例，用于链式调用
        const promise2 = new MyPromise((resolve, reject) => {
            // 如果当前 Promise 已经是成功状态
            if (this.state === 'fulfilled') {
                // 异步执行成功回调
                setTimeout(() => {
                    try {
                        // 执行成功回调，获取返回值
                        const x = onFulfilled(this.value);
                        // 解析返回值，处理链式调用
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        // 捕获回调中的错误
                        reject(error);
                    }
                }, 0);
            }

            // 如果当前 Promise 已经是失败状态
            if (this.state === 'rejected') {
                // 异步执行失败回调
                setTimeout(() => {
                    try {
                        // 执行失败回调，获取返回值
                        const x = onRejected(this.reason);
                        // 解析返回值，处理链式调用
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        // 捕获回调中的错误
                        reject(error);
                    }
                }, 0);
            }

            // 如果当前 Promise 还是等待状态
            if (this.state === 'pending') {
                // 将成功回调添加到队列
                this.onResolvedCallbacks.push(() => {
                    try {
                        const x = onFulfilled(this.value);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });

                // 将失败回调添加到队列
                this.onRejectedCallbacks.push(() => {
                    try {
                        const x = onRejected(this.reason);
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                });
            }
        });

        return promise2;
    }

    /**
     * .catch 方法，处理 Promise 的错误
     * @param {Function} onRejected - 失败时的回调函数
     * @returns {MyPromise} - 返回新的 Promise 实例，支持链式调用
     */
    catch(onRejected) {
        // 本质上是 .then 方法的语法糖，只处理失败情况
        return this.then(null, onRejected);
    }

    /**
     * 解析 Promise 的返回值，处理链式调用
     * @param {MyPromise} promise2 - 新的 Promise 实例
     * @param {*} x - 上一个 then 方法的返回值
     * @param {Function} resolve - promise2 的 resolve 方法
     * @param {Function} reject - promise2 的 reject 方法
     */
    resolvePromise(promise2, x, resolve, reject) {
        // 防止循环引用（promise2 不能是 x 本身）
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'));
        }

        // 标记是否已经调用过回调，防止多次调用
        let called = false;

        // 处理 x 是对象或函数的情况
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                // 获取 x 的 then 方法
                const then = x.then;
                // 如果 x 有 then 方法，认为 x 是一个 Promise
                if (typeof then === 'function') {
                    // 调用 x 的 then 方法
                    then.call(
                        x,
                        // x 成功时的回调
                        value => {
                            if (called) return;
                            called = true;
                            // 递归解析 x 的成功值
                            this.resolvePromise(promise2, value, resolve, reject);
                        },
                        // x 失败时的回调
                        reason => {
                            if (called) return;
                            called = true;
                            // 传递 x 的失败原因
                            reject(reason);
                        }
                    );
                } else {
                    // x 不是 Promise，直接 resolve
                    resolve(x);
                }
            } catch (error) {
                // 捕获获取 then 方法或调用 then 方法时的错误
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // x 是基本类型，直接 resolve
            resolve(x);
        }
    }

    /**
     * 静态方法，创建一个已解决的 Promise
     * @param {*} value - 解决的值
     * @returns {MyPromise} - 返回一个已解决的 Promise 实例
     */
    static resolve(value) {
        return new MyPromise(resolve => resolve(value));
    }

    /**
     * 静态方法，创建一个已拒绝的 Promise
     * @param {*} reason - 拒绝的原因
     * @returns {MyPromise} - 返回一个已拒绝的 Promise 实例
     */
    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }
}
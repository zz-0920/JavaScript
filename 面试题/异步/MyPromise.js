class MyPromise {
    constructor(exector) {
        // 初始化状态
        this.state = 'pending';
        // 存储成功的值
        this.value = null;
        // 存储失败的原因
        this.reason = null;
        // 存储成功回调函数队列
        this.onResolvedCallbacks = [];
        // 存储失败回调函数队列
        this.onRejectedCallbacks = [];

        // resolve 函数实现
        const resolve = (value) => {
            // 只有在 pending 状态才能转变为 fulfilled 状态
            if (this.state === 'pending') {
                this.state = 'fulfilled';
                this.value = value;
                // 执行所有成功回调
                this.onResolvedCallbacks.forEach(callback => callback());
            }
        };

        // reject 函数实现
        const reject = (reason) => {
            // 只有在 pending 状态才能转变为 rejected 状态
            if (this.state === 'pending') {
                this.state = 'rejected';
                this.reason = reason;
                // 执行所有失败回调
                this.onRejectedCallbacks.forEach(callback => callback());
            }
        };

        // 执行 executor 函数
        try {
            exector(resolve, reject);
        } catch (error) {
            // 捕获执行过程中的错误
            reject(error);
        }
    }

    // then 方法实现
    then(onFulfilled, onRejected) {
        // 处理参数可能不是函数的情况
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason; };

        // 创建新的 Promise 以支持链式调用
        const promise2 = new MyPromise((resolve, reject) => {
            // 成功状态的处理
            if (this.state === 'fulfilled') {
                // 使用 setTimeout 模拟异步微任务
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value);
                        // 处理返回值，实现链式调用
                        this.resolvePromise(promise2, x, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            }

            // 失败状态的处理
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

            // 等待状态的处理
            if (this.state === 'pending') {
                // 将回调函数存储起来
                this.onResolvedCallbacks.push(() => {
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

    // catch 方法实现
    catch(onRejected) {
        return this.then(null, onRejected);
    }

    // 处理 Promise 解析过程
    resolvePromise(promise2, x, resolve, reject) {
        // 防止循环引用
        if (promise2 === x) {
            return reject(new TypeError('Chaining cycle detected for promise'));
        }

        // 标记是否已经调用过回调
        let called = false;

        // 处理 x 是对象或函数的情况
        if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
            try {
                const then = x.then;
                // 如果 x 有 then 方法，则认为 x 是一个 Promise
                if (typeof then === 'function') {
                    then.call(
                        x,
                        value => {
                            if (called) return;
                            called = true;
                            // 递归解析
                            this.resolvePromise(promise2, value, resolve, reject);
                        },
                        reason => {
                            if (called) return;
                            called = true;
                            reject(reason);
                        }
                    );
                } else {
                    // 否则将 x 作为成功值
                    resolve(x);
                }
            } catch (error) {
                if (called) return;
                called = true;
                reject(error);
            }
        } else {
            // 处理 x 是基本类型的情况
            resolve(x);
        }
    }

    // 静态 resolve 方法
    static resolve(value) {
        return new MyPromise(resolve => resolve(value));
    }

    // 静态 reject 方法
    static reject(reason) {
        return new MyPromise((_, reject) => reject(reason));
    }
}
function ajax(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}

class Limit {
    constructor(max = 2) {
        this.max = max; // 最大并发数
        this.list = []; // 任务队列
        this.count = 0; // 当前并发数
    }
    add(task) {
        return new Promise((resolve, reject) => {
            this.list.push({
                task,
                resolve,
                reject
            })
            this.run()
        })
    }
    run() {
        while (this.list.length && this.count < this.max) {
            const task = this.list.shift()
            this.count++
            task.task().then(task.resolve).catch(task.reject).finally(() => {
                this.count--
                this.run()
            })
        }
    }
}

const limit = new Limit(2)
// limit.add(() => {
//     return ajax(10000)
// })
// limit.add(() => {
//     return ajax(8000)
// })
// limit.add(() => {
//     return ajax(1000)
// })
// limit.add(() => {
//     return ajax(4000)
// })
// limit.add(() => {
//     return ajax(5000)
// })
// limit.add(() => {
//     return ajax(7000)
// })
function addTask(time, name) {
    limit.add(() => ajax(time))
    .then(() => {
        console.log(name, '完成')
    })
    .catch(() => {
        console.log(name, '失败')
    })
}

addTask(10000, 'a')
addTask(8000, 'b')
addTask(1000, 'c')
addTask(4000, 'd')
addTask(5000, 'e')
addTask(7000, 'f')
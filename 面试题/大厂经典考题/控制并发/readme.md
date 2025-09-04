# 并发控制机制

## 设计目标
创建一个可控制并发数量的任务执行器，支持异步任务的批量执行和流量控制。

## 核心功能

### 1. 构造函数
- `constructor(concurrency: number)` - 初始化并发控制器，指定最大并发数

### 2. 任务添加
- `add(task: () => Promise<T>): Promise<T>` - 添加异步任务，返回Promise
  - 将任务加入等待队列
  - 如果当前运行任务数小于最大并发数，立即执行
  - 返回一个Promise，在任务完成后resolve/reject

### 3. 任务执行
- `run(): void` - 启动任务执行（可选，可在add时自动触发）
  - 从等待队列中取出任务执行
  - 控制同时运行的任务数量不超过最大并发数
  - 任务完成后自动执行下一个任务

### 4. 状态管理
- `get runningCount(): number` - 获取当前运行中的任务数量
- `get waitingCount(): number` - 获取等待执行的任务数量
- `get isFinished(): boolean` - 检查所有任务是否完成

### 5. 高级功能（可选）
- `pause(): void` - 暂停任务执行
- `resume(): void` - 恢复任务执行
- `clear(): void` - 清空等待队列
- `setConcurrency(n: number): void` - 动态调整并发数

## 实现要点

1. **任务队列**：使用数组存储待执行的任务
2. **并发控制**：使用计数器跟踪当前运行任务数
3. **Promise管理**：为每个任务创建并管理对应的Promise
4. **自动执行**：任务完成后自动触发下一个任务的执行
5. **错误处理**：任务失败时不应影响其他任务的执行

## 示例代码结构

```javascript
class ConcurrencyController {
  constructor(concurrency) {
    this.concurrency = concurrency;
    this.running = 0;
    this.queue = [];
  }

  add(task) {
    return new Promise((resolve, reject) => {
      this.queue.push({ task, resolve, reject });
      this._run();
    });
  }

  _run() {
    while (this.running < this.concurrency && this.queue.length) {
      const { task, resolve, reject } = this.queue.shift();
      this.running++;
      
      task()
        .then(resolve)
        .catch(reject)
        .finally(() => {
          this.running--;
          this._run(); // 执行下一个任务
        });
    }
  }
}
```

## 使用示例
```javascript
const controller = new ConcurrencyController(3);

// 添加多个任务
const results = await Promise.all([
  controller.add(() => fetch('/api/1')),
  controller.add(() => fetch('/api/2')),
  controller.add(() => fetch('/api/3')),
  // 更多任务...
]);
```
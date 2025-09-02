# 回调函数与回调地狱
- **回调函数**：一种作为参数传递给其他函数的函数，会在特定事件发生或异步操作完成后被调用
- **回调地狱**：在异步编程中，多个回调函数嵌套使用导致代码结构混乱、难以维护的现象

回调地狱的主要问题：
1. 代码可读性差，嵌套层级过深形成"金字塔"结构
2. 错误处理困难，需在每个回调中单独处理错误
3. 无法使用传统try-catch捕获异步回调中的错误
4. 代码耦合度高，修改一处可能影响多层嵌套的代码

# Promise
- **状态**
  - pending：初始状态，既未成功也未失败
  - fulfilled：操作成功完成的状态
  - rejected：操作失败的状态
  - 注意：状态一旦改变（从pending变为fulfilled或rejected），就会永久保持该状态，不会再发生变化

- **常用方法**
  - then：处理Promise成功状态的回调，可接受两个参数（成功回调、失败回调）
  - catch：专门处理Promise失败状态的回调，等同于then(null, rejection)
  - finally：无论Promise最后状态如何，都会执行的回调函数，不接收任何参数

- **核心原理**
  - Promise是一个用于处理异步操作的对象（ES6中以类的形式实现）
  - 状态转换规则：只能从pending转变为fulfilled或从pending转变为rejected，且一旦转变不可逆
  - then方法的链式调用：
    - then方法返回一个新的Promise对象，因此可以链式调用
    - 如果then方法中返回的是普通值，新Promise会变为fulfilled状态，并将该值传递给下一个then
    - 如果then方法中返回的是Promise对象，新Promise的状态由返回的Promise决定
    - 如果then方法中抛出异常，新Promise会变为rejected状态，并将异常信息传递给下一个catch
  - 多个then调用：一个Promise对象可以注册多个then方法，它们会按注册顺序依次执行

# race
- 多个 Promise 对象并行执行，进行"赛跑"，哪个 Promise 先完成（无论是成功还是失败），就返回哪个 Promise 的结果
- race 方法返回一个新的 Promise 对象
- 第一个完成的 Promise 如果是 fulfilled 状态，race 返回的 Promise 就变为 fulfilled 状态，并传递该 Promise 的值
- 第一个完成的 Promise 如果是 rejected 状态，race 返回的 Promise 就变为 rejected 状态，并传递该 Promise 的拒绝原因
- 一旦有一个 Promise 完成（无论成功或失败），其他 Promise 的结果将被忽略，即使它们已经开始执行

# all
- 多个 Promise 对象并行执行，等待所有 Promise 对象完成
- all 方法返回一个新的 Promise 对象
- 如果所有 Promise 对象的状态都变为 fulfilled，那么 all 方法返回的 Promise 状态变为 fulfilled，并返回一个包含所有 Promise 结果的数组（顺序与传入的 Promise 数组顺序一致）
- 如果任何一个 Promise 对象的状态变为 rejected，那么 all 方法返回的 Promise 状态会立即变为 rejected，并传递第一个被拒绝的原因
- Promise.all 具有"快速失败"特性：只要有一个 Promise 失败，就会立即停止等待并返回失败

# any
- 多个 Promise 对象并行执行，等待任意一个 Promise 对象变为 fulfilled 状态
- any 方法返回的 Promise 对象的状态由第一个变为 fulfilled 的 Promise 对象决定
- 如果任意一个 Promise 对象的状态是 fulfilled，那么 any 方法返回的 Promise 对象的状态就会变为 fulfilled
- 只有当所有 Promise 对象的状态都是 rejected 时，any 方法返回的 Promise 对象的状态才会变为 rejected
- 一旦有一个 Promise 变为 fulfilled，其他 Promise 的结果将被忽略

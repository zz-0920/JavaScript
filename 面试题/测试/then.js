// 复杂的状态传播示例
Promise.resolve('开始')
  .then(value => {
    console.log('第1个then:', value); // "第1个then: 开始"
    return 'step1'; // 返回普通值 → 下一个then为fulfilled
  })
  .then(value => {
    console.log('第2个then:', value); // "第2个then: step1"
    return Promise.resolve('step2'); // 返回fulfilled的Promise
  })
  .then(value => {
    console.log('第3个then:', value); // "第3个then: step2"
    throw new Error('故意出错'); // 抛出异常 → 下一个then为rejected
  })
  .then(
    value => console.log('第4个then成功:', value), // 不执行
    error => {
      console.log('第4个then失败:', error.message); // "第4个then失败: 故意出错"
      return '恢复正常'; // 错误处理后返回普通值 → 下一个then为fulfilled
    }
  )
  .then(value => {
    console.log('第5个then:', value); // "第5个then: 恢复正常"
  });
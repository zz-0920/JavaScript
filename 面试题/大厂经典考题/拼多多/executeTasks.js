// 拼多多面试题：包含重试的串行执行异步任务

/**
 * @param {Function[]} tasks 异步任务函数数组
 * @param {number} retries 最大重试次数
 * @return {Promise<any[]>} promise 返回值为所有任务结果的数组
 */
function executeTasks(tasks = [], retries = 0) {
  return new Promise(async (resolve, reject) => {
    const results = [];
    
    try {
      // 串行执行每个任务
      for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        let lastError = null;
        let success = false;
        
        // 执行任务，包含重试逻辑
        for (let attempt = 0; attempt <= retries; attempt++) {
          try {
            const result = await task();
            results.push(result);
            success = true;
            break; // 任务成功，跳出重试循环
          } catch (error) {
            lastError = error;
            
            // 如果还有重试机会，继续重试
            if (attempt < retries) {
              console.log(`Task ${i} failed on attempt ${attempt + 1}, retrying...`);
              continue;
            }
          }
        }
        
        // 如果所有重试都失败了，抛出最后一次的错误
        if (!success) {
          throw lastError;
        }
      }
      
      // 所有任务都成功完成
      resolve(results);
    } catch (error) {
      // 有任务最终失败，抛出错误
      reject(error);
    }
  });
}

// 更简洁的 async/await 实现版本
function executeTasksAsync(tasks = [], retries = 0) {
  return new Promise(async (resolve, reject) => {
    const results = [];
    
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      let lastError = null;
      
      // 尝试执行任务（包括重试）
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const result = await task();
          results.push(result);
          lastError = null; // 成功则清除错误
          break;
        } catch (error) {
          lastError = error;
          if (attempt < retries) {
            console.log(`Task ${i} failed on attempt ${attempt + 1}/${retries + 1}, retrying...`);
          }
        }
      }
      
      // 如果最后仍有错误，说明重试后仍失败
      if (lastError) {
        return reject(lastError);
      }
    }
    
    resolve(results);
  });
}

// 测试代码
const makeTask = (index, successRate = 0.5) => {
  return () => {
    return new Promise((resolve, reject) => {
      return setTimeout(() => {
        return Math.random() < successRate 
          ? resolve(`task ${index} success`) 
          : reject(new Error(`task ${index} failed`));
      }, 100);
    });
  };
};

// 创建测试任务
const tasks = [
  makeTask(0, 0.3), // 30% 成功率
  makeTask(1, 0.4), // 40% 成功率
  makeTask(2, 0.6), // 60% 成功率
];

// 测试函数
async function runTests() {
  console.log('=== 串行异步任务执行测试 ===\n');
  
  // 测试1：无重试
  console.log('测试1：无重试执行');
  try {
    const result1 = await executeTasks(tasks, 0);
    console.log('✅ 成功:', result1);
  } catch (error) {
    console.log('❌ 失败:', error.message);
  }
  
  console.log('\n---\n');
  
  // 测试2：最多重试2次
  console.log('测试2：最多重试2次');
  try {
    const result2 = await executeTasks(tasks, 2);
    console.log('✅ 成功:', result2);
  } catch (error) {
    console.log('❌ 失败:', error.message);
  }
  
  console.log('\n---\n');
  
  // 测试3：使用简化版本，最多重试3次
  console.log('测试3：简化版本，最多重试3次');
  try {
    const result3 = await executeTasksAsync(tasks, 3);
    console.log('✅ 成功:', result3);
  } catch (error) {
    console.log('❌ 失败:', error.message);
  }
  
  console.log('\n---\n');
  
  // 测试4：必定成功的任务
  console.log('测试4：必定成功的任务');
  const successTasks = [
    makeTask(0, 1), // 100% 成功率
    makeTask(1, 1), // 100% 成功率
    makeTask(2, 1), // 100% 成功率
  ];
  
  try {
    const result4 = await executeTasks(successTasks, 1);
    console.log('✅ 成功:', result4);
  } catch (error) {
    console.log('❌ 失败:', error.message);
  }
}

// 运行测试
if (typeof window === 'undefined') {
  // Node.js 环境
  runTests().then(() => {
    console.log('\n测试完成');
  });
}

// 导出函数（支持 Node.js 和浏览器环境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    executeTasks, 
    executeTasksAsync, 
    makeTask, 
    runTests 
  };
} else if (typeof window !== 'undefined') {
  window.executeTasks = executeTasks;
  window.executeTasksAsync = executeTasksAsync;
  window.makeTask = makeTask;
  window.runTests = runTests;
}
// 拼多多面试题：搜索管理器实现

// 模拟搜索接口
async function searchGoods(keyword) {
  // 模拟接口调用
  await new Promise(resolve => setTimeout(resolve, 300));
  return [keyword + '商品1', keyword + '商品2'];
}

// 固定推荐热词
const hotKeys = ['iPhone', 'iPad', '华为', '小米'];

/**
 * 创建搜索处理器
 * @returns Function 搜索处理函数
 */
function createSearchManager() {
  let timer = null;
  let currentRequest = null;

  return function (keyword) {
    // 清除之前的定时器
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 如果输入为空，取消搜索并输出"重新搜索"
    if (!keyword || keyword.trim() === '') {
      if (currentRequest) {
        currentRequest = null;
      }
      console.log('重新搜索');
      return;
    }

    // 1. 立即匹配热词并输出
    const matchedHotKeys = hotKeys.filter(hotKey =>
      hotKey.toLowerCase().includes(keyword.toLowerCase())
    );

    if (matchedHotKeys.length > 0) {
      console.log(`猜你想搜：${matchedHotKeys.join(', ')}`);
    }

    // 2. 防抖处理：500ms后调用搜索接口
    timer = setTimeout(async () => {
      try {
        // 标记当前请求
        const requestId = Date.now();
        currentRequest = requestId;

        const results = await searchGoods(keyword);

        // 只有当前请求才输出结果（处理早发起的请求早返回的情况）
        if (currentRequest === requestId) {
          console.log('搜索结果:', results);
        }
      } catch (error) {
        console.error('搜索失败:', error);
      }
    }, 500);
  };
}

// 创建搜索管理器实例
const searchManager = createSearchManager();

// 使用示例
// searchManager('ip');     // 输出: 请你搜索：iPhone, iPad
// searchManager('华');     // 输出: 请你搜索：华为
// searchManager('');       // 输出: 重新搜索

// 导出函数（如果在模块环境中使用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createSearchManager, searchGoods, hotKeys };
}

// ES6模块导出（如果在ES6模块环境中使用）
if (typeof window === 'undefined') {
  // Node.js环境
} else {
  // 浏览器环境，将函数挂载到全局对象
  window.createSearchManager = createSearchManager;
  window.searchManager = searchManager;
}
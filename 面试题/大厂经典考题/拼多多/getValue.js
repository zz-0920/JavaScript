// 拼多多面试题：配置中心工具函数

// 精简配置数据（JSON 格式，不要修改）
const config = {
  api: {
    endpoints: { prod: 'https://api.prod.com' },
    timeout: 5000
  },
  features: {
    flags: ['feature_a', 'feature_b', 'feature_c'],
    settings: { 'enable-cache': true }
  },
  users: [] // 空数组，用于测试边界
};

/**
 * 读取配置值
 * @param {object} data - 配置对象（JSON）
 * @param {string} path - 访问路径
 * @param {any} defaultValue - 默认值
 * @returns {any} 配置值或默认值
 */
function getValue(data, path, defaultValue) {
  // 空路径返回默认值
  if (!path || path === '') {
    return defaultValue;
  }
  
  // 处理连续点号，将多个连续的点替换为单个点
  const normalizedPath = path.replace(/\.+/g, '.');
  
  // 分割路径，处理混合格式 a.b[0].c
  const segments = [];
  let current = '';
  let inBracket = false;
  
  for (let i = 0; i < normalizedPath.length; i++) {
    const char = normalizedPath[i];
    
    if (char === '[') {
      if (current) {
        segments.push(current);
        current = '';
      }
      inBracket = true;
    } else if (char === ']') {
      if (current) {
        segments.push(current);
        current = '';
      }
      inBracket = false;
    } else if (char === '.' && !inBracket) {
      if (current) {
        segments.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }
  
  if (current) {
    segments.push(current);
  }
  
  // 遍历路径段
  let result = data;
  
  for (const segment of segments) {
    // 检查当前结果是否为 null 或 undefined
    if (result === null || result === undefined) {
      return defaultValue;
    }
    
    // 处理数组索引（包括负索引）
    if (Array.isArray(result)) {
      const index = parseInt(segment, 10);
      
      // 检查是否为有效数字
      if (isNaN(index)) {
        return defaultValue;
      }
      
      // 处理负索引
      if (index < 0) {
        const actualIndex = result.length + index;
        if (actualIndex < 0 || actualIndex >= result.length) {
          return defaultValue;
        }
        result = result[actualIndex];
      } else {
        // 处理正索引
        if (index >= result.length) {
          return defaultValue;
        }
        result = result[index];
      }
    } else if (typeof result === 'object') {
      // 处理对象属性
      result = result[segment];
    } else {
      // 当前值不是对象或数组，无法继续访问
      return defaultValue;
    }
  }
  
  // 最终结果为 undefined 或 null 时返回默认值
  if (result === undefined || result === null) {
    return defaultValue;
  }
  
  return result;
}

// 测试用例
console.log('=== getValue 函数测试 ===');

// 基本对象属性访问
console.log('api.timeout:', getValue(config, 'api.timeout', 'N/A')); // 5000
console.log('api.endpoints.prod:', getValue(config, 'api.endpoints.prod', 'N/A')); // 'https://api.prod.com'

// 数组索引访问
console.log('features.flags.0:', getValue(config, 'features.flags.0', 'N/A')); // 'feature_a'
console.log('features.flags[1]:', getValue(config, 'features.flags[1]', 'N/A')); // 'feature_b'

// 负索引访问
console.log('features.flags[-1]:', getValue(config, 'features.flags[-1]', 'N/A')); // 'feature_c'
console.log('features.flags[-2]:', getValue(config, 'features.flags[-2]', 'N/A')); // 'feature_b'

// 混合路径
console.log('features.settings["enable-cache"]:', getValue(config, 'features.settings.enable-cache', 'N/A')); // true

// 边界情况测试
console.log('空路径:', getValue(config, '', 'DEFAULT')); // 'DEFAULT'
console.log('连续点号:', getValue(config, 'api..timeout', 'N/A')); // 5000
console.log('空数组负索引:', getValue(config, 'users[-1]', 'EMPTY')); // 'EMPTY'
console.log('不存在的路径:', getValue(config, 'nonexistent.path', 'NOT_FOUND')); // 'NOT_FOUND'
console.log('数组越界:', getValue(config, 'features.flags[10]', 'OUT_OF_BOUNDS')); // 'OUT_OF_BOUNDS'
console.log('null值处理:', getValue({a: null}, 'a.b', 'NULL_VALUE')); // 'NULL_VALUE'

// 导出函数（支持 Node.js 和浏览器环境）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { getValue, config };
} else if (typeof window !== 'undefined') {
  window.getValue = getValue;
  window.config = config;
}
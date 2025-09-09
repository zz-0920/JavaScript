function cacheApi(...args) {
  const fn = args[0]
  let map = {}

  return async (key) => { // 'a'
    if (map[key] && map[key].lock) { // 已经在请求中了
      // 上一次请求结束了
      if (map[key].data) {
        return map[key].data
      } else {
        // 上一次请求没有结束
        return map[key].promise
      }
    }

    if (!map[key]) {  // 初始化
      map[key] = {}
      map[key].lock = true
      map[key].data = null
      map[key].promise = fn(key)
    }

    if (map[key].data) {
      // 直接输出缓存值
      map[key].lock = true
      map[key].promise = fn(key)
      map[key].promise.then(res => { // 下一次的异步请求
        map[key].data = res
        map[key].lock = false
      })
      
      return map[key].data

    } else {
      // 第次一被请求
      const res = await map[key].promise
      map[key].data = res
      map[key].lock = false
      return res
    }

  }
}

const ajax = (() => {
  let id = 0
  return async (req) => {
    await new Promise((r) => setTimeout(r, 1000))
    return {
      req,
      id: id++
    }
  }
})();

const cache_Api = cacheApi(ajax);

(async () => {
  console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
  // 一秒后输出 [{req: 'a', id: 0}, {req: 'b', id: 1}, {req: 'a', id: 0}]

  console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
  // // 立即输出 [{req: 'a', id: 0}, {req: 'b', id: 1}, {req: 'a', id: 0}]

  await new Promise((r) => setTimeout(r, 1000))
  console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
  // // 立即输出 [{req: 'a', id: 2}, {req: 'b', id: 3}, {req: 'a', id: 2}]
})()
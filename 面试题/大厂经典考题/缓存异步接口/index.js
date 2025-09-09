function cacheApi(...args) {
    const cache = new Map()
    const pendingRequests = new Map() // 存储正在进行的请求
    const cacheTimestamps = new Map() // 存储缓存时间戳
    const api = args[0]
    const cacheTimeout = 1000 // 缓存超时时间1秒
    
    return async (req) => {
        const now = Date.now()
        
        // 检查缓存是否过期
        if (cache.has(req) && cacheTimestamps.has(req)) {
            const cacheTime = cacheTimestamps.get(req)
            if (now - cacheTime < cacheTimeout) {
                return cache.get(req)
            } else {
                // 缓存过期，清除
                cache.delete(req)
                cacheTimestamps.delete(req)
            }
        }

        // 如果该请求正在进行中，等待其完成
        if (pendingRequests.has(req)) {
            return await pendingRequests.get(req)
        }

        // 创建新的请求Promise并缓存
        const requestPromise = api(req).then(res => {
            cache.set(req, res)
            cacheTimestamps.set(req, Date.now())
            pendingRequests.delete(req)
            return res
        }).catch(err => {
            pendingRequests.delete(req)
            throw err
        })

        pendingRequests.set(req, requestPromise)
        return await requestPromise
    }
}

const ajax = (() => {
    let id = 0
    return async (req) => {
        await new Promise((r) => {
            setTimeout(r, 1000)
        })
        return {
            req,
            id: id++
        }
    }
})();

const cache_Api = cacheApi(ajax);

(async () => {
    console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
    // 一秒后输出[{req:'a',id:0},{req:'b',id:1},{req:'a',id:0}]

    console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
    // 立即输出[{req:'a',id:0},{req:'b',id:1},{req:'a',id:0}]

    await new Promise((r) => setTimeout(r, 1000))
    console.log(await Promise.all([cache_Api('a'), cache_Api('b'), cache_Api('a')]));
    // 立即输出[{req:'a',id:2},{req:'b',id:3},{req:'a',id:2}]

})();
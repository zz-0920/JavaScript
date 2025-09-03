function co(generatorFunction) {
    // 创建生成器对象
    const generator = generatorFunction()
    
    // 定义递归函数用于自动推进生成器执行
    function next(data) {
        // 获取当前迭代结果
        const result = generator.next(data)
        
        // 如果迭代完成，返回最终结果
        if (result.done) {
            return result.value
        }
        
        // 假设yield的是Promise，等待其解决后继续执行
        result.value.then(data => {
            next(data)
        })
    }
    
    // 启动生成器执行
    next()
}
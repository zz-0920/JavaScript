import { useSyncExternalStore } from 'react'

/**
 * 创建状态存储器
 * @param {Function} createState - 创建初始状态的函数
 * @returns {Object} 包含 setState, getState, subscribe, destroy 方法的API对象
 */
const createStore = (createState) => {
    let state // 存储当前状态
    const listeners = new Set() // 存储所有订阅者的集合

    /**
     * 更新状态的函数
     * @param {Function|Object} partial - 新状态或状态更新函数
     * @param {boolean} replace - 是否完全替换状态（而不是合并）
     */
    const setState = (partial, replace) => {
        // 支持函数式更新和直接对象更新
        const nextState = typeof partial === 'function' ? partial(state) : partial
        
        // 只有状态真正改变时才更新
        if (!Object.is(nextState, state)) {
            const previousState = state
            // 根据replace参数决定是替换还是合并状态
            state = (replace ?? (typeof nextState !== 'object' || nextState === null))
                ? nextState // 完全替换
                : Object.assign({}, state, nextState) // 浅合并
            
            // 通知所有订阅者状态已更新
            listeners.forEach((listener) => listener(state, previousState))
        }
    }

    /**
     * 获取当前状态
     * @returns {any} 当前状态
     */
    const getState = () => state

    /**
     * 订阅状态变化
     * @param {Function} listener - 状态变化时的回调函数
     * @returns {Function} 取消订阅的函数
     */
    const subscribe = (listener) => {
        listeners.add(listener) // 添加订阅者
        // 返回取消订阅函数
        return () => listeners.delete(listener)
    }

    /**
     * 销毁存储器，清除所有订阅者
     */
    const destroy = () => {
        listeners.clear()
    }

    // 创建API对象，包含所有对外暴露的方法
    const api = { setState, getState, subscribe, destroy }

    // 初始化状态 - 调用用户提供的createState函数
    state = createState(setState, getState, api)

    return api
}

/**
 * 创建React Hook版本的状态管理器
 * @param {Function} createState - 创建初始状态的函数
 * @returns {Function} React Hook函数
 */
const create = (createState) => {
    // 创建底层状态存储器
    const api = createStore(createState)

    /**
     * React Hook函数 - 用于在组件中使用状态
     * @param {Function} selector - 状态选择器函数（可选）
     * @param {Function} equalityFn - 相等性比较函数（可选，暂未实现）
     * @returns {any} 选中的状态切片或完整状态
     */
    const useBoundStore = (selector, equalityFn) => {
        // 使用React 18的useSyncExternalStore来同步外部状态
        const slice = useSyncExternalStore(
            api.subscribe, // 订阅函数
            () => selector ? selector(api.getState()) : api.getState(), // 获取客户端状态
            () => selector ? selector(api.getState()) : api.getState()  // 获取服务端状态（SSR）
        )
        return slice
    }

    // 将底层API方法绑定到hook上，方便外部直接调用
    // 这样可以通过 useStore.setState() 的方式直接调用
    Object.assign(useBoundStore, api)

    return useBoundStore
}

// 导出create函数
export { create }
export default create

/**
 * 使用示例：
 * 
 * const useCountStore = create((set) => ({
 *   count: 0,
 *   increment: () => set((state) => ({ count: state.count + 1 })),
 *   decrement: () => set((state) => ({ count: state.count - 1 })),
 * }))
 * 
 * // 在组件中使用
 * function Counter() {
 *   const { count, increment, decrement } = useCountStore()
 *   return (
 *     <div>
 *       <span>{count}</span>
 *       <button onClick={increment}>+</button>
 *       <button onClick={decrement}>-</button>
 *     </div>
 *   )
 * }
 * 
 * // 在组件外部使用
 * useCountStore.getState() // 获取当前状态
 * useCountStore.setState({ count: 10 }) // 直接设置状态
 */
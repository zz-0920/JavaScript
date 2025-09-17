import { create } from 'zustand'

function logMiddleware(func) {
    return function (set, get, store) {
        function newSet(...args) {
            console.log('调用了set,新的state:', get())
            return set(...args)
        }
        return func(newSet, get, store)
    }
}

const useListStore = create((set) => ({
    list: ['html', 'css', 'js'],

    addData: (data) => {
        set((state) => ({ // 使用 Zustand 的 set 函数更新状态，自动触发订阅组件重新渲染
            list: [...state.list, data]
        }))
    }
}))

const useTestStore = create(logMiddleware((newSet) => ({
    count: 0,
    upDateCount: (value) => {
        newSet(() => ({
            count: value
        }))
    }
})))

export default useListStore
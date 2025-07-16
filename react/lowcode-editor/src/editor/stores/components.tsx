import { create } from 'zustand'

export const useComponentsStore = create((set) => ({
    // 组件列表
    mode: 'edit',
    // 方法
    setMode: (mode: string) => {
        return set(() => ({ mode: mode }))
    },
}))

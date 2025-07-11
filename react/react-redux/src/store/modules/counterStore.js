import { createSlice } from '@reduxjs/toolkit'
// 仓库中的一个子模块
const counter = createSlice({
    name: 'counter', // 子模块的名称
    initialState: { // 子模块的初始值
        count: 0,
        list: ['HTML', 'CSS', 'JavaScript']
    },
    reducers: { // 修改数据的同步方法
        add(state) {
            state.count++
        },
        addList(state, action) {
            console.log(action)
            if (action.payload) {
                state.list.push(action.payload)
            } else {
                return alert("请输入内容")
            }
        }
    }
})

const { add, addList } = counter.actions // 导出修改数据的同步方法
export { add, addList }

const counterReducer = counter.reducer // 导出子模块的reducer
export { counterReducer }

// 总仓库
import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './modules/counterStore'
import { todoListReducer } from './modules/todoListStore'

export default configureStore({
    reducer: {  // 注册子模块
        counter: counterReducer,
        todoList: todoListReducer
    }
})
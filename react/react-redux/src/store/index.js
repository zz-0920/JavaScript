// 总仓库
import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './modules/counterStore'
import todoListReducer from './modules/todoListStore'  // 改为默认导入

export default configureStore({
    reducer: {  // 注册子模块
        counter: counterReducer,
        todoList: todoListReducer
    }
})
// 创建总仓库
import { configureStore } from "@reduxjs/toolkit";
import questionalReducer from './modules/questional'

export const store = configureStore({
  reducer: { // 注册子模块
    questional: questionalReducer,
  }
})

// 获取整个仓库的状态类型
export type RootState = ReturnType<typeof store.getState>

export interface Answer{
  answer_name: string
  is_standard_answer: number
  topic_answer_id: number
  topic_id: number
}
export interface Ques {
  topic_name?: string
  topic_answer: Answer[]
}
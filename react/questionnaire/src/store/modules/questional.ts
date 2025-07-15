import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// 创建子模块
const questional = createSlice({
  name: 'questional',
  initialState: {
    questions: [],
    answersId: [] as number[],
    score: 0
  },
  reducers: {
    setQuestions(state, action) {
      state.questions = action.payload
    },
    setAnswersId(state, action: PayloadAction<number>) {
      state.answersId.push(action.payload)
    },
    setScore(state) {
      let correctCount = 0;
      state.answersId.forEach((item) => {
        if (item === 1) {
          correctCount++
        }
      })
      state.score = Math.round((correctCount / state.questions.length) * 100);
    },
    // 添加重置功能
    resetScore(state) {
      state.score = 0;
      state.answersId = [];
    }
  }
})

export const { setQuestions, setAnswersId, setScore, resetScore } = questional.actions

export default questional.reducer

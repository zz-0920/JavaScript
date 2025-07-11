import { createSlice } from '@reduxjs/toolkit'

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        todoList: [
            {id: 1, title: '学习react', completed: false},
            {id: 2, title: '学习vue', completed: true},
            {id: 3, title: '学习node', completed: false}
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            state.todoList.push(action.payload)
        }
    }
})

export default todoListSlice.reducer

export const {addTodo} = todoListSlice.actions
import { createSlice } from '@reduxjs/toolkit'

const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        todoList: [
            { id: 1, title: '学习react', completed: false },
            { id: 2, title: '学习vue', completed: true },
            { id: 3, title: '学习node', completed: false }
        ]
    },
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload,
                completed: false
            }
            state.todoList.push(newTodo)
        },

        toggleTodo: (state, action) => {
            const todo = state.todoList.find(item => item.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },

        deleteTodo: (state, action) => {
            state.todoList = state.todoList.filter(item => item.id !== action.payload)
        },
        
        toggleAll: (state, action) => {
            const allCompleted = action.payload
            state.todoList.forEach(item => {
                item.completed = allCompleted
            })
        }
    }
})

const todoListReducer = todoListSlice.reducer
export { todoListReducer }

export const { addTodo, toggleTodo, deleteTodo, toggleAll } = todoListSlice.actions
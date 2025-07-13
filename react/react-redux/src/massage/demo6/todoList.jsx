import './todoList.css'
import { addTodo, toggleTodo, deleteTodo, toggleAll } from '../../store/modules/todoListStore'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'

function App() {
  const { todoList } = useSelector(state => state.todoList)
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const allCompleted = todoList.length > 0 && todoList.every(item => item.completed)
  
  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value.trim() === "") {
        return alert("请输入内容")
      }
      dispatch(addTodo(e.target.value))
      inputRef.current.value = ""
    }
  }

  const handleToggleAll = (e) => {
    const allCompleted = e.target.checked
    dispatch(toggleAll(allCompleted))
  }

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo(id))
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id))
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          ref={inputRef}
          onKeyDown={handleKeyDown}
        />
      </header>
      <section className="main">
        {todoList.length > 0 && (
          <>
            <input 
              id="toggle-all" 
              className="toggle-all" 
              type="checkbox" 
              checked={allCompleted}
              onChange={handleToggleAll}
            />
            <label htmlFor="toggle-all"></label>
          </>
        )}
        <ul className="todo-list">
          {todoList && todoList.map(item => (
            <li key={item.id} className={item.completed ? "todo completed" : "todo"}>
              <div className="view">
                <input 
                  className="toggle" 
                  type="checkbox" 
                  checked={item.completed}
                  onChange={() => handleToggleTodo(item.id)}
                />
                <label htmlFor={item.id}>{item.title}</label>
                <button className="destroy" onClick={() => {
                  handleDeleteTodo(item.id)
                }}></button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  )
}

export default App
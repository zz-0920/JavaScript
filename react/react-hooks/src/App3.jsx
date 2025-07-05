import { useState, useReducer } from "react"
import { produce } from 'immer'

function reducer(state, action) {
  switch(action.type) {
    case 'add':
      // return {
      //   result: state.result + action.num
      // }
      // state.result = state.result + action.num
      return produce(state, (state) => {
        state.a.b.c += action.num
      })
    case 'minus':
      return {
        result: state.result - action.num
      }
  }
}

function App() {
  // useReducer 接受的第二的参数作为 reducer 的第一个参数，
  // dispatch 接受的参数，作为reducer 的第二个参数
  const [res, dispatch] = useReducer(reducer, {result: 0, a: {b: {c: 1, d: {e: 2}}}})

  const [num, setNum] = useState({result: 0})

  return (
    <div>
      <h3>{res.a.b.c}</h3>
      <button onClick={() => dispatch({type: 'add', num: 2})}>+</button>
      <button onClick={() => dispatch({type: 'minus', num: 1})}>-</button>


      <h2>{num.result}</h2>
      <button onClick={() => setNum({result: num.result + 2})}>+</button>

    </div>
  )
}

export default App
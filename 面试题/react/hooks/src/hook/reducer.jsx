import { useReducer } from 'react'

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      const obj = {
        result: state.result + 5,
        suggest: state.result + 5 > 30 ? '短袖' : state.suggest
      }
      return obj
    case 'minus':
      const obj2 = {
        result: state.result - 5,
        suggest: state.result - 5 <= 20 ? '长袖' : state.suggest
      }
      return obj2
    default:
      return state
  }
}

export default function Reducer() {
  const [res, dispatch] = useReducer(reducer, { result: 20, suggest: '长袖' }) 

  return (
    <div>
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
      <button onClick={() => dispatch({ type: 'minus' })}>minus</button>
      <div>{ res.result }</div>
      <div>{ res.suggest }</div>
    </div>
  )
}

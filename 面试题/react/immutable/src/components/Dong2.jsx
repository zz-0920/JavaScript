import { useEffect, useState } from 'react'

export default function Dong2() {
  const [state, setState] = useState({
    a: {
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
    }
  })

  // const newState = state.set('a.b', 2)
  
  useEffect(() => {
    setTimeout(() => {
      // state.a.b = 2
      setState({
        a: {
          ...state.a,
          b: 2
        }
      })
    }, 2000)
  }, [])

  console.log('render2')

  return (
    <div>我是Dong2组件，{state.a.b}</div>
  )
}

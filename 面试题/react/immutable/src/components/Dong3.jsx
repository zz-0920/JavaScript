import { useEffect, useState } from 'react'
import { fromJS } from 'immutable'

// const immutableObj = fromJS({
//   a: {
//     b: 1
//   }
// })
// // const newObj = immutableObj.get('a').set('b', 2)
// const newObj = immutableObj.setIn(['a', 'b'], 2)
// console.log(newObj) // false


export default function Dong3() {

  const [state, setState] = useState(fromJS({
    a: {
      b: 1,
      c: 2,
      d: 3,
      e: 4,
      f: 5,
    }
  }))

  useEffect(() => {
    setTimeout(() => {
      // state.a.b = 11
      // setState(state)  // 如果一个 state中存在很多键值对，而我们只需要改其中一个，那么就麻烦了

      setState(state.setIn(['a', 'b'], 11))
    }, 2000)
  }, [])

  return (
    <div>我是Dong3组件，{state.getIn(['a', 'b'])}</div>
  )
}

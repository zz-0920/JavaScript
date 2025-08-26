import React, { useEffect, useState } from 'react'
import useMountedState from './hooks/useMountedState'

const Child = React.memo(function ({ isMounted }) {
  useEffect(() => {
    console.log('子组件挂载了')
  }, [])
  return (
    <div>
      <h2>Child</h2>
      { isMounted() ? 'mounted' : 'pending' }
    </div>
  )
})

export default function App() {
  const isMounted = useMountedState()
  const [num, setNum] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setNum(1)
    }, 2000)
  }, [])

  return (
    <div>
      {/* { isMounted() ? 'mounted' : 'pending' } */}
      <div>{num}</div>
      <Child isMounted={isMounted}></Child>
    </div>
  )
}

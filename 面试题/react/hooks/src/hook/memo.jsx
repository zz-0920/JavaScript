import { useState, useEffect, memo, useCallback, useMemo } from 'react'
import Child from './Child'

export default function Memo() {
  const [n, setN] = useState(0)
  const [count, setCount] = useState(2)

  useEffect(() => {
    setInterval(() => {
      setN(Math.random())
    }, 2000)
  }, [])

  const cb = useCallback(() => {
    
  }, [])

  const count2 = useMemo(() => {
    return count * 10
  }, [count])


  return (
    <div>
      <h1>{ n }</h1>
      <Child count={count2} callback={cb}/>
    </div>
  )
}

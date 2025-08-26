import { useEffect, useState, useRef, useLayoutEffect } from 'react'

function useInterval(fn, delay) {
  const callbackFn = useRef(fn)
  useLayoutEffect(() => {  // dom更新后执行
    callbackFn.current = fn
  })
  useEffect(() => {
    const timer = setInterval(() => {
      callbackFn.current()
    }, delay)
    return () => {
      clearInterval(timer)
    }
  }, [])

}

export default function Index() {
  const [count, setCount] = useState(0)
  const updateCount = () => {
    setCount(count + 1)
  }
  
  useInterval(updateCount, 1000)

  return (
    <div>{count}</div>
  )
}

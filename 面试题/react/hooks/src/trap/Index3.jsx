import { useEffect, useState } from 'react'

export default function Index() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count);
      setCount(count + 1)
    }, 1000)

    return () => {  // 组件卸载时执行
      clearInterval(timer)
    }
  }, [count])

  return (
    <div>{count}</div>
  )
}

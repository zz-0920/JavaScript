import { useEffect, useState } from 'react'

export default function Index() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // 引入了 count  ===>   let _count = count
    // 销毁 闭包保留引用的 _count
    // setInterval(() => {
    //   console.log(count);
    //   setCount(count + 1)  // 改的是全局的 count，并不是闭包保留的 _count
    // }, 1000)
    setInterval(() => {
      setCount((abc) => {
        return abc + 1
      })
    }, 1000)
  }, [])

  return (
    <div>{count}</div>
  )
}

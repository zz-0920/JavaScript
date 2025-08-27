import { useState } from "react"

export default function Home() {

  const [count, setCount] = useState(0)

  return (
    <div>
        <h1>{count}</h1>
        <button onClick={() => setCount(count + 1)}>增加</button>
    </div>
  )
}
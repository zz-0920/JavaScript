import { useEffect, useState } from 'react'

export default function Reducer() {
  const [temp, setTemp] = useState(20)
  const [suggest, setSuggest] = useState('长袖')

  const add = () => {
    setTemp(temp + 5)
  }

  useEffect(() => {
    if (temp > 30) {
      setSuggest('短袖')
    }
  }, [temp])
  

  return (
    <div>
      <button onClick={add}>add</button>
      <button>minus</button>
      <div>温度：{ temp }</div>
      <div>建议穿衣：{ suggest }</div>
    </div>
  )
}

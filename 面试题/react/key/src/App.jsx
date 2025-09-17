import React, { useEffect, useState } from 'react'

export default function App() {
  const [list, setList] = useState([
    { id: 1, name: '张三' },
    { id: 2, name: '李四' },
    { id: 3, name: '王五' },
  ])

  return (
    <div>
      <ul onClick={() => { setList([list[1], list[0], list[2]]) }}>
        {list.map((item, index) => <li key={item.id}>{item.name}</li>)}
      </ul>
    </div>
  )
}
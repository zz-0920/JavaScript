import './App.css'
import { useEffect, useState, useRef } from 'react'

const listData = Array(1000).fill(0).map((item, index) => {
  return { id: index, value: index }
})

export default function App() {
  const [startIndex, setStartIndex] = useState(0) // 起始索引
  const [endIndex, setEndIndex] = useState(0) // 结束索引
  const [startOffset, setStartOffset] = useState(0) // 展位容器的偏移距离
  const listRef = useRef(null)

  useEffect(() => {
    setEndIndex(startIndex + visibleCount + 1)
  }, [startIndex])

  // 总列表高度
  const listHeight = listData.length * 50
  // 可以展示的列表项数
  const visibleCount = Math.ceil(500 / 50)
  // 上方偏移量对应的 style
  const getTransform = {
    transform: `translateY(${startOffset}px)`,
  }
  // 截取数据用于展示
  const visibleData = listData.slice(startIndex, endIndex)

  const scrollEvent = () => {
    const scrollTop = listRef.current.scrollTop // 滚动距离
    const newStartIndex = Math.floor(scrollTop / 50) // 新的起始索引
    setStartIndex(newStartIndex)
    setStartOffset(scrollTop - (scrollTop % 50))
  }

  return (
    <div className='container' onScroll={scrollEvent} ref={listRef}>
      <div className="list-phantom" style={{ height: `${listHeight}px` }}>
      </div>
      <div className="list" style={getTransform}>
        <ul>
          {
            visibleData.map(item => {
              return <li key={item.id}>{item.value}</li>
            })
          }
        </ul>
      </div>
    </div>
  )
}

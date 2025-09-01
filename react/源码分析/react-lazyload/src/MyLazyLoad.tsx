import { useState, useRef, useEffect } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface MyLazyLoadProps {
  className?: string,
  style?: CSSProperties,
  placeholder?: ReactNode,
  offset?: number,
  width?: number,
  height?: number,
  onContentVisible?: () => void,
  children: ReactNode,
}

export default function MyLazyLoad(props: MyLazyLoadProps) {
  const { className = "", style, placeholder, offset = 0, width, height, onContentVisible, children } = props
  const [visible, setVisible] = useState(false)
  const elementObserver = useRef<IntersectionObserver>()
  const containerRef = useRef<HTMLDivElement>(null) 

  function lazyLoadHandler(entries: IntersectionObserverEntry[]) {
    const [entry] = entries
    const { isIntersecting } = entry
    if (isIntersecting) { // 在可视区域内
      setVisible(true)
      onContentVisible?.()

      const node = containerRef.current
      if (node) {
        elementObserver.current?.unobserve(node)
      }
    }

  }

  useEffect(() => {
    const options = {
      rootMargin: `${offset}px`,
      threshold: 0,
    }
    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options)
    const node = containerRef.current
    if (node) {
      elementObserver.current.observe(node)  // 观察上了
    }
  }, [])


  
  return (
    <div ref={containerRef} className={className} style={style}>
      { visible ? children : placeholder }
    </div>
  )
}

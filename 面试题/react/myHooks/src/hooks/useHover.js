import { useState, cloneElement } from 'react'

export const useHover = (element) => {
  const [state, setState] = useState(false)

  if (typeof element === 'function') {
    element = element(state)   // jsx
  }

  const onMouseEnter = (originalEvent) => {
    return () => {
      originalEvent()
      setState(true)
    }
  }
  const onMouseLeave = (originalEvent) => {
    return () => {
      originalEvent()
      setState(false)
    }
  }

  const el = cloneElement(element, {  // 克隆 dom 得到一个对象 并绑定事件
    // 克隆该dom 时将它身上的事件保留
    onMouseEnter: onMouseEnter(element.props.onMouseEnter),
    onMouseLeave: onMouseLeave(element.props.onMouseLeave),
  })

  return [el, state]
}
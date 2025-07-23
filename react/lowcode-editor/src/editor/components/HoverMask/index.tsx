import React, { useEffect, useState } from 'react'

interface HoverMaskProps {
  componentId?: number
  componentName?: string
  containerRef: React.RefObject<HTMLDivElement>
}

// HoverMask 会在鼠标移入组件时显示，并能完整覆盖整个组件
export default function HoverMask({ componentId, componentName, containerRef }: HoverMaskProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!componentId || !containerRef.current) {
      setVisible(false)
      return
    }

    // 查找目标组件元素
    const targetElement = containerRef.current.querySelector(`[data-component-id="${componentId}"]`) as HTMLElement
    if (!targetElement) {
      setVisible(false)
      return
    }

    // 获取容器和目标元素的位置信息
    const containerRect = containerRef.current.getBoundingClientRect()
    const targetRect = targetElement.getBoundingClientRect()

    // 计算相对于容器的位置
    setPosition({
      top: targetRect.top - containerRect.top,
      left: targetRect.left - containerRect.left,
      width: targetRect.width,
      height: targetRect.height
    })
    setVisible(true)
  }, [componentId, containerRef])

  if (!visible || !componentId) {
    return null
  }

  return (
    <div
      className="absolute pointer-events-none border-2 border-blue-500 bg-blue-100 bg-opacity-20 z-10"
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
        height: position.height,
      }}
    >
      <div className="absolute -top-6 left-0 bg-blue-500 text-white text-xs px-2 py-1 rounded">
        {componentName || (componentId ? `组件ID: ${componentId}` : '')}
      </div>
    </div>
  )
}

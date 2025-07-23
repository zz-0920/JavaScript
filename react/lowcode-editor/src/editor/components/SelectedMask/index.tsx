import React, { useEffect, useState, useCallback } from 'react'
import { useComponentsStore } from '../../stores/components'

interface SelectedMaskProps {
  componentId?: number
  containerRef: React.RefObject<HTMLDivElement>
  onDelete?: (componentId: number) => void
}

export default function SelectedMask({ componentId, containerRef, onDelete }: SelectedMaskProps) {
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const [visible, setVisible] = useState(false)
  const { deleteComponent, setCurComponentID } = useComponentsStore()

  // 更新蒙层位置的函数
  const updatePosition = useCallback(() => {
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

  useEffect(() => {
    updatePosition()
  }, [updatePosition])

  // 监听窗口大小变化
  useEffect(() => {
    if (!componentId) return

    const handleResize = () => {
      // 使用 requestAnimationFrame 确保在浏览器重绘后更新位置
      requestAnimationFrame(updatePosition)
    }

    // 添加窗口大小变化监听器
    window.addEventListener('resize', handleResize)
    
    // 也监听容器大小变化（如果支持 ResizeObserver）
    let resizeObserver: ResizeObserver | null = null
    if (containerRef.current && window.ResizeObserver) {
      resizeObserver = new ResizeObserver(handleResize)
      resizeObserver.observe(containerRef.current)
    }

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize)
      if (resizeObserver) {
        resizeObserver.disconnect()
      }
    }
  }, [componentId, updatePosition, containerRef])

  const handleDelete = () => {
    if (componentId) {
      // 先调用删除回调进行清理工作
      if (onDelete) {
        onDelete(componentId)
      }
      // 删除组件
      deleteComponent(componentId)
      // 删除后清除选中状态
      setCurComponentID(null)
    }
  }

  if (!visible || !componentId) {
    return null
  }

  return (
     <div
       className="absolute pointer-events-none border-2 border-blue-500 bg-blue-50 bg-opacity-20 z-20 shadow-lg backdrop-blur-sm"
       style={{
         top: position.top,
         left: position.left,
         width: position.width,
         height: position.height,
         borderStyle: 'dashed',
         borderRadius: '4px'
       }}
     >
       {/* 选中状态标识 */}
       <div className="absolute -top-8 left-0 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-md border border-blue-400">
         <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
         <span className="font-medium">已选中</span>
       </div>
      
      {/* 删除按钮 */}
        <button
          className="absolute top-1 right-1 px-2 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 active:bg-red-700 transition-colors duration-200 pointer-events-auto shadow-sm hover:shadow-md font-medium"
          onClick={handleDelete}
          title="删除组件"
        >
          delete
        </button>
      
      {/* 四个角的调整手柄 */}
       <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full shadow-md border-2 border-white"></div>
       <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full shadow-md border-2 border-white"></div>
       <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-blue-500 rounded-full shadow-md border-2 border-white"></div>
       <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blue-500 rounded-full shadow-md border-2 border-white"></div>
    </div>
  )
}

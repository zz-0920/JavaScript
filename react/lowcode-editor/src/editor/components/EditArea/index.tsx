import { useComponentsStore } from "../../stores/components"
import type { Component } from "../../stores/components"
import { useComponentConfigStore } from "../../stores/component-config"
import { getComponentById } from "../../stores/components"
import React, { useState, useRef } from "react"
import HoverMask from "../HoverMask"
import SelectedMask from "../SelectedMask"
import { useMaterialDrop } from "../../hooks/useMaterialDrop"

export default function EditArea() {
  const { components, setCurComponentID, curComponentID } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  const [hoverComponentId, setHoverComponentId] = useState<number>()
  const containerRef = useRef<HTMLDivElement>(null)

  // 添加拖拽功能，支持所有组件类型
  const { canDrop, isOver, dropRef } = useMaterialDrop({
    accept: ['Button', 'Container', 'Page'],
    fallbackProps: {}
  })

  // 根据组件ID获取组件信息
  const hoverComponent = hoverComponentId ? getComponentById(hoverComponentId, components) : null

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]
      if (!config?.component) {
        return null
      }
      return React.createElement(config.component, {
        key: component.id,
        id: component.id,
        name: component.name,
        'data-component-id': component.id,
        ...component.props,
        ...config.defaultProps
      },
        renderComponents(component.children || [])
      )
    })
  }
  const handleMouseMove = (e: React.MouseEvent) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (element instanceof HTMLElement) {
        const componentId = element.dataset.componentId
        if (componentId) {
          setHoverComponentId(Number(componentId))
          return
        }
      }
    }
  }

  const handleMouseLeave = () => {
    setHoverComponentId(undefined)
  }

  // 借助冒泡机制，点击页面上面的任何组件
  const handleClick = (e: React.MouseEvent) => {
    const path = e.nativeEvent.composedPath();
    for (let i = 0; i < path.length; i++) {
      const element = path[i];
      if (element instanceof HTMLElement) {
        const componentId = element.dataset.componentId
        if (componentId) {
          const clickedId = Number(componentId)
          // 如果点击的是已选中的组件，则取消选中
          if (curComponentID === clickedId) {
            setCurComponentID(null)
          } else {
            // 否则选中该组件
            setCurComponentID(clickedId)
          }
          e.stopPropagation() // 阻止事件冒泡
          return
        }
      }
    }
    // 如果没有点击到任何组件，清除选中状态
    setCurComponentID(null)
  }

  // 处理删除组件后的清理工作
  const handleDeleteComponent = (componentId: number) => {
    // 如果删除的组件正在被悬浮，清除悬浮状态
    if (hoverComponentId === componentId) {
      setHoverComponentId(undefined)
    }
  }

  // 获取EditArea的样式，包括拖拽状态
  const getEditAreaStyle = () => {
    let baseClass = "h-[100%] edit-area relative"
    
    // 当没有组件时，显示拖拽提示
    if (components.length === 0) {
      baseClass += " flex items-center justify-center"
      if (isOver && canDrop) {
        baseClass += " bg-blue-50 border-2 border-blue-300 border-dashed"
      } else if (canDrop) {
        baseClass += " bg-gray-50 border-2 border-gray-300 border-dashed"
      }
    }
    
    return baseClass
  }

  return (
    <div 
      ref={(node) => {
        containerRef.current = node
        dropRef(node)
      }}
      className={getEditAreaStyle()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {components.length === 0 ? (
        <div className="text-gray-400 text-center">
          <div className="text-lg mb-2">📦</div>
          <div>拖拽组件到这里开始设计</div>
          <div className="text-sm mt-1">支持拖拽 Page、Container、Button 组件</div>
        </div>
      ) : null}
      {components.length > 0 ? renderComponents(components) : null}
      {hoverComponentId && hoverComponentId !== 0 && (
        <HoverMask 
          componentId={hoverComponentId} 
          componentName={hoverComponent?.name || ''}
          containerRef={containerRef as React.RefObject<HTMLDivElement>} 
        />
      )}
      {curComponentID && (
        <SelectedMask 
          componentId={curComponentID}
          containerRef={containerRef as React.RefObject<HTMLDivElement>}
          onDelete={handleDeleteComponent}
        />
      )}
    </div>
  )
}

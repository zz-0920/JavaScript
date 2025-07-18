import { useComponentsStore } from "../../stores/components"
import type { Component } from "../../stores/components"
import { useComponentConfigStore } from "../../stores/component-config"
import { getComponentById } from "../../stores/components"
import React, { useState, useRef } from "react"
import HoverMask from "../HoverMask"

export default function EditArea() {
  const { components } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  const [hoverComponentId, setHoverComponentId] = useState<number>()
  const containerRef = useRef<HTMLDivElement>(null)

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

  return (
    <div 
      ref={containerRef}
      className="h-[100%] edit-area relative" 
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {renderComponents(components)}
      <HoverMask 
        componentId={hoverComponentId} 
        componentName={hoverComponent?.name || ''}
        containerRef={containerRef as React.RefObject<HTMLDivElement>} 
      />
    </div>
  )
}

import { useEffect } from "react"
import { useComponentsStore } from "../../stores/components"
import type { Component } from "../../stores/components"
import { useComponentConfigStore } from "../../stores/component-config"
import React from "react"

export default function EditArea() {
  const { components, addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()

  useEffect(() => {
    addComponent({
      id: 2,
      name: 'Container',
      props: {},
      desc: '页面容器'
    }, 1)

    addComponent({
      id: 3,
      name: 'Button',
      props: {
        text: '提交'
      },
      desc: '按钮',
      children: []
    }, 2)

  }, [])

  function renderComponents(components: Component[]): React.ReactNode {
    return components.map((component: Component) => {
      const config = componentConfig?.[component.name]
      if (!config?.component) {
        return null
      }
      return React.createElement(config.component, {
        key: component.id,
        ...component.props,
        ...config.defaultProps
      },
        renderComponents(component.children || [])
      )
    })
  }
  return (
    <div>
      {renderComponents(components)}
    </div>
  )
}

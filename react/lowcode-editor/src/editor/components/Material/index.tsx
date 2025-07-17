import { useComponentConfigStore } from "../../stores/component-config"
import { useMemo } from "react"

export default function Material() {
  const { componentConfig } = useComponentConfigStore()
  const components = useMemo(() => Object.values(componentConfig), [componentConfig])
  
  return (
    <div>
      {components.map((component) => {
        return (
          <div key={component.name} className="border-dashed border-[1px] border-[#000] py-[8px] px-[10px] inline-block bg-white m-[10px] cursor-move hover:bg-[#ccc]">
            {component.name}
          </div>
        )
      })}
    </div>
  )
}

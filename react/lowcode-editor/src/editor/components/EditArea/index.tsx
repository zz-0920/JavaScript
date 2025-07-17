import { useEffect } from "react"
import { useComponentsStore } from "../../stores/components"

export default function EditArea() {
const { components, addComponent } = useComponentsStore()

useEffect(() => {
  addComponent({
    id: 2,
    name: 'Button',
    props: {
      children: '按钮'
    },
    desc: '按钮'
  }, 1)
}, [])

  return (
    <div>
      <pre>
        {JSON.stringify(components, null, 2)}
      </pre>
    </div>
  )
}

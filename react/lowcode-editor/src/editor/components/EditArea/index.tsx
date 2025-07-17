import { useEffect } from "react"
import { useComponentsStore } from "../../stores/components"

export default function EditArea() {
const { components, addComponent, deleteComponent } = useComponentsStore()

useEffect(() => {
  addComponent({
    id: 2,
    name: 'Button',
    props: {
      children: '按钮'
    },
    desc: '按钮'
  }, 1)

  setTimeout(() => {
    deleteComponent(2)
  }, 2000)
}, [])

  return (
    <div>
      <pre>
        {JSON.stringify(components, null, 2)}
      </pre>
    </div>
  )
}

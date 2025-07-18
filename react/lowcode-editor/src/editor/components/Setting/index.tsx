import { useComponentsStore } from "../../stores/components"

export default function Setting() {
  return (
    <div>
      <pre>
        {JSON.stringify(useComponentsStore().components, null, 2)}
      </pre>
    </div>
  )
}

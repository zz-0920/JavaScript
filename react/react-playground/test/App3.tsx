import React from 'react'
import { Editor } from '@monaco-editor/react'

export default function App3() {
  const code = `
    import { useState, useEffect } from 'react'

    function App() {
      const [num, setNum] = useState(() => {
        const num1 = 1 + 2
        const num2 = 2 + 3
        return num1 + num2
      })

      return (
        <div onClick={() => setNum((prevNum) => prevNum+1)}>{num}</div>
      )
    }

    export default App
  `

  return (
    <Editor
      defaultValue={code}
      language="typescript"
      height="500px"
    />
  )
}

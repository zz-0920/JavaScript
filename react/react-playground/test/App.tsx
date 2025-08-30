import { useRef } from 'react'
import { transform } from '@babel/standalone'

export default function App() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  function onClick() {
    if (!textareaRef.current) return

    const res = transform(textareaRef.current.value, {
      presets: ['react', 'typescript'],
      filename: 'index.tsx',
    })
    console.log(res.code)
    
  }

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
    <div>
      <textarea ref={textareaRef} defaultValue={code} style={{ width: '500px', height: '300px' }}></textarea>
      <button onClick={onClick}>编译</button>
    </div>
  )
}



// import Aaa from './Aaa.tsx'    // 'blob://xxxxxxxxxx'

// export default function App2() {
//   return <Aaa />
// }
import type { PluginObj } from '@babel/core'
import React from 'react'
import { transform } from '@babel/standalone'

export default function APP() {
  const code1 = `
      function add(a, b) {
        return a + b
      }
      export { add }
    `
  const url = URL.createObjectURL(new Blob([code1], { type: 'application/javascript' }))
  const transformImportSourcePlugin: PluginObj = {
    visitor: {
      ImportDeclaration(path) {
        path.node.source.value = url
      }
    }
  }
   const code2 = `import { add } from './add.ts';
      console.log(add(1, 2))
    `
  
  const onClick = () => {
    const res = transform(code2, {
      presets: ['react', 'typescript'],
      filename: 'index.tsx',
      plugins: [transformImportSourcePlugin],
    })
    console.log(res.code)
  }


  return (
    <div>
      <button onClick={onClick}>编译</button>
    </div>
  )
}

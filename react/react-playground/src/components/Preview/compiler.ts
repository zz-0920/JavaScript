import { transform } from '@babel/standalone'
import type { Files, File } from '../../ReactPlayground/PlaygroundContext'
import { ENTRY_FILE_NAME } from '../../ReactPlayground/files'

export const beforeTransformCode = (filename: string, code: string) => {
    let _code = code
    const regexReact = /import\s+React/g
    if ((filename.endsWith('.jsx')) || (filename.endsWith('.tsx')) && !regexReact.test(code)) {
        _code = `import React from 'react';\n${code}`
    }
    return _code
}

export const BabelTransform = (filename: string, code: string, files: Files) => {
    // 将 code 进行编译
    let _code = beforeTransformCode(filename, code)
    let result = ''
    try {
        result = transform(_code, {
            presets: ['react', 'typescript'],
            filename,
            plugins: [customResolver(files)], // 帮我将 from 'react' 转换为 from 'blob://xxxx'
            retainLines: true,
        }).code!
        return result
    } catch (error) {
        console.log('babel transform error', error)
    }
}

// 手搓一个编译函数
export const Compiler = (files: Files) => {
    const main = files[ENTRY_FILE_NAME]
    return BabelTransform(ENTRY_FILE_NAME, main.value, files)
}

// 自定义插件 解决 import 引入的模块路径问题
const customResolver = (files: Files) => {
    return {
        visitor: {
            ImportDeclaration(path: any) {
                const modulePath = path.node.source.value
                console.log(modulePath);

                if (modulePath.startsWith('.')) {
                    const file = getModuleFile(files, modulePath) // 从 files 中获取模块文件
                    if (file) {
                        if (file.name.endsWith('.css')) {
                            path.node.source.value = css2JS(file)
                        } else if (file.name.endsWith('.json')) {
                            path.node.source.value = json2JS(file)
                        } else {
                            path.node.source.value = URL.createObjectURL(
                                new Blob([BabelTransform(file.name, file.value, files) || ''], { type: 'text/javascript' })
                            )
                        }
                    }
                }
            }
        }
    }
}

// 将 css 转换为 js
const css2JS = (file: File) => {
    const randomId = Math.random().toString(36).substring(2)
    const js = `
    (() => {
      const style = document.createElement('style')
      style.setAttribute('id', 'style_${randomId}_${file.name}')
      document.head.appendChild(style)

      const styleText = document.createTextNode(\`${file.value}\`)
      style.innerHTML = ''
      style.appendChild(styleText)
    })()
  `
    const blob = new Blob([js], { type: 'text/javascript' })
    return URL.createObjectURL(blob)
}

// 将 json 转换为 js
const json2JS = (file: File) => {
    const { value } = file
    const js = `export default ${value}`
    const blob = new Blob([js], { type: 'text/javascript' })
    return URL.createObjectURL(blob)
}

const getModuleFile = (files: Files, modulePath: string) => {
    let modulename = modulePath.split('./').pop() || ''
    if (!modulename.includes('.')) {
        const realModuleName = Object.keys(files).filter(key => {
            return key.endsWith('.ts') || key.endsWith('.tsx') || key.endsWith('.js') || key.endsWith('.jsx')
        }).find(key => {
            return key.split('.').includes(modulename)
        })
        if (realModuleName) {
            modulename = realModuleName
        } else {
            return null
        }
    }
    const file = files[modulename]
    if (file) {
        return file
    }
    return null
}
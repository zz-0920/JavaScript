import { createContext, type PropsWithChildren, useState } from 'react'
import { filenameLanguage } from './utils'
import { initFiles } from './files'

export interface File {
  name: string,
  value: string,
  language: string,
}

export interface Files {
  [key: string]: File
}

export interface PlaygroundContext {
  files: Files,
  selectedFileName: string,
  setSelectedFileName: (fileName: string) => void,
  setFiles: (files: Files) => void,
  addFile: (file: string) => void,
  removeFile: (fileName: string) => void,
  updateFileName: (fileName: string, newFileName: string) => void,
}

export const PlaygroundContext = createContext<PlaygroundContext>({
  selectedFileName: 'App.tsx',
} as PlaygroundContext)


// PlaygroundProvider 等同于仓库
export const PlaygroundProvider = (props: PropsWithChildren) => {
  const { children } = props
  const [files, setFiles] = useState<Files>(initFiles)  // files等同于仓库中的数据
  const [selectedFileName, setSelectedFileName] = useState<string>('App.tsx')

  const addFile = (name: string) => {
    files[name] = {
      name,
      value: '',
      language: filenameLanguage(name),
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFileName: string, newFileName: string) => {
    if (!files[oldFileName]) return
    const { [oldFileName]: value, ...rest } = files
    const newFile = {
      [newFileName]: {
        ...value,
        name: newFileName,
        language: filenameLanguage(newFileName),
      }
    }
    setFiles({ ...rest, ...newFile })
  }

  return (
    <PlaygroundContext.Provider value={{
      files,
      setFiles,
      selectedFileName,
      setSelectedFileName,
      addFile,
      removeFile,
      updateFileName,
    }}>
      {children}
    </PlaygroundContext.Provider>
  ) 
}



// PlaygroundContext: {
//   "App.vue": {
//     name: 'App.vue',
//     value: 'xxxxx',
//     language: 'vue',
//   },
//   "Title2.vue": {
//     name: 'Title.vue',
//     value: 'xxxxx',
//     language: 'vue',
//   }
// }

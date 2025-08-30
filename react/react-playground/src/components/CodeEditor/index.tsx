import Editor from './Editor'
import FileNameList from './FileNameList'
import { useContext } from 'react'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import { debounce } from 'lodash-es'

export default function CodeEditor() {
  const {
    files,
    setFiles,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext)

  const file = files[selectedFileName]

  const onEditorChange = (value: string) => {
    console.log(value)
    files[file.name].value = value
    setFiles({ ...files })
  }

  return (
    <div style={{width: '100%', height: '100%'}}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)}/>
    </div>
  )
}

import { useContext, useEffect, useState } from 'react'
import { Compiler } from './compiler'
import { PlaygroundContext } from '../../ReactPlayground/PlaygroundContext'
import iframeRaw from './iframe.html?raw'
import { IMPORT_MAP_FILE_NAME } from '../../ReactPlayground/files'


export default function Preview() {
  const { files } = useContext(PlaygroundContext)
  // const code = Compiler(files) || ''
  const [code, setCode] = useState('')
  useEffect(() => {
    setCode(Compiler(files) || '')
  }, [files])

  const getIframeUrl = () => {
    const res = iframeRaw.replace(
      '<script type="importmap"></script>',
      `<script type="importmap">${files[IMPORT_MAP_FILE_NAME].value}</script>`,
    ).replace(
      '<script type="module"></script>',
      `<script type="module">${code}</script>`,
    )
    return URL.createObjectURL(new Blob([res], { type: 'text/html' }))
  }

  const iframeUrl = getIframeUrl()

  // useEffect(() => {
  //   return () => {
  //     URL.revokeObjectURL(iframeUrl)
  //   }
  // }, [iframeUrl])

  return (
    <div style={{ height: '100%' }}>
      <iframe
      src={iframeUrl || ''} 
      style={{ border: 'none', width: '100%', height: '100%' }}
      />
      {/* <Editor file={
        {
          name: 'Preview',
          language: 'javascript',
          value: code,
        }
      } /> */}
    </div>
  )
}

import React from 'react'
import iframeRaw from './iframe.html?raw'

const iframeUrl = URL.createObjectURL(new Blob([iframeRaw], { type: 'text/html' }))

export default function App4() {
  return (
    <iframe 
      src={iframeUrl} 
      style={{width: '100%', height: '100%', padding: 0, border: 0}}
    ></iframe>
  )
}

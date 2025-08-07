import React, { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [status, setStatus] = useState('ready')
  const audioRef = useRef(null)
  const [inputText, setInputText] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function createBlobUrl(base64AudioData) {
    let byteArrays = []
    let byteCharacters = atob(base64AudioData)
    for (let offset = 0; offset < byteCharacters.length; offset++) {
      let byteArray = byteCharacters.charCodeAt(offset)
      byteArrays.push(byteArray)
    }
    let blob = new Blob([new Uint8Array(byteArrays)], { type: 'audio/mp3' })
    return URL.createObjectURL(blob)
  }

  const generateAudio = async () => {
    if (!inputText.trim()) {
      setStatus('请输入要转换的文本')
      return
    }

    const token = import.meta.env.VITE_ACCESS_TOKEN
    const appId = import.meta.env.VITE_APP_ID
    const clusterId = import.meta.env.VITE_CLUSTER_ID
    const voiceName = 'zh_female_gaolengyujie_moon_bigtts'

    const endpoint = '/tts/api/v1/tts'
    const headers = {
      Authorization: `Bearer;${token}`,
      'Content-Type': 'application/json',
    }
    const payload = {
      app: {
        appid: appId,
        token,
        cluster: clusterId,
      },
      user: {
        uid: 'wn'
      },
      audio: {
        voice_type: voiceName,
        encoding: 'ogg_opus',
        speed_ratio: 1.0,
        emotion: 'happy',
      },
      request: {
        reqid: Math.random().toString(36).substring(7),
        text: inputText,
        text_type: 'plain',
        operation: 'query'
      }
    }

    setIsLoading(true)
    setStatus('正在生成语音...')
    
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      })
      const data = await res.json()
    
      if (!data.data) {
        setStatus('生成失败，请重试')
        setIsLoading(false)
        return
      }

      const url = createBlobUrl(data.data)
      audioRef.current.src = url
      audioRef.current.play()
      setStatus('生成成功！')
    } catch (error) {
      setStatus('网络错误，请检查连接')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusClass = () => {
    if (isLoading) return 'loading'
    if (status.includes('失败') || status.includes('错误')) return 'error'
    if (status.includes('成功')) return 'success'
    return 'ready'
  }

  return (
    <div className='container'>
      <div className='input-section'>
        <h1>AI 语音合成</h1>
        <p className='subtitle'>输入文本，一键生成自然流畅的语音</p>
        
        <div className='form-group'>
          <label htmlFor='textInput'>输入文本</label>
          <textarea 
            id='textInput'
            placeholder='请输入要转换为语音的文本内容...'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </div>
        
        <button 
          className='generate-button' 
          onClick={generateAudio}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading && <span className='loading-spinner'></span>}
          {isLoading ? '生成中...' : '生成语音'}
        </button>
      </div>
      
      <div className='output'>
        <div className={`status ${getStatusClass()}`}>
          {status}
        </div>
        <div className='audio-player'>
          <audio ref={audioRef} controls />
        </div>
      </div>
    </div>
  )
}



// blob:https://v.qq.com/5c4a8974-82e5-484a-a176-4c19ecde54e1
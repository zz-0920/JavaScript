import React, { useState, useRef } from 'react'
import './App.css'

export default function App() {
  const [imgURL, setImgURL] = useState(null)
  const promptRef = useRef(null)

  const generateImage = async () => {
    const negative_prompt = 'Blurry, Bad, Bad anatomy, Bad proportions, Deformed, Disconnected limbs, Disfigured, Extra arms, Extra limbs, Extra hands, Fused fingers, Gross proportions, Long neck, Malformed limbs, Mutated, Mutated hands, Mutated limbs, Missing arms, Missing fingers, Poorly drawn hands, Poorly drawn face.'
    const endpoint = '/klingai/v1/images/generations'
    const token = await (await fetch('/api/jwt-auth')).text()
    const payload = {
      prompt: promptRef.current.value,
      negative_prompt,
      model_name: 'kling-v1',
      aspect_ratio: '1:1'
    }
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    })
    const data = await res.json()
    console.log(data)
    setImgURL(data.data[0].url)
  }

  return (
    <div className='container'>
      <div>
        <label>Prompt:</label>
        <button onClick={generateImage}>生成</button>
        <textarea className='prompt-textarea' ref={promptRef}></textarea>
      </div>
      <div className='output'>
        <img src={imgURL} alt="" />
      </div>
    </div>
  )
}

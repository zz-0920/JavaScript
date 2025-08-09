function createBlobUrl(base64AudioData: string) {
  let byteArrays = []
  let byteCharacters = atob(base64AudioData)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteArrays.push(byteCharacters.charCodeAt(i))  // 将每一个字符转换为对应的 ASCII 码
  }

  let blob = new Blob([new Uint8Array(byteArrays)], { type: 'audio/mp3' })

  return URL.createObjectURL(blob)
}


export async function generateAudio(text: string) {
  const token = import.meta.env.VITE_ACCESS_TOKEN
  const appId = import.meta.env.VITE_APP_ID
  const voiceName = 'zh_female_linjianvhai_moon_bigtts'

  const endpoint = '/tts/api/v1/tts'
  const headers = {
    'Authorization': `Bearer;${token}`,
    'Content-Type': 'application/json'
  }
  const payload = {
    "app": {
      "appid": appId,
      "token": token,
      "cluster": "volcano_tts",
    },
    "user": {
      "uid": "uid123"
    },
    "audio": {
      "voice_type": voiceName,
      "encoding": "ogg_opus",
      "speed_ratio": 1.0,
      "emotion": "happy",
    },
    "request": {
      "reqid": Math.random().toString(36).substring(2),
      "text": text,
      "operation": "query",
    }
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload)
  })
  const data = await res.json()

  if (!data.data) {
    throw new Error('生成音频失败')
  }

  return createBlobUrl(data.data)
  
}
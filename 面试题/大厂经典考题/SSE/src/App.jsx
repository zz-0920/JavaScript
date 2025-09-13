import { useState } from 'react'

export default function App() {
  const [content, setContent] = useState('')
  const [question, setQuestion] = useState('请你给我讲一下龟兔赛跑的故事')
  const [streaming, setStreaming] = useState(false)

  const upDate = async () => {
    if (!question) return

    // 检查API密钥
    const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
    if (!apiKey) {
      setContent('错误：请在 .env.local 文件中设置 VITE_DEEPSEEK_API_KEY')
      return
    }

    setContent('思考中...')

    try {
      const endpoint = 'https://api.deepseek.com/chat/completions'
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [{
            role: 'user',
            content: question
          }],
          stream: streaming
        })
      })

      // 检查HTTP状态
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }

      if (streaming) {
        // 流式处理 - 不要先调用 res.json()
        setContent('')
        const reader = res.body.getReader()
        const decoder = new TextDecoder()
        let accumulatedContent = ''

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6).trim()
              if (data === '[DONE]') continue
              if (data === '') continue

              try {
                const parsed = JSON.parse(data)
                const delta = parsed.choices?.[0]?.delta?.content
                if (delta) {
                  accumulatedContent += delta
                  setContent(accumulatedContent)
                }
              } catch (e) {
                console.warn('解析SSE数据失败:', e, '数据:', data)
              }
            }
          }
        }
      } else {
        // 非流式处理
        const data = await res.json()
        if (data.choices?.[0]?.message?.content) {
          setContent(data.choices[0].message.content)
        } else {
          setContent('错误：响应格式不正确')
        }
      }
    } catch (error) {
      console.error('请求错误:', error)
      setContent(`错误：${error.message}`)
    }
  }

  return (
    <div className="container">
      <div>
        <label>输入：</label>
        <input type="text" onChange={(e) => setQuestion(e.target.value)} defaultValue={question} />
        <button onClick={upDate}>提交</button>
      </div>
      <div className="output" style={{ minHeight: '300px', width: '500px' }}>
        <div>
          <label>Streaming</label>
          <input type="checkbox" onChange={(e) => setStreaming(e.target.checked)} />
          <div>{content}</div>
        </div>
      </div>
    </div>
  )
}
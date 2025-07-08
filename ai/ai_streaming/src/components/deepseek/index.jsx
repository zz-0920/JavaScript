import { useState } from 'react'
import './index.css'

function Deepseek() {
    const [input, setInput] = useState('')
    const [content, setContent] = useState('')
    const [streaming, setStreaming] = useState(false)

    const send = async () => {    
        // 获取到用户在 input 框中输入的内容
        if (!input) return
        setContent("思考中...")
        // 跟 DeepSeek 交互
        const endpoint = 'https://api.deepseek.com/chat/completions'
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`,
        }
        const response = await fetch(endpoint, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: "user", content: input }],
                stream: streaming
            })
        })

        
        if(streaming) {
            // 流式输出
            setContent('')
            const reader = response.body.getReader() // 读取器
            const decoder = new TextDecoder() // 解码器 -- 解码二进制数据
            let done = false
            let buffer = ''
            while(!done) {
                const { value, done: readerDone } = await reader.read()
                done = readerDone
                const text = buffer + decoder.decode(value)
                buffer = ''
                const lines = text.split('\n').filter(line => line.startsWith('data:'))
                for (const line of lines) {
                    const incoming = line.slice(6)
                    if (incoming === '[DONE]') {
                        done = true
                        break
                    }
                    try {
                        const parsed = JSON.parse(incoming)
                        const content = parsed.choices[0].delta.content
                        if (content) {
                            setContent(prev => prev + content)
                        }
                    } catch (e) {
                        console.error('Error parsing JSON:', e)
                    }
                }
            }
        } else {
            // 非流式输出
            const data = await response.json()
            setContent(data.choices[0].message.content)
        }
    }

    return (
        <div className="container">
            <div className="input-section">
                <div className="input-group">
                    <div>
                        <label>请输入您的问题</label>
                        <div className="input-row">
                            <input 
                                type="text" 
                                className="input" 
                                placeholder="在这里输入您想问的问题..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && send()}
                            />
                            <button onClick={send}>发送</button>
                        </div>
                    </div>
                    <div className="streaming-control">
                        <input 
                            type="checkbox" 
                            id="streaming"
                            onChange={(e) => setStreaming(e.target.checked)} 
                        />
                        <label htmlFor="streaming">启用流式输出</label>
                    </div>
                </div>
            </div>
            
            <div className="response">
                <label>AI 回复</label>
                <div className={`response-content ${content === '思考中...' ? 'thinking' : ''}`}>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Deepseek
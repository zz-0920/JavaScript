import { useState } from 'react'

export default function App() {
    const [content, setContent] = useState('')
    const [question, setQuestion] = useState('请你给我讲一下龟兔赛跑的故事')
    const [streaming, setStreaming] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const upDate = async () => {
        if (!question) return

        // 检查API密钥
        const apiKey = import.meta.env.VITE_DEEPSEEK_API_KEY
        if (!apiKey) {
            setContent('错误：请在 .env.local 文件中设置 VITE_DEEPSEEK_API_KEY')
            return
        }

        setContent('')
        setIsLoading(true)

        try {
            const endpoint = 'http://localhost:3000/stream'
            
            if (streaming) {
                // 流式处理
                const eventSource = new EventSource(`${endpoint}?question=${encodeURIComponent(question)}`)
                let accumulatedContent = ''
                
                eventSource.onmessage = (event) => {
                    try {
                        const data = JSON.parse(event.data)
                        
                        if (data.error) {
                            setContent(`错误：${data.message}`)
                            eventSource.close()
                            setIsLoading(false)
                            return
                        }
                        
                        if (data.choices && data.choices[0] && data.choices[0].delta && data.choices[0].delta.content) {
                            accumulatedContent += data.choices[0].delta.content
                            setContent(accumulatedContent)
                        }
                    } catch (error) {
                        console.error('解析数据错误:', error)
                    }
                }
                
                eventSource.addEventListener('end', () => {
                    eventSource.close()
                    setIsLoading(false)
                })
                
                eventSource.onerror = (error) => {
                    console.error('SSE 连接错误:', error)
                    setContent('连接错误，请检查服务器是否运行')
                    eventSource.close()
                    setIsLoading(false)
                }
                
            } else {
                // 非流式处理
                const response = await fetch(`${endpoint}?question=${encodeURIComponent(question)}`)
                
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`)
                }
                
                const reader = response.body.getReader()
                let accumulatedContent = ''
                
                while (true) {
                    const { done, value } = await reader.read()
                    if (done) break
                    
                    const chunk = new TextDecoder().decode(value)
                    const lines = chunk.split('\n')
                    
                    for (const line of lines) {
                        if (line.startsWith('data: ')) {
                            const data = line.slice('data: '.length).trim()
                            if (data === '[DONE]') {
                                setIsLoading(false)
                                return
                            }
                            if (data) {
                                try {
                                    const parsed = JSON.parse(data)
                                    if (parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content) {
                                        accumulatedContent += parsed.choices[0].delta.content
                                        setContent(accumulatedContent)
                                    }
                                } catch (error) {
                                    console.error('解析数据错误:', error)
                                }
                            }
                        }
                    }
                }
                setIsLoading(false)
            }
        } catch (error) {
            console.error('请求错误:', error)
            setContent(`错误：${error.message}`)
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <div>
                <label>输入：</label>
                <input 
                    type="text" 
                    onChange={(e) => setQuestion(e.target.value)} 
                    defaultValue={question} 
                    disabled={isLoading}
                />
                <button onClick={upDate} disabled={isLoading}>
                    {isLoading ? '处理中...' : '提交'}
                </button>
            </div>
            <div className="output" style={{ minHeight: '300px', width: '500px' }}>
                <div>
                    <label>Streaming</label>
                    <input 
                        type="checkbox" 
                        onChange={(e) => setStreaming(e.target.checked)} 
                        disabled={isLoading}
                    />
                    <div style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>{content}</div>
                </div>
            </div>
        </div>
    )
}
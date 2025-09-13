// BFF 中间层
import express from 'express';
import cors from 'cors';
import { config } from 'dotenv';

config({
    path: ['.env.local', '.env']
});

const openaiApiKey = process.env.DEEPSEEK_API_KEY;
const app = express();
const port = 3000;
const endpoint = 'https://api.deepseek.com/chat/completions';

// 添加 CORS 支持
app.use(cors());

app.get('/stream', async (req, res) => {
    // 输入验证
    const question = req.query.question;
    if (!question) {
        return res.status(400).json({ error: '缺少 question 参数' });
    }
    
    if (!openaiApiKey) {
        return res.status(500).json({ error: 'API 密钥未配置' });
    }

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.flushHeaders();
    
    // 处理客户端断开连接
    req.on('close', () => {
        console.log('客户端断开连接');
        res.end();
    });
    
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: [{ role: 'user', content: question }],
                stream: true
            })
        });
        
        // 检查响应状态
        if (!response.ok) {
            throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
        }
        
        const reader = response.body.getReader();
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            const chunk = new TextDecoder().decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice('data: '.length).trim();
                    if (data === '[DONE]') {
                        res.write('event: end\n');
                        res.write('data: [DONE]\n\n');
                        res.end();
                        return;
                    }
                    if (data) {
                        res.write(`data: ${data}\n\n`);
                    }
                }
            }
        }
        
        res.end();
        
    } catch (error) {
        console.error('SSE 流处理错误:', error);
        
        // 发送错误信息给客户端
        res.write(`data: ${JSON.stringify({
            error: true,
            message: error.message
        })}\n\n`);
        
        res.end();
    }
});

app.listen(port, () => {
    console.log(`SSE 服务器运行在 http://localhost:${port}`);
});
import express from "express";
import axios from "axios";
import * as dotenv from "dotenv";
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

dotenv.config({
    path: ['.env.local', '.env'],
});

const app = express();
const port = 3000;

// 添加 CORS 支持
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

app.use(express.json());

// 获取目录文件列表的函数（避免编码问题）
function getDirectoryFiles() {
    try {
        const files = fs.readdirSync(process.cwd());
        return files.map(file => {
            const filePath = path.join(process.cwd(), file);
            const stats = fs.statSync(filePath);
            return {
                name: file,
                type: stats.isDirectory() ? '文件夹' : '文件',
                size: stats.isFile() ? stats.size : null,
                modified: stats.mtime.toLocaleString('zh-CN')
            };
        });
    } catch (error) {
        throw new Error(`读取目录失败: ${error.message}`);
    }
}

// 修改路由路径为 /api/chat 以匹配前端请求
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;

    const model = process.env.OLLAMA_MODEL;
    const base_url = process.env.OLLAMA_API_URL;

    console.log('收到请求:', { message, model, base_url });

    try {
        const response = await axios.post(`${base_url}/api/chat`, {
            model,
            messages: [
                {
                    role: 'system',
                    content: '如果有需要，你可以调用DirFiles工具查找当前目录下的文件和文件夹',
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            tools: [{
                type: 'function',
                function: {
                    name: 'DirFiles',
                    description: '查找当前目录下的文件和文件夹',
                }
            }],
            stream: false,
        });
        
        const reply = response.data.message.content;

        if (response.data.message.tool_calls && response.data.message.tool_calls.length && response.data.message.tool_calls[0].function?.name === 'DirFiles') {
            try {
                const files = getDirectoryFiles();
                const fileList = files.map(file => 
                    `${file.name} (${file.type}${file.size ? `, ${file.size} 字节` : ''}, 修改时间: ${file.modified})`
                ).join('\n');
                
                res.json({ 
                    reply: `${reply}\n\n当前目录文件列表：\n\`\`\`\n${fileList}\n\`\`\`` 
                });
            } catch (dirError) {
                res.status(500).json({ error: `获取目录信息失败: ${dirError.message}` });
            }
        } else {
            // 没有工具调用时，直接返回 AI 回复
            res.json({ reply });
        }

    } catch (error) {
        console.error(`请求 Ollama API 时出错: ${error}`);
        res.status(500).json({ error: `请求 Ollama API 时出错: ${error.message}` });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
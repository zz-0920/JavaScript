/**
 * This is a API server
 */

import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import React from 'react'
import { renderToString } from 'react-dom/server'
import authRoutes from './routes/auth.js'
import HomePage from '../src/components/HomePage.tsx'

// for esm mode
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// load env
dotenv.config()

const app: express.Application = express()

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// 静态文件服务
app.use('/static', express.static(path.join(__dirname, '../dist')))

/**
 * SSR 渲染函数
 */
function renderHTML(reactComponent: string): string {
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React SSR 示例</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
        }
      </style>
    </head>
    <body>
      <div id="root">${reactComponent}</div>
      <script src="/static/client.js"></script>
    </body>
    </html>
  `
}

/**
 * SSR 路由
 */
app.get('/', (req: Request, res: Response) => {
  try {
    const reactComponent = renderToString(React.createElement(HomePage))
    const html = renderHTML(reactComponent)
    res.send(html)
  } catch (error) {
    console.error('SSR Error:', error)
    res.status(500).send('服务器渲染错误')
  }
})

/**
 * API Routes
 */
app.use('/api/auth', authRoutes)

/**
 * health
 */
app.use(
  '/api/health',
  (req: Request, res: Response, next: NextFunction): void => {
    res.status(200).json({
      success: true,
      message: 'ok',
    })
  },
)

/**
 * error handler middleware
 */
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({
    success: false,
    error: 'Server internal error',
  })
})

/**
 * 404 handler
 */
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'API not found',
  })
})

export default app

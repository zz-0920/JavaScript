import express from 'express'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config({
    path: ['.env.local', 'env'],
})

const app = express()
const port = 3000

async function authKelingai() {
    const headers = {
        algorithm: 'HS256',
    }
    const now = Math.floor(Date.now() / 1000)
    const payload = {
        iss: process.env.ACCESS_KEY_ID,
        exp: now + 1800,
        nbf: now - 5,
    }
    // 用可灵的 access key secret 生成 jwt
    const token = jwt.sign(payload, process.env.ACCESS_KEY_SECRET, headers)
    return token
}

// 定义了一个 get 接口
app.get('/jwt-auth', async (req, res) => {
    const token = await authKelingai()
    res.send(token)
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`)
})
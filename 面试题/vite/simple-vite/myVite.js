const http = require('http')
const fs = require('fs')
const path = require('path')

function rewriteImport(content) {
    return content.replace(/\bfrom\s+['"]([^'"]+)['"]/g, function (match, modulePath) {
        console.log('Rewriting import:', match, '->', modulePath)
        
        // 跳过相对路径和绝对路径
        if (modulePath.startsWith('./') || 
            modulePath.startsWith('../') || 
            modulePath.startsWith('/')) {
            return match
        }
        
        // 重写为模块路径
        return `from '/@modules/${modulePath}'`
    })
}

// 解析模块路径
function resolveModule(moduleName) {
    console.log('Resolving module:', moduleName)
    
    // 处理子路径模块（如 react-dom/client）
    const modulePath = path.resolve(__dirname, 'node_modules', moduleName)
    
    // 如果是具体文件路径（包含子路径）
    if (moduleName.includes('/')) {
        // 尝试直接路径
        if (fs.existsSync(modulePath + '.js')) {
            return modulePath + '.js'
        }
        if (fs.existsSync(modulePath)) {
            const stats = fs.statSync(modulePath)
            if (stats.isFile()) {
                return modulePath
            }
        }
    }
    
    // 尝试读取 package.json
    const packageDir = moduleName.includes('/') 
        ? path.resolve(__dirname, 'node_modules', moduleName.split('/')[0])
        : path.resolve(__dirname, 'node_modules', moduleName)
        
    const packageJsonPath = path.join(packageDir, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
        try {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
            const main = packageJson.main || 'index.js'
            const mainPath = path.join(packageDir, main)
            if (fs.existsSync(mainPath)) {
                return mainPath
            }
        } catch (error) {
            console.warn('Failed to parse package.json for', moduleName)
        }
    }
    
    // 尝试常见的入口文件
    const possibleFiles = [
        path.join(packageDir, 'index.js'),
        path.join(packageDir, 'index.mjs')
    ]
    
    for (const filePath of possibleFiles) {
        if (fs.existsSync(filePath)) {
            return filePath
        }
    }
    
    return null
}

// 解析文件路径（添加扩展名）
function resolveFile(filePath) {
    // 如果文件已经存在，直接返回
    if (fs.existsSync(filePath)) {
        return filePath
    }
    
    // 尝试添加扩展名
    const extensions = ['.js', '.jsx', '.ts', '.tsx', '.mjs']
    for (const ext of extensions) {
        const fullPath = filePath + ext
        if (fs.existsSync(fullPath)) {
            return fullPath
        }
    }
    
    return null
}

const server = http.createServer((req, res) => {
    const { url } = req
    console.log('Request:', url)
    
    // 设置 CORS
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    if (url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        const content = fs.readFileSync('./index.html', 'utf8')
        res.end(content)
    } else if (url.startsWith('/@modules/')) {
        // 处理模块请求
        const moduleName = url.slice(10)
        console.log('Resolving module:', moduleName)
        
        const modulePath = resolveModule(moduleName)
        if (modulePath && fs.existsSync(modulePath)) {
            console.log('Found module at:', modulePath)
            res.writeHead(200, { 'Content-Type': 'application/javascript' })
            const content = fs.readFileSync(modulePath, 'utf8')
            res.end(rewriteImport(content))
        } else {
            console.error('Module not found:', moduleName)
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end(`Module not found: ${moduleName}`)
        }
    } else {
        // 处理静态文件
        const requestPath = path.resolve(__dirname, url.slice(1))
        const resolvedPath = resolveFile(requestPath)
        
        if (resolvedPath) {
            const ext = path.extname(resolvedPath)
            const mimeType = ext === '.js' || ext === '.jsx' || ext === '.ts' || ext === '.tsx' || ext === '.mjs' 
                ? 'application/javascript' 
                : 'text/plain'
            
            res.writeHead(200, { 'Content-Type': mimeType })
            const content = fs.readFileSync(resolvedPath, 'utf8')
            
            if (mimeType === 'application/javascript') {
                res.end(rewriteImport(content))
            } else {
                res.end(content)
            }
        } else {
            console.error('File not found:', requestPath)
            res.writeHead(404, { 'Content-Type': 'text/plain' })
            res.end('File not found')
        }
    }
})

server.listen(5173, () => {
    console.log('🚀 Dev server running at http://localhost:5173')
})
# HTTP 协议详解

## HTTP 基本概念

**HTTP (HyperText Transfer Protocol)** 是一种用于分布式、协作式和超媒体信息系统的应用层协议。它是万维网的数据通信基础。

### 基本特点
- **无状态**：每个请求都是独立的，服务器不保存客户端状态
- **无连接**：每次连接只处理一个请求（HTTP/1.0）
- **简单快速**：客户向服务器请求服务时，只需传送请求方法和路径
- **灵活**：允许传输任意类型的数据对象

## HTTP 版本演进

### HTTP/0.9 (1991年)
**背景**：最初用于学术交流，设计极其简单

**特点**：
1. 只支持GET方法
2. 只有请求行，没有请求头和请求体
3. 只有响应体，没有响应头和状态码
4. 只能传输HTML文本，使用ASCII编码
5. 服务器发送完数据后立即关闭连接

**请求示例**：
```http
GET /index.html
```

**响应示例**：
```html
<html>
<body>Hello World</body>
</html>
```

### HTTP/1.0 (1996年)
**背景**：万维网快速发展，浏览器诞生，需要传输多种类型的文件

**面临的问题**：
1. 浏览器需要知道服务端返回的资源类型
2. 浏览器需要知道资源的压缩方式
3. 浏览器需要告诉服务端自己支持的语言版本
4. 需要支持多种编码方式（ASCII、Base64、二进制等）

**新增特性**：
1. **增加了请求头和响应头**
2. **支持多种请求方法**：GET、POST、HEAD
3. **引入状态码**：200、404、500等
4. **支持多种内容类型**：text/html、image/jpeg等
5. **支持内容编码**：gzip、deflate等

**请求示例**：
```http
GET /index.html HTTP/1.0
Host: www.example.com
User-Agent: Mozilla/5.0
Accept: text/html,application/xhtml+xml
Accept-Language: zh-CN,zh;q=0.9
Accept-Encoding: gzip, deflate
```

**响应示例**：
```http
HTTP/1.0 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 1024
Content-Encoding: gzip
Cache-Control: max-age=3600

<html>...</html>
```

### HTTP/1.1 (1997年)
**背景**：HTTP/1.0存在性能问题，每个请求都需要建立新的TCP连接

**主要改进**：
1. **持久连接**：默认开启keep-alive，复用TCP连接
2. **管道化**：可以在一个连接上发送多个请求
3. **分块传输编码**：支持Transfer-Encoding: chunked
4. **更多请求方法**：PUT、DELETE、OPTIONS、TRACE
5. **Host头部**：支持虚拟主机
6. **缓存控制**：更精细的缓存机制

**新增特性详解**：

#### 持久连接
```http
# HTTP/1.0 需要显式声明
Connection: keep-alive

# HTTP/1.1 默认开启
Connection: keep-alive  # 可省略
```

#### 分块传输
```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked

5\r\n
Hello\r\n
6\r\n
 World\r\n
0\r\n
\r\n
```

### HTTP/2 (2015年)
**背景**：解决HTTP/1.1的性能瓶颈

**主要特性**：
1. **二进制协议**：不再是文本协议
2. **多路复用**：一个连接可以并发处理多个请求
3. **头部压缩**：使用HPACK算法压缩头部
4. **服务器推送**：服务器可以主动推送资源
5. **流优先级**：可以设置请求的优先级

### HTTP/3 (2022年)
**背景**：基于QUIC协议，解决TCP的队头阻塞问题

**主要特性**：
1. **基于UDP**：使用QUIC协议替代TCP
2. **内置TLS**：默认加密
3. **连接迁移**：支持网络切换时保持连接
4. **更快的握手**：0-RTT连接建立

## HTTP 请求方法

### GET
- **用途**：获取资源
- **特点**：安全、幂等、可缓存
- **参数**：通过URL传递

### POST
- **用途**：提交数据，创建资源
- **特点**：不安全、非幂等、不可缓存
- **参数**：通过请求体传递

### PUT
- **用途**：更新资源（完整更新）
- **特点**：幂等
- **示例**：更新用户信息

### PATCH
- **用途**：部分更新资源
- **特点**：非幂等
- **示例**：只更新用户的邮箱

### DELETE
- **用途**：删除资源
- **特点**：幂等
- **示例**：删除文章

### HEAD
- **用途**：获取资源的元信息
- **特点**：只返回响应头，不返回响应体
- **用例**：检查资源是否存在

### OPTIONS
- **用途**：获取服务器支持的方法
- **特点**：用于CORS预检请求
- **示例**：跨域请求前的预检

## HTTP 缓存机制

### 强缓存
**Cache-Control**：
- `max-age=3600`：缓存3600秒
- `no-cache`：需要验证缓存
- `no-store`：不缓存
- `public`：可被任何缓存存储
- `private`：只能被浏览器缓存

**Expires**：
```http
Expires: Wed, 21 Oct 2024 07:28:00 GMT
```

### 协商缓存
**Last-Modified / If-Modified-Since**：
```http
# 响应头
Last-Modified: Wed, 21 Oct 2023 07:28:00 GMT

# 请求头
If-Modified-Since: Wed, 21 Oct 2023 07:28:00 GMT
```

**ETag / If-None-Match**：
```http
# 响应头
ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"

# 请求头
If-None-Match: "33a64df551425fcc55e4d42a148795d9f25f89d4"
```

## HTTPS

### 与HTTP的区别
1. **端口**：HTTP使用80，HTTPS使用443
2. **安全性**：HTTPS使用TLS/SSL加密
3. **证书**：HTTPS需要SSL证书
4. **性能**：HTTPS有额外的加密开销

### TLS握手过程
1. **Client Hello**：客户端发送支持的加密套件
2. **Server Hello**：服务器选择加密套件并发送证书
3. **证书验证**：客户端验证服务器证书
4. **密钥交换**：生成会话密钥
5. **握手完成**：开始加密通信

## 常见面试问题

### 1. HTTP/1.1 相比 HTTP/1.0 的改进？
- 持久连接（keep-alive）
- 管道化支持
- 分块传输编码
- 更好的缓存控制
- Host头部支持

### 2. HTTP/2 的主要特性？
- 二进制协议
- 多路复用
- 头部压缩
- 服务器推送
- 流优先级

### 3. GET 和 POST 的区别？
- **用途**：GET获取数据，POST提交数据
- **参数位置**：GET在URL，POST在请求体
- **缓存**：GET可缓存，POST不可缓存
- **安全性**：GET相对不安全（参数暴露在URL）
- **幂等性**：GET幂等，POST非幂等

### 4. 什么是幂等性？
多次执行相同操作，结果相同。GET、PUT、DELETE是幂等的，POST不是。

### 5. HTTP缓存策略？
- **强缓存**：Cache-Control、Expires
- **协商缓存**：Last-Modified、ETag
- **缓存位置**：浏览器缓存、代理缓存、CDN缓存

## 最佳实践

### 1. RESTful API设计
```http
GET    /api/users        # 获取用户列表
GET    /api/users/123    # 获取特定用户
POST   /api/users        # 创建用户
PUT    /api/users/123    # 更新用户
DELETE /api/users/123    # 删除用户
```

### 2. 合理使用缓存
```http
# 静态资源长期缓存
Cache-Control: public, max-age=31536000

# API响应短期缓存
Cache-Control: private, max-age=300

# 敏感数据不缓存
Cache-Control: no-store
```

### 3. 安全头部
```http
Strict-Transport-Security: max-age=31536000
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
```

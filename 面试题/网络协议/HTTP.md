# HTTP/0.9
- 学术交流
- 超文本传输协议 用于传输类似于 html 文件资源 只能传输文本
- 客户端发送请求行信息 GET/index.html 
- 服务端读取对应的html文件 将内容以 ASCII 字符流的形式返回给客户端
- 客户端解析 ASCII 字符流 渲染成 html 页面
- 特点: 
    1. 只有请求行, 没有请求头 和 请求体
    2. 只有响应体, 没有响应头
    3. 返回的内容都是 ASCII 字符流

# HTTP/1.0
- 万维网发展迅速, 浏览器诞生, 页面要展示的内容不在局限于 html 资源, 还有 js, css, 图片, 视频, 音频 等
- 多种类型文件下载是 HTTP/1.0 的一个核心诉求, 编码方式不仅仅仅有 ASCII 编码, Base64 编码, 二进制编码等

- 面临问题:
    1. 浏览器要想办法知道服务端返回的资源是什么类型
    2. 浏览器要想办法知道服务端返回的资源使用的哪种手段压缩的
    3. 浏览器要能告诉服务端自己支持的语言版本

- 特点:
    1. 增加了请求头和响应头
      请求头: accept: text/html
             accept-encoding: gzip, deflate
             accept-language: zh-CN,zh;q=0.9
             connection: keep-alive
             host: www.baidu.com
             user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36
    
      响应头: content-encoding: gzip
             content-type: text/html; charset=utf-8
             status: 200 OK
             cache-control: max-age=604800
             host: xxxx

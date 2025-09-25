# MCP 用来做什么
 - 一套规则(协议)，是 AI 客户端与 AI 服务端的通信协议。它规定了 AI 客户端和 AI 服务端一定要按照一套标准来传输
  
  1. 前端的效能工具的开发
  2. 面试亮点

# 前置知识
- 通讯方式
 1. stdio 标准输入输出流
  - 通信效率高，简洁，但是只能在父子进程之间通信，不能在不同进程之间通信，只能在本地使用。

- 通讯格式 JSON-RPC
 1. request: {
    jsonrpc: '2.0',
    method: 'methodName',
    params: {
      param1: 'value1',
      param2: 'value2'
    },
    id: 1
 }
 
 2. response: {
    jsonrpc: '2.0',
    result: {
      data: 'response data'
    },
    id: 1
 }

- 客户端通过标准输入输出流（stdio）向服务端发送请求，必须按照 JSON-RPC 2.0 格式传递。通信流程为：客户端发送 request → 服务端接收并根据 request 中的 method 字段调用对应方法 → 方法执行完毕后将结果封装为 response 返回给客户端。这套完整的通信规范就是 MCP 协议的核心。

# MCP服务的开发
1. 技术层面
2. 使用场景

- request: {
    jsonrpc: '2.0',
    id: 1,
    method: 'initialize',
    params: {
      protocolVersion: '2025-06-18',
      capabilities: {
        roots: {
          listChanged: true
        },
        sampling: {},
        elicitation: {}
      },
      clientInfo: {
        name: 'ExampleClient',
        version: '1.0.0',
        title: 'Example Client'
      }
    }
  }

 - response: {
    jsonrpc: '2.0',
    id: 1,
    result: {
      protocolVersion: '2025-06-18',
      capabilities: {
        logging: {},
        prompts: {
          listChanged: true
        },
        resources: {
          subscribe: true,
          listChanged: true
        },
        tools: {
          listChanged: true
        }
      },
      serverInfo: { 
        name: 'ExampleServer',
        version: '1.0.0',
        title: 'Example Server'
      },
      instructions: "Optional instructions for the client"
    }
  }

- 工具发现: tools/list
 客户端得先知道服务端有哪些工具，才能调用这些工具。
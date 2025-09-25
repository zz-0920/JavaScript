import fs from 'fs';

// 服务端的所有的工具
export const tools = {
    sum({ a, b }) {
        return {
            content: [
                {
                    type: 'text',
                    text: `两数之和的结果： ${a + b}`
                }
            ]
        }
    },
    createFile({ filename, content }) {
        try {
            fs.writeFileSync(filename, content)
            return {
                content: [
                    {
                        type: 'text',
                        text: `文件创建成功`
                    }
                ]
            }
        } catch (error) {
            return false
        }
    }
}


export default {
    initialize() {
        return {
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
            id: 1,
            serverInfo: {
                name: 'ExampleServer',
                version: '1.0.0',
                title: 'Example Server'
            },
            instructions: "Optional instructions for the client"
        }
    },
    'tools/list': () => {
        return {
            tools: [
                {
                    name: 'sum',
                    title: '两数之和',
                    description: '计算两个数的和',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            a: {
                                type: 'number',
                                description: '第一个数'
                            },
                            b: {
                                type: 'number',
                                description: '第二个数'
                            }
                        }
                    }
                },
                {
                    name: 'createFile',
                    title: '创建文件',
                    description: '在指定目录下创建一个文件',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            filename: {
                                type: 'string',
                                description: '文件名'
                            },
                            content: {
                                type: 'string',
                                description: '文件内容'
                            }
                        },
                        required: ['filename', 'content']
                    }
                }
            ]
        }
    },
    sum: tools.sum,
    createFile: tools.createFile
}
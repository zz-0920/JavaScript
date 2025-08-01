import axios from 'axios'
import { Toast } from 'antd-mobile' // 使用 antd-mobile 的 Toast

axios.defaults.baseURL = 'http://47.99.49.187:3000'
// 告诉浏览器，如果发送的是 post 请求，那么后端一定会返回 json 数据，让浏览器以解析 json 的方式解析响应体
axios.defaults.headers.post['Content-Type'] = 'application/json'

// 响应拦截器
axios.interceptors.response.use(
    (response) => { // http 的状态码为 200 时才会走进第一个回调
        if (response.status === 200) {
            // 检查响应体中的 code
            if (response.data.code !== '1') {  // 逻辑性错误
                Toast.show({
                    icon: 'fail',
                    content: response.data.msg
                })
                // 创建一个包含response信息的错误对象
                const error = new Error(response.data.msg)
                error.response = response
                error.isBusinessError = true  // 标记为业务逻辑错误
                return Promise.reject(error)
            }
            return response.data
        }
    },
    // 添加错误处理函数
    async(error) => {  // 状态码不为 200 时，会走进这个回调
        console.log(error)
        // 如果是业务逻辑错误，不需要再次处理
        if (error.isBusinessError) {
            return Promise.reject(error)
        }
        
        if (error.response) {
            // 服务器返回了错误状态码
            const { status, data, config } = error.response
            
            switch (status) {
                case 401:
                    // 尝试使用refreshToken刷新accessToken
                    const refreshToken = localStorage.getItem('refreshToken')
                    
                    if (refreshToken && !config._retry) {
                        config._retry = true // 防止无限重试
                        
                        try {
                            // 调用刷新token接口
                            const refreshResponse = await axios.post('/user/refresh', {
                                refreshToken: refreshToken
                            })
                            
                            // 更新本地存储的token
                            localStorage.setItem('accessToken', refreshResponse.accessToken)
                            localStorage.setItem('refreshToken', refreshResponse.refreshToken)
                            
                            // 重新发送原始请求
                            config.headers['Authorization'] = `Bearer ${refreshResponse.accessToken}`
                            return axios.request(config)
                            
                        } catch (refreshError) {
                            // refreshToken也过期了，跳转登录页
                            Toast.show({
                                icon: 'fail',
                                content: '登录已过期，请重新登录'
                            })
                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('refreshToken')
                            localStorage.removeItem('userInfo')
                            setTimeout(() => {
                                window.location.href = '/login'
                            }, 1500)
                        }
                    } else {
                        // 没有refreshToken或已经重试过，直接跳转登录页
                        Toast.show({
                            icon: 'fail',
                            content: '登录已过期，请重新登录'
                        })
                        localStorage.removeItem('accessToken')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('userInfo')
                        setTimeout(() => {
                            window.location.href = '/login'
                        }, 1500)
                    }
                    break
                case 403:
                    Toast.show({
                        icon: 'fail',
                        content: '权限不足'
                    })
                    break
                case 404:
                    Toast.show({
                        icon: 'fail',
                        content: '请求的资源不存在'
                    })
                    break
                case 500:
                    Toast.show({
                        icon: 'fail',
                        content: '服务器内部错误'
                    })
                    break
                default:
                    Toast.show({
                        icon: 'fail',
                        content: data?.msg || '请求失败'
                    })
            }
        } else if (error.request) {
            // 网络错误
            Toast.show({
                icon: 'fail',
                content: '网络连接失败'
            })
        } else {
            // 其他错误
            Toast.show({
                icon: 'fail',
                content: '请求配置错误'
            })
        }
        
        return Promise.reject(error)
    }
)

// 请求拦截器
axios.interceptors.request.use(
    (request) => {
        // 从 localStorage 中获取 token
        const accessToken = localStorage.getItem('accessToken')
        if (accessToken) {
            // 如果有 token，添加到请求头
            request.headers['Authorization'] = `Bearer ${accessToken}`
        }
        return request
    }
)

export default axios
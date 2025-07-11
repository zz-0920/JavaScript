import React, { useState, createContext, useContext } from 'react'

const myContext = createContext()

function A() {
    const {msg, setMsg} = useContext(myContext)
    return (
        <div>
            <h2>我是A组件,我接受的消息是: {msg}</h2>
            <B />
        </div>
    )
}

function B() {
    const {msg, setMsg} = useContext(myContext)
    return (
        <div>
            我是B组件, 我收到的消息是: {msg}
        </div>
    )
}


export default function index() {
    const [msg, setMsg] = useState('Index 组件中的数据')
    return (
        <div>
            <myContext.Provider value={{msg, setMsg}}>
                <A />
            </myContext.Provider>
        </div>
    )
}
// 总结
// 1. 创建 Context 组件
// 2. 在需要传递数据的组件中使用 Context.provider 包裹需要传递的数据
// 3. 在需要获取数据的组件中使用 useContext 函数获取 Context 中的数据
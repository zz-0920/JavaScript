import React, { useState, useRef } from 'react'
import Child from './Child'


export default function Parent() {
    const [list, setList] = useState(['HTML', 'CSS', 'JavaScript'])
    const inputRef = useRef(null)
    const handler = () => {
        const value = inputRef.current.value
        if (!value){
            return alert('请输入内容')
        }
        setList([...list, value])
    }
    return (
        <div>
            <div className="hd">
                <input type="text" ref={inputRef} />
                <button onClick={handler}>确认</button>
            </div>
            <Child list={list} />
        </div>
    )
}

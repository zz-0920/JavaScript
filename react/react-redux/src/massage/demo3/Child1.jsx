import { useRef } from 'react'

export default function Child1({ list, setList }) {
    const inputRef = useRef(null)

    const handler = () => {
        const value = inputRef.current.value
        if (!value) {
            return alert('请输入内容')
        }
        setList([...list, value])
    }
    
    return (
        <div className="hd">
            <input type="text" ref={inputRef} />
            <button onClick={handler}>确认</button>
        </div>
    )
}
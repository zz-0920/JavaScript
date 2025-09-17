import useListStore from '../store/index.js'
import { useRef } from 'react'

export default function Head() {
    const { addData } = useListStore()
    const inputRef = useRef(null)
    return (
        <div>
            <input type="text" ref={inputRef} defaultValue={'react'}/>
            <button onClick={() => addData(inputRef.current.value)}>Add</button>
        </div>
    )
}
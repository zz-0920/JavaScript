import { useState } from "react"

function App2() {
    const [value, setValue] = useState('hello')
    // console.log('组件渲染');
    
    function onChange(e) {
        console.log(e.target.value)
        setValue(e.target.value.toUpperCase())
    }

    return (
        <input type="text" value={value} onChange={onChange}/>
    )
}

export default App2
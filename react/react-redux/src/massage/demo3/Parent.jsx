import { useState } from 'react'
import Child1 from './Child1'
import Child2 from './Child2'

export default function Parent() {
    const [list, setList] = useState(['html', 'css', 'js'])
    
    return (
        <div>
            <Child1 list={list} setList={setList} />
            <Child2 list={list} />
        </div>
    )
}
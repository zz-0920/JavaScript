import { useState } from 'react'
import Child from './Child'

export default function Parent() {
    const [list, setList] = useState(['html', 'css', 'js'])

    return (
        <div>
            <Child list={list} setList={setList} />
            <div className="bd">
                <ul>
                    {
                        list.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}
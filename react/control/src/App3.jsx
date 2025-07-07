import { useEffect, useState } from 'react'

async function queryDate() {
    const date = await new Promise((resolve) => {
        setTimeout(() => {
            resolve(666)
        }, 2000)
    })
    return date
}

function App3() {
    const [num, setNum] = useState(0)

    useEffect(() => {
        queryDate().then(data => {
            setNum(data)
        })
    }, [])
    return (
        <div onClick={() => {
            setNum((preNum) => preNum + 1)
        }}>{num}</div>
    )
}

export default App3
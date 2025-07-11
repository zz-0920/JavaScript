import { useSelector, useDispatch } from 'react-redux'
import { add, addList } from '../../store/modules/counterStore'
import { useRef } from 'react'

export default function index() {
    // 使用数据
    let { count, list } = useSelector(state => state.counter)
    // 调用仓库里面的方法
    const dispatch = useDispatch() // 触发器

    const addCount = () => {
        // 调用仓库里面 add 方法
        dispatch(add())
    }

    const inputRef = useRef(null)

    return (
        <div>
            {/* <h3>{count}</h3>
            <button onClick={addCount}>+</button> */}
            <input type="text" ref={inputRef} />
            <button onClick={() => {
                dispatch(addList(inputRef.current.value))
                inputRef.current.value = ""
            }}>添加</button>
            <ul>
                {
                    list.map((item, index) => {
                        return <li key={index}>{item}</li>
                    })
                }
            </ul>
        </div>
    )
}

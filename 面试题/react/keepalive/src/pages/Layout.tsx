import { Link, useLocation } from "react-router-dom"
import { useKeepAlive } from "../KeepAlive"

export default function Layout() {
    const location = useLocation()
    const element = useKeepAlive()
    return (
        <div>
            <Link to="/home">首页</Link>
            <Link to="/about">关于</Link>
            <div>当前路由：{location.pathname}</div>
            {element}
        </div>
    )
}
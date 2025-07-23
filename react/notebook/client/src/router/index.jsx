import { BrowserRouter, Navigate, useRoutes } from 'react-router'
import React from 'react'

const Login = React.lazy(() => import('../Pages/Login/index.jsx'))
const Routers = [
    {
        path: '/',
        element: <Navigate to='/noteClass' />
    },
    {
        path: '/login',
        element: <Login />
    }
]

// 内部路由组件
function AppRoutes() {
    // useRoutes 这个 Hook 函数只能用在路由组件中，也就是说，该组件不能被抛出
    return useRoutes(Routers)
}

// 外层包装组件
export default function WrapperRouter() {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    )
}

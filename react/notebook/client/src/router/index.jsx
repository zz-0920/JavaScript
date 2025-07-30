import { BrowserRouter, Navigate, useRoutes } from 'react-router'
import React from 'react'

const Login = React.lazy(() => import('../Pages/Login/index.jsx'))
const NoteClass = React.lazy(() => import('../Pages/NoteClass/index.jsx'))
const Register = React.lazy(() => import('../Pages/Register/index.jsx'))
const NoteList = React.lazy(() => import('../Pages/NoteList/index.jsx'))
const NoteDetail = React.lazy(() => import('../Pages/NoteDetail/index.jsx'))
const NotePublish = React.lazy(() => import('../Pages/NotePublish/index.jsx'))

const Routers = [
    {
        path: '/',
        element: <Navigate to='/noteClass' />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/noteClass',
        element: <NoteClass />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/noteList',
        element: <NoteList />
    },
    {
        path: '/noteDetail',
        element: <NoteDetail />
    },
    {
        path: '/notePublish',
        element: <NotePublish />
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

import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Layout from './pages/Layout'
import KeepAlive from './KeepAlive'

const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      }
    ]
  }
]

const router = createBrowserRouter(routes)

export default function App() {
  return (
    <div>
      <KeepAlive keepPath={['/home','/about']}>
        <RouterProvider router={router} />
      </KeepAlive>
    </div>
  )
}

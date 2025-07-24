import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import App from './App.jsx'
import 'lib-flexible/flexible.js'
import { unstableSetRender } from 'antd-mobile' // Support since version ^5.40.0

// 配置 antd-mobile 使用 React 19 的渲染方式
unstableSetRender((node, container) => {
  if (!container._reactRoot) {
    container._reactRoot = createRoot(container)
  }
  const root = container._reactRoot
  root.render(node)
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    root.unmount()
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

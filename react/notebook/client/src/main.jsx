import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.less'
import App from './App.jsx'
import 'lib-flexible/flexible.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

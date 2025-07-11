import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// 引入总仓库
import store from './store/index'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
)

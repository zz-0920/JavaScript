import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/home/Home.tsx'
import Question from './pages/question/index.tsx'
import Result from './pages/result/index.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/question' element={<Question />} />
        <Route path='/result' element={<Result />} />
      </Routes> 
    </BrowserRouter>
  )
}

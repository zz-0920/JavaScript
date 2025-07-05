import React from 'react'
import Login from './views/login/Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import MainLayout from './views/layout/Layout';
import Home from './views/home/index'
import Info from './views/info/index'
import Score from './views/score/index'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/layout' element={<MainLayout/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='info' element={<Info/>}></Route>
          <Route path='score' element={<Score/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

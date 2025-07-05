import Home from "./views/Home";
import About from "./views/About";
import User from "./views/User";
import {BrowserRouter,Route,Routes,Link} from "react-router-dom";


function App() {
  return (
    <div>
      <h2>hello</h2>
      <BrowserRouter>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

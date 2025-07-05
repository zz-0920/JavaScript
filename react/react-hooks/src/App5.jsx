import { createContext, useContext } from "react"

function Child2() {
  const count = useContext(numContext)
  return (
    <div>
      <h3>孙子组件 --- {count}</h3>
    </div>
  )
}


function Child1() {
  
  return (
    <div>
      <h2>子组件</h2>
      <Child2/>
    </div>
  )
}


const numContext = createContext()
function App() {
  const num = 100

  return (
    <div>
      <numContext.Provider value={num}>
        <h1>父组件</h1>
        <Child1/>
      </numContext.Provider>
    </div>
  )
}

export default App;
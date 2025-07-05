
import { useEffect, useState } from "react";

// 模拟一个接口请求函数
async function queryData() {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(666)
    }, 2000)
  })
  return data
}

function App() {
  let [num, setNum] = useState(1) // [1, func]
  const [age, setAge] = useState(18)

  // useEffect(() => {
  //   console.log('useEffect');
  //   queryData().then(data => {
  //     setNum(data)
  //   })
  // }, [age])

  useEffect(() => {
    console.log('useEffect');
    let timer = setInterval(() => {
      console.log(num);
    }, 1000)

    return () => {
      console.log('组件卸载');
      clearInterval(timer)
    }
    
  }, [num])

  
  function handle() {
    // num++  // num 改了但是无法触发视图更新
    setNum(num + 1) // 将 num 修改为 参数值，并触发视图更新
    console.log(num);
  }
    
  return (
    <div>
      <button onClick={(pre) => setNum(pre + 1)}>{num}</button>
      <h2 onClick={() => setAge(age + 1)}>{age}</h2>
    </div>
  )
}
export default App;





// import { Component } from "react";
// class App extends Component {
//   render() {
//     return (
//       <h1>hello</h1>
//     )
//   }
// }
// export default App;
// JSX -- 将 HTML 写在 JS 中
import './App.css';
import List from './components/List';
// function App() {
//   const name = 'zz';
//   const songs = [
//     { id: 1, name: '素颜' },
//     { id: 2, name: '晴天' },
//     { id: 3, name: '告白气球' },
//     { id: 4, name: '成都' },
//     { id: 5, name: '平凡之路' }
//   ];
//   const flag = true;
//   const styleObj = {
//     color: 'red'
//   }
//   return (
//     <div className="App">
//       <h1>hello {name}!</h1>
      
//       {/* <ul>
//         {
//           songs.map((item) => {
//             return <li key={item.id}>{item.id} - {item.name}</li>
//           })
//         }
//       </ul> */}
      
//       {/* <h3>{flag ? 'react 真有意思! ' : ' react 真难! '}</h3>
//       <div>{flag ? <span>react 真有意思!</span> : null}</div> */}
      
//       {/* <div style={{ color: 'pink' }}>zz最帅</div>
//       <div style={styleObj}>iyu不服</div>
//       <div className="person">华说你们都不行</div> */}

//       <div className={flag ? 'title' : ''}>胡总要试驾小米</div> {/* 三元运算符动态添加类名 */}
//     </div>
//   );
// }

// export default App;

function App() { // 根组件 父组件
  const songs = [
    { id: 1, name: '素颜' },
    { id: 2, name: '晴天' },
    { id: 3, name: '告白气球' },
    { id: 4, name: '成都' },
    { id: 5, name: '平凡之路' }
  ];
  return (
    <div>
      <h1>hello zz!</h1>
      {/* 列表组件 */}
      <List data={songs} />
    </div>
  )
}

export default App;
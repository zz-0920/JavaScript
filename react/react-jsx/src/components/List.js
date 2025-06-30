function List(props) { // 子组件
  console.log(props);
  return(
    <ul>
      {
        props.data.map(item => <li key={item.id}>{item.id} - {item.name}</li>)
      }
    </ul>
  )
}
export default List;

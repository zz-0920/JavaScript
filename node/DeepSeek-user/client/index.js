// 页面初次加载时，先获取用户信息，展示在页面上
window.onload = async function() {
  const users = await fetchUsers('all')
  renderUsers(users)
}

async function fetchUsers(name) {  // 获取用户信息
  // 向后端发送请求，获取用户信息
  const res = await fetch(`http://localhost:3000/api/users?name=${name}`)  // 接口地址
  const users = await res.json()  // 解析返回的 JSON 数据
  console.log(users);
  
  return users.data
}

function renderUsers(users) {  // 渲染用户信息
  const tbody = document.querySelector('tbody')
  tbody.innerHTML = ''  // 清空表格内容
  for (let i = 0; i < users.length; i++) {
    const tr = document.createElement('tr')
    tr.innerHTML = `
      <td>${users[i].id}</td>
      <td>${users[i].name}</td>
      <td>${users[i].age}</td>
      <td>${users[i].address}</td>
      `
    tbody.appendChild(tr)
  }
}


// 输入姓名，点击查询按钮，查询用户信息
// 给按钮添加点击事件
const btn = document.querySelector('.search-container button')
const input = document.querySelector('#nameSearch')
btn.addEventListener('click', async() => {
  // 获取输入框的值
  // 向后端发送请求，将输入框的值作为参数传递
  const users = await fetchUsers(input.value)
  console.log(users);
  renderUsers(users)
})
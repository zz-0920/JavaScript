// 页面初次加载时，先获取用户信息，展示在页面上
window.onload = function() {
  fetchUsers();
}

async function fetchUsers() { // 获取用户信息
    // 向后端发送请求，获取用户信息
    const res = fetch(`http://localhost:3000/api/users`) // 后端接口地址
    console.log(res)
}
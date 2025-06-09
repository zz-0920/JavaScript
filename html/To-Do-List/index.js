// 当用户点击提交按钮时，执行以下操作
// 1. 获取用户输入内容
// 2. 将内容添加到 ul 列表中
//    监听提交按钮点击事件
//    获取 form 表单元素
const form = document.querySelector('.form');
const input = document.querySelector('.form_input');
const ul = document.querySelector('.todo-list');

const toDoListArray = [];  // 存储待办事项的数组


form.addEventListener('submit', function (e) {  // 用户点击提交
  e.preventDefault();  // 阻止表单默认提交行为

  let itemId = String(Date.now());  // 生成一个唯一的 id
  let toDoItem = input.value;  // 获取用户输入的内容

  // 有一个函数，可以帮我把内容调价进数组
  // 再有一个函数，将数组进行渲染
  addItemToArray(itemId, toDoItem);
  addItemToDom(itemId, toDoItem);
})

function addItemToArray (id, item) {
  toDoListArray.push({
    itemId: id,
    todoItem: item
  })
}

function addItemToDom (id, item) {
  const li = document.createElement('li');
  li.textContent = item;
  li.setAttribute('data-id', id);
  ul.appendChild(li);
}

// 移除待办事项
ul.addEventListener('click', function(e) {
  console.log(e.target.getAttribute('data-id'));
  // 获取到被点击的 li 元素，并且读取它的 data-id 属性
  // 根据这个 id 从数组中删除对应的元素
  // 从页面中删除对应的 li 元素
  const itemId = e.target.getAttribute('data-id');
  removeItemFromArray(itemId);
  removeItemFromDom(itemId);
})

function removeItemFromArray (id) {
  for (let i = 0; i < toDoListArray.length; i++) {
    if (toDoListArray[i].itemId === id) {
      toDoListArray.splice(i, 1);
      break;
    }
  }
}

function removeItemFromDom (id) {
  // 根据 data-id 属性找到对应的 li 元素
  const itemToRemove = document.querySelector(`li[data-id="${id}"]`);
  // 如果找到了元素，就从DOM中删除它
  if (itemToRemove) {
    itemToRemove.remove();
  }
}
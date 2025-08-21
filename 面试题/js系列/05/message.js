var obj = {
  name: '刘洋',
  age: 18,
  like: ['篮球', '足球'],
  a: undefined,
  b: null,
  c: 123n
}


function deepClone(obj) {
  return new Promise((resolve) => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(obj)
    port2.onmessage = (msg) => {
      resolve(msg.data)
    }
  })
}


deepClone(obj).then(res => {
  obj.like.push('跑步')
  console.log(res);
})

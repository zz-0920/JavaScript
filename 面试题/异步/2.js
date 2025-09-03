function A() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('A')
      resolve('ok')
    }, 1000)
  })
}
function B() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('B')
      resolve('okb')
    }, 500)
  })
}

A()
.then((res) => {
  console.log(res);
  return 'hello'
})
.then((res2) => {
  console.log(res2);
})



// function request(url) {
//   return new Promise((resolve, reject) => {
//     const XHR = new XMLHttpRequest()
//     XHR.open('GET', url)
//     XHR.send()
//     XHR.onreadystatechange = function () {
//       if (XHR.readyState === 4) {
//         if (XHR.status === 200) {
//           resolve(XHR.responseText)
//         } else {
//           reject(XHR.status)
//         }
//       }
//     }
//   })
// }

// request('https://www.baidu.com').then((res) => {
//   console.log(res)
// })
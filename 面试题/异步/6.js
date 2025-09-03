function A() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('A')
      reject('A failed')
    }, 1000)
  })
}

A()
.finally((res) => {
  console.log(res, 'finally')
  return 'hello'
})
.catch((res) => {
  console.log(res, 'then')
})
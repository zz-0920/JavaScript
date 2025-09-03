function A() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('A')
      reject('A failed')
    }, 1000)
  })
}
function B() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('B')
      reject('B failed')
    }, 500)
  })
}
function C() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('C')
      reject('C failed')
    }, 1500)
  })
}

Promise.allSettled([A(), B(), C()])
.then((res) => {
  console.log(res)
})

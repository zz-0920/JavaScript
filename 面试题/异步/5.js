function request() {
  let result = null
  // xxxxx().then((res) => {
  //   result = res.data
  // })

  if (result) {
    return Promise.resolve(result)
  }
}

request().then(data => {
  console.log(data)
})



Promise.resolve('ok')
.then((res) => {
  console.log(res)
})
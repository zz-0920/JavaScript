function A() {
  return new Promise((resolve, reject) => {
    console.log('A');
    resolve('A is ok')
  })
}
function B() {
  console.log('B');
}


function handle(res) {
  console.log(res);
  B()
  return 'B is ok'
}

A()
.then(handle)
.then((res) => {
  console.log(res);
})


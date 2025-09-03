function A() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('A')
      resolve('ok')
    }, 1000)
  })
}
function B() {
  console.log('B')
}

async function foo() {  // *
  await A()   // yield A()
  await B()
  await C()
}
foo()


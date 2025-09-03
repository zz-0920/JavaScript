function A() {
  try {
    setTimeout(() => {
      console.log('A')
      B()
    }, 1000)
  } catch (error) {
    console.log('A错误', error)
  }
}
function B() {
  setTimeout(() => {
    console.log('B')
  }, 500)
}
A()


const arr = [1, 2, 3, 4, 5]
simpleForOf(arr, (item) => {
  console.log(item)
})
function simpleForOf(arr, callback) {
  const iter = arr[Symbol.iterator]()
  let res = iter.next()
  while (!res.done) {
    callback(res.value)
    res = iter.next()
  }
}
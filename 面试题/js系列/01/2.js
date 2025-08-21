const arr = ['a', 'b', 'c', 'd']

try {
  arr.forEach((item, index, array) => {
    if (item == 'c') {
      throw new Error('结束')
    }
    console.log(item);
  })
} catch (error) {
  console.log(error.message);
}

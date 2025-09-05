function ajax() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.floor(Math.random() * 10)
      if (random < 8) {
        console.log('失败');
        reject('失败')
      } else {
        resolve('成功拿到数据')
      }
    }, 1000)
  })
}

function retry(fn, count) {
  let times = 1
  return new Promise((resolve, reject) => {
    const repeat = () => {
      fn()
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          times++
          
          if (times > count) {
            reject(err)
          } else {
            repeat()
          }
          
        })
    }
    repeat()
  })

}


retry(ajax, 3)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
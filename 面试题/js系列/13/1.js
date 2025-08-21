console.log(1);
setTimeout(() => {
  console.log(2);
  setTimeout(() => {
    console.log(6);
  }, 0);
  new Promise((resolve, reject) => {
    console.log(7);
    resolve();
  }).then(() => {
    console.log(8);
  })


}, 0);
new Promise((resolve, reject) => {
  console.log(3);
  resolve();
}).then(() => {
  console.log(4);
})
console.log(5);


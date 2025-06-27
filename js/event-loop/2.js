console.log(1);
new Promise((resolve) => {
  console.log(2);
  resolve();
})
  .then(() => {
    console.log(3);
    setTimeout(() => {
      console.log(4);
    }, 0);
  });

setTimeout(() => {
  console.log(5);
  setTimeout(() => {
    console.log(6);
  }, 0);
}, 0);
console.log(7);
// 1 2 7 3 5 4 6 
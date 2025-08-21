// function add() {
//   let count = 0
//   return function() {
//     count++
//     console.log(count);
//   }
// }

// const res = add()
// res() // 1
// res() // 2
// res() // 3

// 
function getArea(width) {
  return (height) => {
    return width * height
  }
}
// 颗粒化 柯里化 
const getTenWidthArea = getArea(10)
const area1 = getTenWidthArea(20)
const area2 = getTenWidthArea(30)
const area3 = getTenWidthArea(40)



// const area1 = getArea(10, 20)
// const area2 = getArea(10, 30)
// const area3 = getArea(10, 40)

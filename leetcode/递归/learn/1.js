// 5! === 5 * 4 * 3 * 2 * 1
function mul(n){
    let res = 1
    for(let i = n; i >= 1; i--){
        res *= i
    }
    return res
}

// 5! === 5 * 4! = 120
// 4! === 4 * 3! = 24
// 3! === 3 * 2! = 6
// 2! === 2 * 1! = 2
// 1! === 1 * 0! = 1
// 0! === 1

// n! === n * (n - 1)!
// 递归
function factorial(n) {
  if (n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}
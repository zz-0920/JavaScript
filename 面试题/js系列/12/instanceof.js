function myInstanceof(L, R) {
  // L.__proto__ === R.prototype
  // L.__proto__.__proto__ === R.prototype
  // L.__proto__.__proto__.__proto__ === R.prototype

  if (typeof L !== 'object') {
    return false
  }
  while(L) {  // new Number(1)
    if (L.__proto__ === R.prototype) {
      return true
    }
    L = L.__proto__
  }
  return false
}

// myInstanceof([], Array)
// myInstanceof([], Object)

console.log(myInstanceof(1, Object));

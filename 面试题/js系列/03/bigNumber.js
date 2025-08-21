const a = '1232876542313425'
const b = '9000007654231236'

function add(n, m) {
  const strm = m.toString()
  const strn = n.toString()
  let lenm = strm.length
  let lenn = strn.length
  if (lenm > lenn) {
    n.padStart(lenm, '0')
  } else {
    m.padStart(lenn, '0')
  }

  let carry = 0, res = ''
  for (let i = lenm - 1; i >= 0; i--) {
    const num = Number(strm[i]) + Number(strn[i]) + carry
    carry = Math.floor(num / 10)
    res = (num % 10) + res
  }
  if (carry) {
    res = '1' + res
  }
  return +res
}

console.log(add(n, m));

let n = 1231234234235434523;
let m = 1232323;

var addTwoBigInt = function (n, m) {
    let strn = n.toString()
    let strm = m.toString()
    console.log(strn, strm)
    let len = Math.max(strn.length, strm.length)
    strn = strn.padStart(len, '0')
    strm = strm.padStart(len, '0')
    console.log(strn, strm)
    for (let i = len - 1; i >= 0; i--) {
        let sum = Number(strn[i]) + Number(strm[i])
        if (sum >= 10) {
            strn[i -1] = Number(strn[i -1]) + 1
            strn[i] = sum % 10
        }
        else strn[i] = sum
    }
    return strn

}
console.log(addTwoBigInt(n, m))

let str = 'hello,world'
console.log(str.search('world'))
console.log(str.search('hello'))
console.log(str.search('ll'))

var isHappy = function (n) {
    let set = new Set()
    while (true) {
        let str = n.toString(), sum = 0
        for (let i = 0; i < str.length; i++) {
            let num = parseInt(str[i], 10)
            sum += num ** 2
        }
        if (sum === 1) return true
        if (set.has(sum)) return false
        set.add(sum)
        n = sum
    }
};
console.log(isHappy(19))
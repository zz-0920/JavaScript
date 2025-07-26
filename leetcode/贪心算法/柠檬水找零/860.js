var lemonadeChange = function(bills) {
    let rest = new Map([[5, 0], [10, 0]]);
    for (let i = 0; i < bills.length; i++) {
        if (bills[i] === 5) rest.set(5, rest.get(5) + 1);
        else if (bills[i] === 10) {
            if (rest.get(5) < 1) return false;
            rest.set(5, rest.get(5) - 1);
            rest.set(10, rest.get(10) + 1);
        }
        else {
            if (rest.get(5) < 1) return false;
            rest.set(5, rest.get(5) - 1);
            if (rest.get(10) > 0) {
                rest.set(10, rest.get(10) - 1);
            } else {
                if (rest.get(5) < 2) return false;
                rest.set(5, rest.get(5) - 2);
            }
        }
    }
    return true
};
let bills = [5, 5, 5, 10, 20]
console.log(lemonadeChange(bills));

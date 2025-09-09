const oldNum = 1234567890.123455 // 1,234,567,890.123455

function formatNum(num) {
    // let str = num.toString();
    // let parts = str.split('.');
    // parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    // return parts.join('.');
    let str = new String(num);
    let intPart = str.split('.')[0];
    let floatPart = str.split('.')[1];
    let intPartArr = intPart.split('').reverse();
    let intPartArrNew = [];
    for (let i = 0; i < intPartArr.length; i++) {
        if (i > 0 && i % 3 === 0) {
            intPartArrNew.push(',');
        }
        intPartArrNew.push(intPartArr[i]);
    }
    let intPartNew = intPartArrNew.reverse().join('');
    let floatPartNew = floatPart ? '.' + floatPart : '';
    return intPartNew + floatPartNew;
}

console.log(formatNum(oldNum)); // 1,234,567,890.123455

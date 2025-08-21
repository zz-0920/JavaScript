// String({a: 1})
// ToPrimitive({a: 1}, String)
// {a: 1}.toString()   // '[object Object]'

// Number({a: 1})
// ToPrimitive({a: 1}, Number)
// {a: 1}.valueOf()
// {a: 1}.toString()  // '[object Object]'
// ToNumber('[object Object]')  // NaN


// '3' - '1'
// Number('3') - Number('1')

// [1, 2] - {a: 1}
// Number([1, 2]) - Number({a: 1})
// ToPrimitive([1, 2], Number) - ToPrimitive({a: 1}, Number)
// '1,2' - '[object Object]'
// NaN - NaN


[] == ![]
// [] == !true
// [] == false
// [] == 0
// '' == 0
// 0 == 0
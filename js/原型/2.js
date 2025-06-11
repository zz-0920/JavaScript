// Person.prototype.say = function() {
//     console.log('hello')
// }

// function Person() {
//     this.name = 'zz'
// }

// const p1 = new Person()
// // p1.say()
// console.log(p1); // 显式拥有 name 属性，隐式拥有 say 属性

// p1.say = 'hello'
// delete p1.say
// console.log(p1.say()); // 报错

function Bus() {

}
Car.prototype = {
    constructor: Bus
}
function Car() {
    this.name = 'su7'
}
const car = new Car()
console.log(car.constructor); // 函数本身  从构造函数原型上继承来的
// constructor 的存在是为了让所有的实例对象都知道自己是从哪个构造函数创建的
// console.log(car.__proto__); // 函数的原型
// console.log(car.__proto__ === Car.prototype); // true

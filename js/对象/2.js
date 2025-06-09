// function add(a, b) {
//     return a + b;
// }

// const sum = add(1, 2);
// console.log(sum);

// 构造函数
// function Car(color) {
//     this.name = 'BMW';
//     this.height = '1.8';
//     this.lang = '4';
//     this.weight = 1000;
//     this.color = color
// }

// var car1 = new Car('pink'); // 实例化一个对象
// var car2 = new Car('red');
// car1.name = 'Audi';

// console.log(car1);
// console.log(car2);

function Person(name, age, sex) {
    var _this = {}
    _this.name = name;
    _this.age = age;
    _this.sex = sex;
    return _this;
}
function Person(name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

var p1 = new Person('zz', 18, '男');

console.log(p1);
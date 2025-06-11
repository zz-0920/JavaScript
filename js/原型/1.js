Car.prototype.name = 'su7'
Car.prototype.height = 1.4
Car.prototype.weight = 1.5
Car.prototype.long = 4800

function Car(color) {
    // this.name = 'su7'
    // this.height = 1.4
    // this.weight = 1.5
    // this.long = 4800
    this.color = color
}

const car = new Car('orange')
const car2 = new Car('red')
console.log(car.name)
console.log(car2.height)

// 函数天生拥有一个属性 prototype,是一个对象


function Person() {
    // var obj = {}
    // Person.call(obj)
    this.name = 'zz'
    this.age = 20
    console.log(this);
    // obj.__proto__ = Person.prototype
    // return obj
}
const p = new Person()
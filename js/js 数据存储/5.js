function foo(person){
    person.age = 18;
    person = {
        name: 'zz',
    }
    return person;
}
let p1 = {
    name: 'zs',
    age: 20,
}
p2 = foo(p1);
console.log(p1);
console.log(p2);
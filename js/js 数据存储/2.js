// 引用类型
let obj = {
    name: 'zs',
    age: 18,
    sex: 'male',
    health: 100,
    smoke: function(){
        console.log('来根华子');
        this.health -= 10;
    },
    drink: function(){
        console.log('来瓶台子');
        this.health += 10;
    }
}

console.log(obj);
delete obj.smoke; // 删除对象的属性

let obj1 = new Object({
    name: 'zz',
    age: 18,
    sex:'male',
    health: 100,
    smoke: function(){
        console.log('来根华子');
        this.health -= 10;
    },
    drink: function(){
        console.log('来瓶台子');
        this.health += 10;
    }
});
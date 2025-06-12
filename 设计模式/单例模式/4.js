class SingleDog {
    show() {
        console.log('我是单身狗');
    }
}
SingleDog.getInstance = (function(){
    let instance = null
    return function(){
        if(!instance){
            instance = new SingleDog()
        }
        return instance
    }
})()
let dog1 = SingleDog.getInstance()
let dog2 = SingleDog.getInstance()
console.log(dog1 === dog2);
// 要能判断自己是否是第一次实例化
// 要能返回一个实例
class SingleDog {
    show() {
        console.log('我是单身狗');
    }
    static getInstance() {
        if (!SingleDog.instance) {
            SingleDog.instance = new SingleDog()
        }
        return SingleDog.instance
    }
}
let dog1 = SingleDog.getInstance()
let dog2 = SingleDog.getInstance()
console.log(dog1 === dog2);

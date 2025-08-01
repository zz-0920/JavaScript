class EventEmitter {
    constructor() {
        this.eventList = {}
    }

    on(eventName, callBack) {
        if (!this.eventList[eventName]) {
            this.eventList[eventName] = [];
        }
        this.eventList[eventName].push(callBack)
    }

    emit(eventName) {
        if (this.eventList[eventName]) {
            const callBacks = this.eventList[eventName].slice()
            callBacks.forEach((item) => {
                item()
            })
        }
    }

    off(eventName, callBack) {
        if (this.eventList[eventName]) {
            this.eventList[eventName] = this.eventList[eventName].filter((item) => {
                return item !== callBack
            })
        }
    }

    once(eventName, callBack) {
        let onceCallBack = () => {
            callBack()
            this.off(eventName, onceCallBack)
        }
        this.on(eventName, onceCallBack)
        // this.off(eventName, callBack)
    }
}

let _event = new EventEmitter()

function event1() {
    console.log('事件1')
}

function event2() {
    console.log('事件2')
}

function event3() {
    console.log('事件3')
}

_event.on('hasHouse', event1)
_event.on('hasHouse', event2)
// _event.off('hasHouse', event1)

_event.on('hasCar', event3)



_event.emit('hasHouse') // 发布行为 => 触发事件
// _event.emit('hasCar') // 发布行为 => 触发事件
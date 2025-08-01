function fnA() {
    setTimeout(() => {
        console.log('A');
        _event.emit('next')
    }, 1000)
}

function fnB() {
    setTimeout(() => {
        console.log('B');
    }, 500)
}

class EventEmitter {
    constructor() {
        this.eventList = {}
    }

    on(eventName, callback) {
        if (!this.eventList[eventName]) {
            this.eventList[eventName] = []
        }
        this.eventList[eventName].push(callback)
        // this.eventList[eventName] ? this.eventList[eventName].push(callback) : this.eventList[eventName] = [callback]
    }

    off(eventName, callback) {
        const callbacks = this.eventList[eventName]
        const index = callbacks.indexOf(callback)
        if (index !== -1) {
            callbacks.splice(index, 1)
        } 
    }

    once(eventName, callback) {
        const wrap = () => {
            callback()
            this.off(eventName, wrap)
        }
        this.on(eventName, wrap)
    }

    emit(eventName) {
        if (this.eventList[eventName]) {
            const handlers = this.eventList[eventName].slice() // 浅拷贝
            handlers.forEach(item => {
                item()
            })
        }
    }
}

let _event = new EventEmitter()

fnA()
_event.on('next', fnB)

// fnA()
// fnB()

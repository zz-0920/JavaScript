var MyQueue = function() {
    this.inStack = [];
    this.outStack = [];
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.inStack.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    if (!this.outStack.length) {
        this.in2out();
    }
    return this.outStack.pop();
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    if (!this.outStack.length) {
        this.in2out();
    }
    return this.outStack[this.outStack.length - 1];
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return this.outStack.length === 0 && this.inStack.length === 0;
};

MyQueue.prototype.in2out = function() {
    while (this.inStack.length) {
        this.outStack.push(this.inStack.pop());
    }
};
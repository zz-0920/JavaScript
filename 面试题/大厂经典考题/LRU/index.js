/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
    this.cache = new Map()
    this.capacity = capacity
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
  if (this.cache.has(key)) {
    const temp = this.cache.get(key)
    this.cache.delete(key)
    this.cache.set(key, temp)
    return temp
  }
  return -1
};
/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if (this.cache.has(key)) {
        this.cache.delete(key)
    }
    this.cache.set(key, value)
    if (this.cache.size > this.capacity) {
        this.cache.delete(this.cache.keys().next().value)
    }
};

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
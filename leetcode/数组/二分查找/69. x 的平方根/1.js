var mySqrt = function(x) {
    let right = x, left = 0
    while (right >= left) {
        let mid = Math.floor((right + left) / 2)
        if ((mid * mid) === x) return mid
        else if ((mid * mid) > x) right = mid - 1
        else left = mid + 1
    }
    return right
};
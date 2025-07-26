var candy = function(ratings) {
    const n = ratings.length;
    const candies = new Array(n).fill(1);
    
    // 第一次遍历：从左到右，处理左约束
    for (let i = 1; i < n; i++) {
        if (ratings[i] > ratings[i-1]) {
            candies[i] = candies[i-1] + 1;
        }
    }
    
    // 第二次遍历：从右到左，处理右约束
    for (let i = n-2; i >= 0; i--) {
        if (ratings[i] > ratings[i+1]) {
            candies[i] = Math.max(candies[i], candies[i+1] + 1);
        }
    }
    
    return candies.reduce((sum, candy) => sum + candy, 0);
};
let ratings = [1,2,3,4,4,5,6,5,4,3,2,1,7,1,1,1,1];
console.log(candy(ratings));
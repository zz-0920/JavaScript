let temperatures = [73,74,75,71,69,72,76,73]

var dailyTemperatures = function(temperatures) {
    for(let i = 0; i < temperatures.length; i++){
        for(let j = i + 1; j < temperatures.length; j++){
            if(temperatures[j] > temperatures[i]){
                temperatures[i] = j - i
                break
            }
            if(j === temperatures.length - 1){
                temperatures[i] = 0
            }
        }
    }
}
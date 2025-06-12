var backspaceCompare = function(s, t) {
    function processString(str){
        let arr = []
        for (let i = 0; i < str.length; i++) {
            if (str[i] !== '#') arr.push(str[i])
            else {
                if (arr.length > 0) {
                    arr.pop()
                }
            }
        }
        return arr.join('')
    }
    return processString(s) === processString(t)
}
// var reverseString = function(s) {
//     for(let i = 0; i <(s.length / 2); i++) {
//         [s[i], s[s.length - i - 1]] = [s[s.length - i - 1], s[i]]
//     }
// };


var reverseString = function(s) {
    reverse(s)
};

var reverse = function(s) {
    let l = -1, r = s.length;
    while(++l < --r) [s[l], s[r]] = [s[r], s[l]];
};
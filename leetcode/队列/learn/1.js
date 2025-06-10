const arr = []
const arr2 = new Array(5).fill(new Array(5).fill(0))

for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        if (i === 0 && j === 0) {
            arr2[i][j] = 1
            console.log
            return
        }
    }
}
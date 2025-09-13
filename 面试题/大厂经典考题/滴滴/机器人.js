const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let lineCount = 0;
let n, m, V;
let a = [];
let b = [];

rl.on('line', (line) => {
    if (lineCount === 0) {
        [n, m, V] = line.split(' ').map(Number);
    } else if (lineCount === 1) {
        a = line.split(' ').map(Number);
        a.sort((x, y) => x - y);
    } else if (lineCount === 2) {
        b = line.split(' ').map(Number);
        b.sort((x, y) => x - y);
        solve();
        rl.close();
    }
    lineCount++;
});

function solve() {
    let left = 0;
    let right = n;
    let ans = n;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        let cost = 0;
        let valid = true;

        for (let i = 0; i < mid; i++) {
            if (i >= b.length) {
                valid = false;
                break;
            }
            const needed = b[i] - a[i];
            if (needed > 0) {
                cost += needed;
                if (cost > V) {
                    valid = false;
                    break;
                }
            }
        }

        if (valid) {
            ans = n - mid;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    console.log(ans);
}
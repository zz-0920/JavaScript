const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    let u = 0, d = 0, l = 0, r = 0;
    // 统计各方向指令的数量
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === 'U') u++;
        else if (char === 'D') d++;
        else if (char === 'L') l++;
        else if (char === 'R') r++;
    }
    // 计算垂直方向需要调整的次数
    const vertical = Math.abs(u - d) / 2;
    // 计算水平方向需要调整的次数
    const horizontal = Math.abs(l - r) / 2;
    // 总的最少修改次数为垂直和水平调整次数之和
    console.log(vertical + horizontal);
    rl.close();
});
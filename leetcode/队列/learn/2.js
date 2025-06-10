const queue = []; // push, shift
queue.push(1);
queue.push(2);
queue.push(3);
queue.push(4);
queue.push(5);

// for (let i = 0; i < queue.length; i++) {
//     queue.push(i);
// }

while (queue.length) {
    let top = queue.shift
    console.log(top);
}
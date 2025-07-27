var reconstructQueue = function(people) {
    let queue = [];
    people.sort((a, b) => {
        if (a[0] === b[0]) {
            return a[1] - b[1];
        }
        return b[0] - a[0];
    })
    console.log(people);
    for (let i = 0; i < people.length; i++) {
        if (queue.length === 0) {
            queue.push(people[i]);
        }else {
            let index = people[i][1];
            queue.splice(index, 0, people[i]);
        }
    }
    return queue;
};
people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]];
reconstructQueue(people);
var findMinArrowShots = function(points) {
    let count = 1;
    points.sort((a, b) => {
        return a[1] - b[1];
    })
    let end = points[0][1];
    for (let i = 1; i < points.length; i++) {
        if (points[i][0] > end) {
            count++;
            end = points[i][1];
        }
    }
    return count;
};
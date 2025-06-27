function a() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('a');
        }, 1000);
        resolve();
    })
}
function b() {
    console.log('b');
}
a();
b();
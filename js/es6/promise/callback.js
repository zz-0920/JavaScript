function a() {
    console.log('a');
    b()
}
function b() {
    console.log('b');
    c()
}
function c() {
    console.log('c');
}
a()
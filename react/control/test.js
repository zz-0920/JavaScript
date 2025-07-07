function foo() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log("foo ok");
            resolve(123)
        }, 2000)
    })
}
function bar() {
    console.log("bar ok");
}

foo().then((data) => {
    console.log(data  + "---");
    bar()
})
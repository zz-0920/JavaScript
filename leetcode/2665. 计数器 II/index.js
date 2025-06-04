function createCounter(init) {
    let value = init;
    return {
        increment: () => ++value,
        decrement: () => --value,
        reset: () => value = init
    };
}
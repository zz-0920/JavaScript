var fib = function(n) {
    let f0=0,f1=1;
    for(let i=0;i<n;i++){
        newf=f0+f1;
        f0=f1;
        f1=newf;
    }
    return f0;    
};
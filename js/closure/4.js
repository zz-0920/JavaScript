function bar(){
    console.log(myname);   
}

function a(){
    var num = 10

    function b(){
        var num = 20
        c()
    }
    function c(){
        console.log(num);
    }
    b()
}
a()
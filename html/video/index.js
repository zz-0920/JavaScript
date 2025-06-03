// 鼠标在白色区域内移动时,能控制彩色容器的高度

// 在白色容器内监听鼠标移动事件

// 1.获取元素
var speed = document.querySelector('.speed');
var bar = document.querySelector('.speed-bar');
var video = document.querySelector('.flex');

speed.addEventListener('mousemove', function(e){
  // 控制 bar 的高度
  // 获取到鼠标在白色容器内的位置
  // 鼠标在白色容器内的位置 - 白色容器的顶部位置 = 鼠标在白色容器内的高度
    var y = e.pageY - speed.offsetTop
    var percent = y / speed.offsetHeight
    var height = Math.round(percent * 100) + '%'
    bar.style.height = height;

    // 数值控制
    var min = 0.4;
    var max = 4;
    var playbackRate = percent * (max - min) + min;
    bar.textContent = playbackRate.toFixed(2) + 'x';

    //控制视频的播放速度
    video.playbackRate = playbackRate;
}) 

// console.log(speed);

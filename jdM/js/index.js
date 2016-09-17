/**
 * Created by Administrator on 2016/7/20.
 */
window.onload=function(){
    headerSearch();
    bannerMove();
    timeBack();
}

/*调整顶部搜索块的透明度*/
function  headerSearch(){
    //1.获取需要进行背景透明度设置的顶部块
    var header=document.querySelector(".jd_header");
    //2.获取banner的高度
    //2.1先获取banner元素
    var banner=document.querySelector(".jd_banner");
    //2.2获取高度
    var bannerHeight=banner.offsetHeight;
    //3.监听屏幕的滚动
    window.onscroll=function(){
        //4.获取当前body移除出浏览器的高度
        var scrollHeight=document.body.scrollTop;
        //5.设置默认的透明度
        var alpha=1;
        //6.判断，是否超出范围，如果没有超出，则设置 比例值
        if(scrollHeight < bannerHeight){
                alpha=alpha*(scrollHeight/bannerHeight);
        }
        else {
            alpha=1;
        }
        //7.设置背景颜色
        header.style.backgroundColor="rgba(233,35,34,"+alpha+")";
    }
}


/*轮播图*/
function bannerMove(){
    function aa(){
        console.log()
    }
    //1.获取轮播图父容器
    var banner=document.querySelector(".jd_banner");
    //2.获取banner的宽度
    var width=banner.offsetWidth;
    //3.获取用于轮播的图片盒子
    var imgBox=banner.querySelector("ul:first-child");
    //4.默认的图片索引:因为图片已经默认偏移了一个宽度
    var index=1;
    //5.获取点盒子
    var indicatorBox=banner.querySelector("ul:last-child");
    //6获取点盒子中所有li标签
    var lis=indicatorBox.querySelectorAll("li");

    //封装开启过渡的方法
    var addTransition=function(){
        imgBox.style.webkitTransition="all 0.2s";
        imgBox.style.transition="all 0.2s";
    }
    //封装关闭过渡的方法
    var removeTransition=function(){
        imgBox.style.webkitTransition="none";
        imgBox.style.transition="none";
    }
    //设置偏移位置
    var setTranform= function(distance){
        imgBox.style.webkitTransform="translateX("+distance+"px)";
        imgBox.style.transform="translateX("+distance+"px)";
    }
    //设置当前图片对应点的样式
    var setIndicator=function(){
        //1.将点样式全部重置为没有
        for(var i=0;i<lis.length;i++){
            lis[i].className="";
            //lis[i].classList.remove("active");
        }
        //2.将当前索引所对应的点样式设置为
        if(index>=1){

            lis[index-1].className="active";
        }
    }

    //开启时钟
    var timerId=null;
    var startTimer=function(){
        //5.开启定时器，实现自动的滚动
        timerId=setInterval(function(){
            //5.1 索引变化
            index++;
            //5.2 添加过渡效果
            //兼容移动端浏览器
            addTransition();
            //5.3 设置偏移位置
            setTranform(-index*width);
        },2000);
    }
    startTimer();

    //transitionEnd的回调方法
    var cb=function(){
        //判断索引
        if(index==9){
            //重置索引
            index=1;
            //关闭过渡
            removeTransition();
            //设置偏移
            setTranform(-index*width);
        }
        else if(index==0){
            index=8;
            //关闭过渡
            removeTransition();
            //设置偏移
            setTranform(-index*width);
        }
        setIndicator();
    }

    //5.4监听transition过渡结束  在移动端没有on事件，所以添加事件只能使用addEventListener
    /*1.添加的事件名称  2.监听之后的处理回调函数*/
    //addTransitionEndEvent(imgBox,cb);
    itcast.addTransitionEnd(imgBox,cb);
    /*imgBox.addEventListener("webkitTransitionEnd",function(){

    });*/
    /*imgBox.addEventListener("transitionEnd",function(){
     if(index==9){
     //重置索引
     index=1;
     //关闭过渡
     removeTransition();
     //设置偏移
     setTranform(-index*width);
     }
     else if(index==0){
     index=8;
     //关闭过渡
     //关闭过渡
     removeTransition();
     //设置偏移
     setTranform(-index*width);
     }
     setIndicator();
     });*/

    //添加手势事件
    var startX=0;//记录手指的最原始的点击坐标X值
    var moveX=0; //记录手指滑动时的坐标X值
    var distanceX=0; //单次滑动触发所产生的距离
    imgBox.addEventListener("touchstart",function(e){
        //先清除定时器
        clearInterval(timerId);
        //需要记录最原始的手指触摸坐标
        startX= e.touches[0].clientX;
    });
    imgBox.addEventListener("touchmove",function(e){
        //记录手指滑动的坐标，根据坐标计算出相对于原始位置的偏移值
        moveX= e.touches[0].clientX;
        //计算当前的偏移值
        distanceX=moveX-startX;
        //滑动操作不需要添加过渡效果
        removeTransition();
        //设置位置偏移
        setTranform(-index*width +distanceX);
    });
    imgBox.addEventListener("touchend",function(e){
        //判断当前滑动的距离，如果超出宽度的1/3，则翻页，否则，吸附回去
        if(Math.abs(distanceX) > width /3){
            //判断滑动的方向
            if(distanceX>0){ //上一张
                index--;
            }
            else{
                index++;
            }
            addTransition();
            //5.3 设置偏移位置
            setTranform(-index*width);
        }
        else{
            addTransition();
            //5.3 设置偏移位置
            setTranform(-index*width);
        }
        //重新开启定时器
        startTimer();
    });
}

function timeBack(){
    //1.倒计时以秒作为单位
    var time=10*60*60;
    //2.获取倒计时显示块
    var timeBox=document.querySelector(".jd_sk_timeBack");
    //3.获取真正展示倒计时时间的span
    var spans=timeBox.querySelectorAll("span");

    //4.获取倒计时时间中的  时 分  秒
    var hour=0;
    var minute=0;
    var second=0;

    //5.开启定时器
    var timerId=setInterval(function(){
        //判断是否到时间
        if(time<=0){
            clearInterval(timerId);
            return;
        }
        //时间变化
        time--;

        //获取时分秒
        hour= Math.floor(time/3600);
        minute= Math.floor(time%3600/60);
        second=time%60;

        //将时分秒展示在元素中
        spans[0].innerHTML=Math.floor(hour/10);
        spans[1].innerHTML=hour%10;
        spans[3].innerHTML=Math.floor(minute/10);
        spans[4].innerHTML=minute%10;
        spans[6].innerHTML=Math.floor(second/10);
        spans[7].innerHTML=second%10;
    },1000);
}
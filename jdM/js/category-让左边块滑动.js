/**
 * Created by Administrator on 2016/7/23.
 */
window.onload=function(){
    leftSwipe();
}

function  leftSwipe(){
    /*
    1.需要进行上下滑动：需要添加三个滑动事件的监听touchstart  touchmove  touchend
    2.让ul块滑动：
        startY=0;
        moveY=0;
        dictaceY=moveY-startY;
        添加过渡/移除过渡
        设置坐标transform
        细节处理：要让当前的滑动在上一次的滑动结果之后进行，意味着我们需要记录上一次滑动结束之后的Y坐标值
    * */

    /*1.让ul块滑动起来*/
    var leftBox=document.querySelector(".jd_category_left");
    var ulBox=leftBox.querySelector("ul");

    /*2.添加事件监听*/
    var startY=0;
    var moveY=0;
    var distanceY=0;
    /*记录上一次滑动之后的Y坐标值*/
    var currentY=0;
    ulBox.addEventListener("touchstart",function(e){
        startY= e.touches[0].clientY;
    });
    ulBox.addEventListener("touchmove",function(e){
        moveY= e.touches[0].clientY;
        //计算当前滑动的距离
        distanceY=moveY-startY;
        //滑动不需要过渡
        //设置坐标位置
        ulBox.style.webkitTransform="translateY("+(currentY+distanceY)+"px)";
        ulBox.style.transform="translateY("+(currentY+distanceY)+"px)";
    });
    //记录Y坐标的值
    ulBox.addEventListener("touchend",function(e){
        currentY+=distanceY;
        console.log(currentY);
    });
}
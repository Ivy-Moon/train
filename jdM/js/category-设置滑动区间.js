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
    3.滑动应该是有范围限制：
        1.获取父容器的高度
        2.获取用于滑动的子容器的盒子高度
        3.计算出最大的Y坐标值和最小的区间Y坐标值
        4.判断当前的移动是否超出指定的区间
    * */

    /*1.让ul块滑动起来*/
    var leftBox=document.querySelector(".jd_category_left");
    //获取父容器盒子的高度
    var leftHeight=leftBox.offsetHeight;
    var ulBox=leftBox.querySelector("ul");
    //获取真正用于滑动的子盒子的高度
    var ulHeight=ulBox.offsetHeight;
    //设置静止状态下的最大Y坐标值
    var maxPotinstion=0;
    //获取静止状态下的最小Y坐标值
    var minPosition=leftHeight-ulHeight;
    //获取弹簧效果的最大区间的Y坐标值
    var maxBounce=maxPotinstion+100;
    //获取弹簧效果的最小区间的Y坐标值
    var minBounce=minPosition-100;


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
        //判断是否超出当前最大或者最小的移动范围区间
        if(distanceY+currentY >= maxBounce || distanceY+currentY <= minBounce){
            console.log("不能再滑动了！！");
            return;
        }
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
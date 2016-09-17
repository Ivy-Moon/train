/**
 * Created by Administrator on 2016/7/22.
 */
window.itcast={} //说明它是一个对象：
/*对可以自由扩展对象的属性*/
/*itcast.name="";
itcast.age="";
itcast.login=function(){}*/

/*1.你想对那一个dom元素添加事件
 2.如果事件触发，你想如何处理*/
itcast.addTransitionEnd=function(dom,callback){

    if(dom  && typeof  dom =="object"){
        dom.addEventListener("webkitTransitionEnd",function(){
            callback && callback();
        });
        dom.addEventListener("transitionEnd",function(){
            callback && callback();
        });
    }
}

//封装tap事件
/*1.你想对那一个dom元素添加事件
 2.如果事件触发，你想如何处理 ---回调函数--回调方法*/
itcast.tap=function(dom,callback){
    var isMove=false;//标记是否滑动过
    var startTime=0; //开启响应时间
    if(dom && typeof  dom == "object"){
        dom.addEventListener("touchstart",function(e){
            //开始计时 -aa是一个标记
            //now可以获取当前系统时间，但是是以ms做为单位
            startTime=Date.now();
        });

        dom.addEventListener("touchmove",function(e){
            //说明滑动过
            isMove=true;
        });

        dom.addEventListener("touchend",function(e){
            //判断是否是单击事件
            if(isMove == false && Date.now()-startTime < 150){
                //操作业务逻辑
                callback && callback(e);
            }
            //重置参数
            isMove=false;
        });
    }
}


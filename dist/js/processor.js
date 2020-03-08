//管理进度条功能
(function($, root){
    var $scope = $(document.body);
    var startTime;
    var curDuration;
    var frameId;
    var lastPercentage = 0;
    //转换时间
    function formatTime(time){
        time = Math.round(time);
        var minute = Math.floor(time / 60);
        var second = time - minute * 60;
        if(minute < 10){
            minute = '0' + minute;
        }
        if(second < 10){
            second = '0' + second;
        }
        return minute + ':' + second;
    }
    //渲染当前时间和进度条
    function start(percent){
        //这里处理拖动进度条情况
        if(percent === undefined){
            lastPercentage = lastPercentage;
        }else{
            lastPercentage = percent;
        }
        cancelAnimationFrame(frameId);
        startTime = new Date().getTime();
        function frame(){
            var curTime = new Date().getTime();
            var percentage = (curTime - startTime) / (curDuration * 1000) + lastPercentage;
            if(percentage < 1){
                frameId = requestAnimationFrame(frame);
                update(percentage);
            }else{
                cancelAnimationFrame(frameId);
            }
        }
        frame();
    };   
    // 更新播区域
    function update(percentage){
        var curTime = formatTime(percentage * curDuration);
        $scope.find('.cur-time').text(curTime);
        setProcessor(percentage);
    };
    //更新进度条
    function setProcessor(percentage){
        var percentage = (percentage - 1) * 100 + "%";
        $scope.find('.pro-top').css({
            "transform": `translateX(${percentage})` 
        })
    };
    //结束动画
    function stop(){      
        var curTime = new Date().getTime();
        lastPercentage = lastPercentage + (curTime - startTime) / (curDuration * 1000); 
        cancelAnimationFrame(frameId);
    }
    //渲染总时间
    function render(duration){
        curDuration = duration;
        // debugger; 加断点
        var allTime = formatTime(duration);
        $scope.find('.all-time').text(allTime);
        // 更新记录以及更新播放区
        lastPercentage = 0;
        update(0);
    }
    root.processer = {
        render: render,
        start: start,
        stop: stop,
        update: update
    }
})(window.Zepto, window.player || (window.player = {}))
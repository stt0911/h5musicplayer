var root = window.player;
var $ = window.Zepto;
var $scope = $(document.body);
// var index = 0;
var songList;
var controlManager;
var audioManager = new root.audioManager();
var processer = root.processer;
var playList = root.playList;

//使用委托注册事件
$scope.on('click', '.prev-btn', function(){
    // 这里是普通实现
    // index = index > 0 ? --index : (songList.length - 1);
 
    // 下面是模块实现 
    var index = controlManager.prev();
    // root.render(songList[index]);
    $scope.trigger('playchange', index);
});
$scope.on('click', '.next-btn', function(){
    // index = index < (songList.length - 1) ? ++index : 0;
    var index = controlManager.next();
    // root.render(songList[index]);
    $scope.trigger('playchange', index);
});
$scope.on('click', '.play-btn', function(){
    if(audioManager.status == 'play'){        
        audioManager.pause();
        processer.stop();
    }else{
        audioManager.play();
        processer.start();
    }
    $scope.find('.play-btn').toggleClass('playing');
});
$scope.on('click', '.list-btn', function(){
    playList.show(controlManager);
})
//自定事件提取相同部分，使用$中的trigger触发自定义事件
$scope.on('playchange', function(e, index, flag){
    var curdata = songList[index];
    root.render(curdata);
    audioManager.setAudioSource(curdata.audio);
    if(audioManager.status === 'play' || flag){
        audioManager.play();
        processer.start();
    }
    processer.render(curdata.duration);
});
//绑定touch事件
function bindTouch(){
    var $slidePoint = $scope.find('.slide-point');
    //获取进度条总长度
    var offset = $scope.find('.pro-wrapper').offset();
    var left = offset.left;
    var width = offset.width;

    $slidePoint.on('touchstart', function(e){
        processer.stop();
    }).on('touchmove', function(e){
        var offsetX = e.changedTouches[0].clientX - left;
        var percentage = offsetX / width;
        if(percentage > 1 || percentage < 0){
            percentage = 0;
        }
        processer.update(percentage);
    }).on('touchend', function(e){
        var offsetX = e.changedTouches[0].clientX - left;
        var percentage = offsetX / width;
        if(percentage > 1 || percentage < 0){
            percentage = 0;
        }
        var curTime = percentage * songList[controlManager.index].duration;
        processer.start(percentage);
        audioManager.jumpToPlay(curTime);
        $scope.find('.play-btn').addClass('playing');
    })
}

//从后台获取数据
function getData(url){
    $.ajax({
        url: url,
        type: 'get',
        success: successedFn,
        
        error: function(){
            console.log('error');
        }
    });
}
function successedFn(data){
    bindTouch();
    songList = data;
    controlManager = new root.controlManager(data.length);
    // root.render(songList[0]);
    $scope.trigger('playchange', 0);
    playList.render(data);
}
getData('/mock/data.json');
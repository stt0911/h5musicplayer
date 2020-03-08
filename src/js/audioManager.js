//管理歌曲模块
(function($, root){
    var $scope = $(document.body); 
    function audioManager(){
        this.audio = new Audio();
        this.status = "pause";    
        this.bindEvent();
    }
    audioManager.prototype = {
        //绑定事件
        bindEvent: function(){
            $(this.audio).on('ended', function(){
                $scope.find('.next-btn').trigger('click');
            })
        },
        //歌曲播放
        play: function(){
            this.audio.play();
            this.status = 'play';
        },
        //歌曲暂停
        pause: function(){
            this.audio.pause();
            this.status = 'pause';
        },
        //切花歌曲音频路径
        setAudioSource: function(src){
            this.audio.src =  src;
            this.audio.load();//载入并播放
        },
        //拖拽进度条跳到指定位置播放
        jumpToPlay: function(duration){
            this.audio.currentTime = duration;
            this.play();
        }
    }

    root.audioManager = audioManager;
})(window.Zepto, window.player || (window.player = {}))
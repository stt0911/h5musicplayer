(function($, root){
    var $scope = $(document.body);
    var controlManager;
    var $palyList  = $(`
                        <div class="play-list">
                            <div class="line-head">播放列表</div>
                            <ul class="play-list-wrap"></ul>
                            <div class="close-btn">关闭</div>
                        </div>
                    `);
    function render(data){
        var html = '';
        var len = data.length;
        for(var i = 0; i < len; i++){
            html += `<li>
                        <h3>${data[i].song} — <span>${data[i].singer}</span></h3>
                    </li>
                    `;
        }
        $palyList.find('ul').html(html);
        $scope.append($palyList);
        bindEvent();
    }
    function show(control){
        controlManager = control;
        $palyList.addClass('show');
        // 获取当前歌曲并标记
        var index = controlManager.index;
        signSong(index);
    };
    function signSong(index){
        $palyList.find('.playing').removeClass('playing');
        $palyList.find('li').eq(index).addClass('playing');
    };
    function bindEvent(){
        $palyList.on('click', '.close-btn', function(){
            $palyList.removeClass('show');
        });
        $palyList.on('click', 'li', function(){
            var index = $(this).index();
            //标记当前选中歌曲
            signSong(index);
            //修改controlManager的当前index
            controlManager.index = index;
            $scope.trigger('playchange',[index, true]);
            $scope.find('.play-btn').addClass('playing');
            setTimeout(function(){
                $palyList.removeClass('show');
            }, 500);
        })
    }
    root.playList = {
        render: render,
        show: show
    }
})(window.Zepto, window.player || (window.player = {}))
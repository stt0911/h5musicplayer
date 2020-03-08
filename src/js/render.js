//封装渲染模块
(function($, root){
    // 渲染歌曲信息
    function renderInfor(data){
        var $scope = $(document.body);
        var html = `
            <h1 class="song-name">${data.song}</h1>
            <h3 class="singer-name">${data.singer}</h3>
            <h3 class="album-name">${data.album}</h3>
        `;
        $scope.find('.song-info').html(html);
    }
    // 渲染歌曲图片
    function renderImg(src){
        var img = new Image();
        img.onload = function(){
            $scope.find('.song-img img').attr('src', src);
            root.blurImg(img, $scope.find('.content-wrap'));
        }
        img.src = src;
    }
    // 渲染喜欢按钮
    function renderLikebtn(isLike){
        var likeBtn =  $scope.find('.like-btn')
        if(isLike){
            likeBtn.addClass('liked');
        }else{
            likeBtn.removeClass('liked');
        }        
    }
    root.render = function(data){
        renderInfor(data); //将方法暴露出去
        renderImg(data.image);
        renderLikebtn(data.isLike);
    }
})(window.Zepto, window.player || (wondow.player = {}))
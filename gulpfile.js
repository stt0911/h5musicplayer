var gulp = require('gulp');
var watch = require('gulp-watch');
var connect = require('gulp-connect');//获取服务器对象
var less = require('gulp-less'); //获取less插件

//转移html文件任务
gulp.task('html', function(){
    gulp.src('./src/index.html')    //将文件变为文件流
    .pipe(connect.reload()) //服务器实时监听  
    .pipe(gulp.dest('./dist'));   //将文件流写道目标文件中
});
//转移js
gulp.task('js', function(){
    gulp.src('./src/js/*.js')
        .pipe(connect.reload())
        .pipe(gulp.dest('./dist/js'));
})

//监听任务
gulp.task('watch', function(){
    watch('./src/index.html', gulp.series('html'));
    watch('./src/css/*.less', gulp.series('less'));
    watch('./src/js/*.js', gulp.series('js'));
})

//开启服务器
gulp.task('server',function(){
    //开启服务器方法，可传递对象参数
    connect.server({
        // 修改端口号
        port: 8090,
        //开启服务器实时监听文件变化，自动变化
        livereload: true
    });
});

// 转化less到CSS
gulp.task('less', function(){
    gulp.src('./src/css/*.less')
        .pipe(less())
        .pipe(connect.reload()) //less变化之后服务器进行更新
        .pipe(gulp.dest('./dist/css'));
})

//默认任务default
gulp.task('default', gulp.parallel('html','js', 'less', 'watch', 'server'));

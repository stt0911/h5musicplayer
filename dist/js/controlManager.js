//管理index索引
(function($, root){
    function controlManager(length){
        //注释部分解释new操作发生的隐式操作
        // var this = {};
        this.index = 0;//当前索引
        this.length = length;
        // this.__proto__ = controlManager.prototype;
        // return this;
    }
    controlManager.prototype = {
        //下一首
        next: function(){
            return this.getIndex(1);
        },
        //上一首
        prev: function(){
            return this.getIndex(-1);
        },
        // 处理边界值小算法
        getIndex: function(val){
            var index = this.index;
            var len = this.length;
            var curIndex = (index + val + len) % len;
            this.index = curIndex;
            return curIndex;
        }
    }
    // var c = new controlManager();
    // console.log(c.__proto__); //指向上面的对象
    // console.log(controlManager.__proto__); //function
    // console.log(controlManager.__proto__.__proto__); //原始object
    // console.log(controlManager.__proto__.__proto__.__proto__); //null
    // .__proto__是对象的内部属性，需要对象调用它       .prototype必须函数调用

    root.controlManager = controlManager;
})(window.Zepto, window.player || (window.player = {}))
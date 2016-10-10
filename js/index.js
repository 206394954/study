/*
 * @Author: zhengwei
 * @Date:   2016-08-25 10:00:24
 * @Last Modified by:   zhengwei
 * @Last Modified time: 2016-08-28 10:49:26
 */

'use strict';
$(function() {
    var $items = $('#slide .item');
    console.log($items);
    // 定义大小屏幕宽度的判断依据
    var isSmall = 768;


    //添加屏幕变化的事件
    //每次变化都获取屏幕宽度 并且判断 设置。。。
    $(window).on('resize', function() {
        var windowWidth = $(window).width();
        // 获取屏幕宽度
        if (windowWidth > isSmall) {
            //是大屏 设置大图
            //4个.item都要设置背景图片 遍历所有的.item
            $items.each(function(index, element) {
                var $item = $(this);
                console.log(this);
                console.log(element);
                var imgSrc = $item.data('large-image');
                //设置背景
                $item.css('background-image', 'url(' + imgSrc + ')');
            });
        } else if (windowWidth < isSmall) {
            //是小屏  设置小图
            $items.each(function(index, element) {
                var $item = $(this);
                var imgSrc = $item.data('small-image');
                //设置图片标签
                $item.html('<img src="' + imgSrc + '" alt="" />');
            });
        }
    }).trigger('resize'); //定义事件的时候立即触发一下
    //初始化工具提示插件
    $('[data-toggle="tooltip"]').tooltip();

    //1.我们要先知道滑动的方向 是从左往右还是从右往左
    //2.我们有2个事件 touchstart 和 touchend  
    //3. end的clientX的位置 - start的clientX位置
    //4.如果值为负值 是从右往左滑  切换到下一张
    //5.如果值为正值 是从左往右滑  切换到上一张
    //6.$('.carousel').carousel('prev') $('.carousel').carousel('next')
    var slide = document.querySelector('.carousel');
    var startX = 0;
    var endX = 0;
    slide.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    slide.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        if (endX - startX > 0) {
            //从左往右滑
            $('.carousel').carousel('prev');
        } else {
            //是从右往左滑
            $('.carousel').carousel('next');
        }
    });
});
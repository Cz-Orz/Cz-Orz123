$(function() {
    // 获屏幕宽度
    var screenWidth = window.screen.width;
    // 将屏幕宽度设置下拉条
    $('.shop ul').css('width', screenWidth);
    $('.area ul').css('width', screenWidth);
    $('.price .price-list').css('width', screenWidth);
    var preShopIndex = 0,
        shopId = 0,
        preAreaIndex = 0,
        areaId = 0;

    // 打开页面时调用一次ajax
    window.onload = start();

    // 商店绑定点击事件
    $('.shop').click(function() {
        $('.shop ul').toggle();
        $('.area ul').hide();
        $('.price .price-list').hide();
        if ($('.shop ul').css('display') == 'block') {
            $('.shop .arrow').css('transform', 'rotate(180deg)')
        } else {
            $('.shop .arrow').css('transform', 'rotate(0)')
        }
        // 点商店栏后使用ajax调用数据
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsshop',
            success: function(data) {
                var result = template('template1', data);

                $('.shop ul li').remove();
                $(result).appendTo('.shop ul');
                // 给点击的列表添加类名
                $('.shop ul li').eq(preShopIndex).addClass('rightmark');
                // 给下拉条绑定点击事件
                $('.shop ul li').click(function() {
                    // 获取点击标签的内容
                    var text = $(this).text();
                    // 获取点击标签的索引
                    preShopIndex = $(this).index();
                    // 获取shopId
                    shopId = data.result[preShopIndex].shopId || 0;
                    $(this).addClass('rightmark');
                    $(this).siblings().removeClass('rightmark');
                    $('.shop-first').text(text);
                    // 点击后调用下面内容的ajax请求
                    $.ajax({
                        url: 'http://139.199.192.48:9090/api/getgsproduct?shopid=' + shopId + '&areaid=' + areaId,
                        success: function(data) {
                            $('.container ul li').remove();
                            var result = template('template2', data);
                            $(result).appendTo('.container ul');
                        }
                    })
                })
            }
        })
    })
    $('.area').click(function() {
        $('.area ul').toggle();
        $('.shop ul').hide();
        $('.price .price-list').hide();
        if ($('.area ul').css('display') == 'block') {
            $('.area .arrow').css('transform', 'rotate(180deg)')
        } else {
            $('.area .arrow').css('transform', 'rotate(0)')
        }
        // 调用area的ajax请求
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsshoparea',
            success: function(data) {
                $('.area ul li').remove();
                var result = template('template3', data);
                $(result).appendTo('.area ul');
                $('.area ul li').eq(preAreaIndex).addClass('rightmark');
                // 给地区列表绑定点击事件
                $('.area ul li').click(function() {

                    preAreaIndex = $(this).index();
                    areaId = data.result[preAreaIndex].areaId || 0;
                    var text = data.result[preAreaIndex].areaName.substr(0, 2);
                    $('.area .area-first').text(text);
                    $(this).addClass('rightmark');
                    $(this).siblings().removeClass('rightmark');
                    // 点击后调用下面内容的ajax请求
                    $.ajax({
                        url: 'http://139.199.192.48:9090/api/getgsproduct?shopid=' + shopId + '&areaid=' + areaId,
                        success: function(data) {
                            $('.container ul li').remove();
                            var result = template('template2', data);
                            $(result).appendTo('.container ul');
                        }
                    })
                })
            }
        })
    })

    $('.price').click(function() {
        $('.price .price-list').toggle();
        $('.area ul').hide();
        $('.shop ul').hide();
        if ($('.price .price-list').css('display') == 'block') {
            $('.price span').css('transform', 'rotate(180deg)')
        } else {
            $('.price span').css('transform', 'rotate(0)')

        }
    })

    // 封装ajax函数

    function start() {
        $.ajax({
            url: 'http://139.199.192.48:9090/api/getgsshop',
            success: function(data) {
                var result = template('template1', data);

                $('.shop ul li').remove();
                $(result).appendTo('.shop ul');
                // 给点击的列表添加类名
                $('.shop ul li').eq(preShopIndex).addClass('rightmark');

                shopId = data.result[preShopIndex].shopId || 0;
                // 点击后调用下面内容的ajax请求
                $.ajax({
                    url: 'http://139.199.192.48:9090/api/getgsproduct?shopid=' + shopId + '&areaid=' + areaId,
                    success: function(data) {
                        $('.container ul li').remove();
                        var result = template('template2', data);
                        $(result).appendTo('.container ul');
                    }
                })
            }
        })
    }

})
$(function () {  
    // 页面顶部搜索小功能
    $('.search').on('click',function () {  
        //点击第二次关闭搜索框
        if( $('#btn').css('display') != 'none'){
            $('#btn').fadeOut();
            return;
        }

        // console.log(111);
        $('#btn').fadeIn();

        //每隔 3s 判断是否关闭搜索框
        let timeId = setInterval(function () {  
            if($('#btn').val() == '') {
                $('#btn').fadeOut();
                clearInterval(timeId);
            }
        },3000);

    });
    
});
$(function () {  
  // 头部 nav 鼠标移入移出
  $('.nav').on('mouseover','li',function () {
    $(this).find('img')[0].src = "./img/mainPage/"+ $(this).attr('data-id') +"-1.png";
  });
  $('.nav').on('mouseout','li',function () {
    $(this).find('img')[0].src = "./img/mainPage/"+ $(this).attr('data-id') +".png";
  });
  
  // 校友动态    图片缩放
  $('.list').on('mouseover','img',function () {
    console.log($(this).attr('src'));
    $('.show img').attr('src',$(this).attr('src'));
    console.log($('.show span'))
    $('.show span').hide();
    $('.show span').eq($(this).attr('data-id')).show();
  });

  // new 模块 tab切换效果
  $('.d_title').on('click','.tab',function () {  
    console.log($(this).attr('data-id'));
    // 切换 tab栏效果
    $('.d_title').find('.tab').removeClass('active');
    $(this).addClass('active');
    $('.d_title').find('i').css('left',$(this).attr('data-id') * 118)
    // 切换对应的内容
    $('.d_list').find('ul').hide();
    $('.d_list').find('ul').eq($(this).attr('data-id')).show();
  });

  //校友联系部分  tab切换
  $('.c_title').on('click','.c_tab',function () {  
    console.log($(this).attr('data-id'));
    // 切换 tab栏效果
    $('.c_title').find('.c_tab').removeClass('active');
    $(this).addClass('active');
    $('.c_title').find('i').css('left',$(this).attr('data-id') * 118)
    // 切换对应的内容
    $('.tab_item').find('ul').hide();
    $('.tab_item').find('ul').eq($(this).attr('data-id')).show();
  });

  // 悬浮框
  // 移入
  $('.service').on('mouseover','.hover',function () {  
    // console.log($(this).attr('data-id'))
    $(this).find('img').attr('src','./img/mainPage/'+ $(this).attr('data-id') +'.png');
  });
  // 移出
  $('.service').on('mouseout','.hover',function () {  
    $(this).find('img').attr('src','./img/mainPage/'+ $(this).attr('data-id') +' - 1.png');
  });

  // 校友活动模块
  $('.time').on('click','li',function () {  
    // console.log(111)
    let i = parseInt($(this).attr('data-id'))
    // console.log(i);
    if(i > 3){
      $('.middle ul').animate({left: -240 * (i - 2) + 'px'},function () {  
        // range();
      });
    }else{
      $('.middle ul').animate({left: 240 * (2 - i) + 'px'},function () {  
        // range();
      });
    }
    $('.middle li').each(function (){
      $(this).find('div').removeClass();
    })
    range();
    // console.log(222)
    function range() {  
      $('.middle li').eq(i - 3).find('div').eq(0).addClass('rotate0 c1');
      $('.middle li').eq(i - 2).find('div').eq(0).addClass('rotate1 ');
      $('.middle li').eq(i - 1).find('div').eq(0).addClass('rotate2');
      $('.middle li').eq(i).find('div').eq(0).addClass('rotate3');
      $('.middle li').eq(i + 1).find('div').eq(0).addClass('rotate4');
      $('.middle li').eq(i + 2).find('div').eq(0).addClass('rotate5');

      $('.middle li').eq(i - 2).find('div').eq(1).addClass('c1 ');
      $('.middle li').eq(i - 1).find('div').eq(1).addClass('c2');
      $('.middle li').eq(i).find('div').eq(1).addClass('c3');
      $('.middle li').eq(i + 1).find('div').eq(1).addClass('c4');
      $('.middle li').eq(i + 2).find('div').eq(1).addClass('c5');
    }

    // 移动滑块
    $(".range").css('left', 81 + $(this).attr('data-id') * 133)
  });
  
});
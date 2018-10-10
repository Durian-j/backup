$(function () {  
  // 头部 nav 鼠标移入移出
  $('.nav').on('mouseover','li',function () {
    $(this).find('img')[0].src = "./img/news/"+ $(this).attr('data-id') +"-1.png";
  });
  $('.nav').on('mouseout','li',function () {
    $(this).find('img')[0].src = "./img/news/"+ $(this).attr('data-id') +".png";
  });

  // 服务大厅悬浮框
  // 移入
  $('.service').on('mouseover','.hover',function () {  
    // console.log($(this).attr('data-id'))
    $(this).find('img').attr('src','./img/news/'+ $(this).attr('data-id') +'.png');
  });
  // 移出
  $('.service').on('mouseout','.hover',function () {  
    $(this).find('img').attr('src','./img/news/'+ $(this).attr('data-id') +' - 1.png');
  });
  
  // 点击切换左边边区域
  $('.m_left').on('click','li',function () {  
    console.log($(this).attr('data-id'));
    console.log($('.m_right'));

    $('.m_left li').removeClass('color');
    $(this).addClass('color');
    $(this).css('borderBottom',`solid 1px #e0e0df`)

    // $('.m_right').hide();
    // $('.m_right').eq($(this).attr('data-id')).show();
  });
});
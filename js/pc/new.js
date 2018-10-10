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
    var nowId = ($(this).attr('data-id'))-0+1;
    getNewsList(nowId,('rdhdList'+nowId),('total'+nowId))
    // console.log($('.m_right'));

    $('.m_left li').removeClass('color');
    $(this).addClass('color');
    $(this).css('borderBottom',`solid 1px #e0e0df`)

    $('.m_right').hide();
    $('.m_right').eq($(this).attr('data-id')).show();
  });
});
var baseurl="http://192.168.1.105:8089/xyhweb-admin";
// 获取新闻列表的方法
function getNewsList(newsType,conmodule,total) {
  $.ajax({
    type:"POST",
    async:false,
    url:baseurl+"/queryNewsListForLevel2Page",
    data:{"newsType":newsType,"pageNum":1},
    dataType:'json',
    contentType:'application/x-www-form-urlencoded',
    success:function(data){
      console.log(data);
      var text = $(data.dataList[0].text).text();
      var conhtml="";
      for(let i=0;i<data.dataList.length;i++){
        var arr=data.dataList[i].createtime.split('-');
        var text = $(data.dataList[i].text).text();
        if(text.length>108){
          text = text.substring(0,108)+"..";
        }
        conhtml=conhtml+
        '<li>'+
        "<a href=\"javascript:;\">"+
          '<div>'+
            '<span>'+arr[1]+'月</span>'+
            '<span style="display:block">'+arr[2]+'</span>'+
            '<span style="display:block">'+arr[0]+'</span>'+
          '</div>'+
          '<div>'+
            '<p style="display:none">'+data.dataList[i].id+'</p>'+
            '<h4 onclick="watchdetail(event)">'+data.dataList[i].title+'</h4>'+
            '<p onclick="watchdetail(event)">'+text+'"</p>'+
          '</div>'+
        '</a>'+
      '</li>'
      }
      $('#'+conmodule).html(conhtml);
      $('#'+total).text('共'+data.num+'条记录');
    }
  });
}
// 查看新闻详情的方法
function watchdetail(e){
  let newsId=e.target.parentNode.firstChild.innerText;
  window.location.href = "./new_detail.html?newsId="+newsId;
}
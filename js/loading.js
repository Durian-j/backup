//获取浏览器页面可见高度和宽度  
var _PageHeight = document.documentElement.clientHeight,
	_PageWidth = document.documentElement.clientWidth;
//计算loading框距离顶部和左部的距离（loading框的宽度为215px，高度为61px）  
var _LoadingTop = _PageHeight > 300 ? (_PageHeight - 30) / 2 : 0,
	_LoadingLeft = _PageWidth > 400 ? (_PageWidth - 200) / 2 : 0;
//在页面未加载完毕之前显示的loading Html自定义内容  
var _LoadingHtml = '<div id="loadingDiv" style="position:absolute;left:0;width:100%;height:' + _PageHeight + 'px;top:0;background:#fff;opacity:1;filter:alpha(opacity=80);z-index:10000;"><div style="position: absolute; cursor1: wait; left: ' + _LoadingLeft + 'px; top:' + _LoadingTop + 'px; width: auto; height: 57px; line-height: 57px; padding-left: 50px; padding-right: 5px; background: #fff no-repeat scroll 5px 10px; color: #fff; font-family:\'Microsoft YaHei\';"><img src="../js/layer/theme/default/loading-0.gif" alt="" /></div></div>';

//呈现loading效果
document.write(_LoadingHtml);

//监听加载状态改变  
document.onreadystatechange = completeLoading;

//加载状态为complete时移除loading效果  
function completeLoading() {
	if(document.readyState == "complete") {
		var loadingMask = document.getElementById('loadingDiv');
		loadingMask.parentNode.removeChild(loadingMask);
	}
}
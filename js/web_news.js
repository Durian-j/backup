$(document).ready(function(){
    //初始化Table
    $('#newsList').bootstrapTable({
        url: '../news/queryNewsList',         //请求后台的URL
        method: 'post',                      //请求方式
        toolbar: '#toolbar',                //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
        pagination: true,                   //是否显示分页
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams : queryParams ,
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数
        pageList: [10, 20, 30, 40, 50],        //可供选择的每页的行数
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: false,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        minimumCountColumns: 2,             //最少允许的列数
        clickToSelect: true,                //是否启用点击选中行
        height: 600,
        //height: 500,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        onDblClickRow: function (row) {
            //详情页面
            queryUpdateInfo(row.id);
        },
        columns: [{
            title:'全选',
            field:'select',
            //复选框
            checkbox:true,
            width:10,
            align:'center',
            valign:'middle'
        }, {
            field: 'id',
            align: 'center',
            title: 'ID'
            //width: 40
        }, {
            field: 'title',
            align: 'left',
            title: '标题'
            //width: 40
        }, {
            field: 'author',
            align: 'center',
            title: '作者'
            //width:40
        }, {
            field: 'newsType',
            align: 'center',
            title: '新闻类别',
            //width: 40,
            formatter: function (value, row, index) {
                if (value == '1') {
                    return "热点活动";
                } else if(value == '2'){
                    return "校友活动";
                } else if(value == '3'){
                    return "活动预告";
                } else if(value == '4'){
                    return "校友心声";
                }else {
                    return "校友访谈";
                }
            }
        },{
            field:'option',
            title: '操作',
            //width: 40,
            align: 'center',
            //valign: 'middle',
            formatter: function (value,row,index){
              var re1 = "";
              re1 += "<button href='javascript:;' class='btn btn-xs btn-info' onclick=\"queryNewsInfo('" + row.id + "')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
              re1 += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"queryUpdateInfo('" + row.id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
              re1 += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteNews('" + row.id + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";
              return re1;
            }
        }]
    });
    $('#newsList').bootstrapTable('hideColumn', 'id');
    //initDate();
    /*$('#employeeList').bootstrapTable('hideColumn', 'birthDay');
    $('#employeeList').bootstrapTable('hideColumn', 'birthPlace');
    $('#employeeList').bootstrapTable('hideColumn', 'email');
    $('#employeeList').bootstrapTable('hideColumn', 'enrollmentDate');
    $('#employeeList').bootstrapTable('hideColumn', 'graduationDate');*/

    $("#newsQueryButton").bind("click",function () {
       var queryTitle= $("#queryTitle").val();
        var queryAuthor= $("#queryAuthor").val();
        var queryType= $("#queryType").val();
        $('#newsList').bootstrapTable('refresh', {query: {rows:10,page:1,queryTitle:queryTitle,queryAuthor:queryAuthor,queryType:queryType},url: '../news/queryNewsList'});
        /*alert("开始刷新");
        $('#employeeList').bootstrapTable('refresh',{url: '../employee/queryEmployeeList'});
        alert("结束刷新");*/
    });

    /**
     * 打卡新增页面
     */
    $("#newsAddButton").bind("click",function () {
        $("#title").val("").removeAttr("readonly");
        $("#summernote").summernote('code', "<span></span>");
        $("#author").val("").removeAttr("readonly");
        $("#newsType").val("").removeAttr("readonly");

        $("#newsSaveAddBtn").show();
        $("#newsSaveUpdateBtn").hide();
        $("#clickMe").click();
    });


    $("#newsDeleteList").bind("click",function () {
        deleteNewsList();
    });

    $("#summernote").summernote({
        //height:500 //不建议填写，如果上传图片高度比较大，编辑器则不会自动调整高度的
        focus:true,  //启动时自动获取焦点
        maxHeight:null,  //编辑器最大高度
        height:500,//对高度进行设置后，如果内容超过编辑器高度会出现滚动条。否则，编辑器高度会随内容高度变化而变化
        placeholder:'',
        lang:'zh-CN',
        callbacks : {
            // onImageUpload的參数为files，summernote支持选择多张图片
            onImageUpload : function(files) {
                var $files = $(files);
                // 通过each方法遍历每个file
                $files.each(function() {
                    var file = this;
                    // FormData，新的form表单封装。具体可百度，但其有用法非常easy，例如以下
                    var data = new FormData();
                    // 将文件添加到file中，后端可获得到參数名为“file”
                    data.append("file", file);
                    // ajax上传
                    $.ajax({
                        data : data,
                        type : "POST",
                        url : "../news/saveImageFile",// div上的action
                        cache : false,
                        contentType : false,
                        processData : false,
                        // 成功时调用方法，后端返回json数据
                        success : function(datas) {
                            // 封装的eval方法，可百度
                            var json = eval(datas.pathData);

                            for(var i=0;i<datas.pathData.length;i++){
                                $("#summernote").summernote('insertImage', datas.pathData[i].path);
                            }

                        }
                    });
                });
            }
        }
    });  <!-- -->


    $("#submitImg").bind("click",function () {
        $('#newsUpdatePage').ajaxSubmit({
            type : "POST",
            url:'../news/uploadMainPageImage',
            dataType: 'json',
            success: function(data){
                var json = eval(data);
                var img = $("#updataImg");
                var path = $("#path");
                img.show();
                img.attr("src","");
                img.attr("src",json.path);
                path.val(json.path);
                /* $("#upfile").val("");
                //$('#tb_CorporationUserInfo').bootstrapTable('refresh', {url: path+'/corporation/corporationInfoList'});
                $("#sysUserInfo_query").click(); */
            },
            error: function(){
                layer.msg("上传图片失败!");
            }
        });
    });


});

function initDate() {
    $('.date-picker').datepicker({autoclose: true}).next().on(ace.click_event, function () {
        $(this).prev().focus();
    });
    $('input[name=date-range-picker]').daterangepicker().prev().on(ace.click_event, function () {
        $(this).next().focus();
    });
}

function queryParams (params) {
    var queryName1 = $("#queryname").val();
    //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
    var temp = {
        rows: params.limit,                         //页面大小
        page: (params.offset / params.limit) + 1,   //页码
        sort: params.sort,      //排序列名
        sortOrder: params.order, //排位命令（desc，asc）
        queryTitle:$("#queryTitle").val(),
        queryAuthor:$("#queryAuthor").val(),
        queryType:$("#queryType").val()
    };
    return temp;
}

//操作栏的格式化
function actionFormatter(value, row, index) {
    var id = value;
    var result = "";
     result += "<button href='javascript:;' class='btn btn-xs btn-info' onclick=\"queryNewsInfo('" + row.id + "')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
     result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"queryUpdateInfo('" + row.id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
     result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteNews('" + row.id + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";

     return result;
};

function getRootPath_web() {
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    //获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    //获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return localhostPaht;
}



/**
 * 查询详情
 */
function queryNewsInfo(queryId) {

    $.ajax({
        type:"POST",
        async:false,
        url:"../news/queryNewsInfo",
        data:{"id":queryId},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#title").val(json.title).attr("readonly","readonly");
                $("#summernote").summernote('code', json.text);
                //$("#summernote").attr("readonly","readonly");
                $("#author").val(json.author).attr("readonly","readonly");
                $("#newsType").val(json.newsType).attr("readonly","readonly");
                $("#imgType").val(json.topImg).attr("readonly","readonly");
                $("#file").hide();
                $("#submitImg").hide();
                $("#path").hide();
                $("#updataImg").show();
                $("#updataImg").attr("src",json.topImgUrl).attr("readonly","readonly");
            }
            $("#newsSaveUpdateBtn").hide();
            $("#newsSaveAddBtn").hide();
            $("#clickMe").click();
        }
    });

}


/**
 * 查询要修改字段所有数据，并返回模态框中装配
 * @param upId 选中记录的工号字段值
 * @constructor
 */

function queryUpdateInfo(upId) {
    $.ajax({
        type:"POST",
        async:false,
        url:"../news/queryNewsInfo",
        data:{"id":upId},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#title").val(json.title);
                $("#id").val(json.id);
                $("#summernote").summernote('code', json.text);
                $("#author").val(json.author);
                $("#newsType").val(json.newsType);
                $("#imgType").val(json.topImg).attr("readonly","readonly");
                $("#file").hide();
                $("#submitImg").hide();
                $("#path").hide();
                $("#updataImg").show();
                $("#updataImg").attr("src",json.topImgUrl).attr("readonly","readonly");
            }
            $("#newsSaveUpdateBtn").show();
            $("#newsSaveAddBtn").hide();
            $("#clickMe").click();
        }
    });

}

/**
 * 保存修改后的数据到数据库
 */
function newsSaveUpdate(){
    var values = $("#summernote").summernote('code');
    $("#text").val(values);
    $.ajax({
        type:"POST",
        async:false,
        url:"../news/updateNews",
        data:$("#newsUpdatePage").serialize(),
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#myModal2").modal({backdrop:false});
                $("#myModal2").modal('hide');
                layer.msg("修改成功");
                $('#newsList').bootstrapTable('refresh', {url: '../news/queryNewsList'});
            }
        }
    });
}

/**
 * 保存新增职员信息到数据库
 */
function newsSaveAdd(){
    var imgType = $("#imgType").val();
    if(imgType == "y" &&($("#path").val() == undefined || $("#path").val() == "") ){
        layer.msg("请上传首页图片！");
    }else{
        var values = $("#summernote").summernote('code');
        $("#text").val(values);
        $.ajax({
            type:"POST",
            async:false,
            url:"../news/addNews",
            data:$("#newsUpdatePage").serialize(),
            dataType:'json',
            contentType:'application/x-www-form-urlencoded',
            success:function(data){
                var json = eval(data);
                if(json.flag == "success"){
                    $("#myModal2").modal({backdrop:false});
                    $("#myModal2").modal('hide');
                    layer.msg("新增成功");
                    $('#newsList').bootstrapTable('refresh', {url: '../news/queryNewsList'});
                }
            }
        });
    }
}

/**
 * 删除选中的记录信息
 * @param deleteid 选中记录的工号字段值
 * @constructor
 */

function DeleteNews(deleteid) {
    $.ajax({
        type:"POST",
        async:false,
        url:"../news/deleteNews",
        data:{"id":deleteid},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                layer.msg("删除成功");
                $('#newsList').bootstrapTable('refresh', {url: '../news/queryNewsList'});
            }
        }
    });

}

//批量删除
function deleteNewsList() {
    //获取所有被选中的记录
    var rows= $("#newsList").bootstrapTable('getSelections');
    var idList = "";
    if(rows.length>0){
        for (var i=0;i<rows.length;i++){
             var id = rows[i].id;
            idList = idList+","+id;
        }
        $.ajax({
            type:"POST",
            async:false,
            url:"../news/deleteNewsList",
            data:{"ids":idList},
            dataType:'json',
            contentType:'application/x-www-form-urlencoded',
            success:function(data){
                var json = eval(data);
                if(json.flag == "success"){
                    layer.msg("批量删除成功");
                    $('#newsList').bootstrapTable('refresh', {url: '../news/queryNewsList'});
                }
            }
        });
    }else{
        layer.msg("请至少选中一行");
    }



}








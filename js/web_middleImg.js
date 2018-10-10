$(document).ready(function(){
    //初始化Table
    $('#imgMiddleList').bootstrapTable({
        url: '../news/queryImgMiddleList',         //请求后台的URL
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
        }/*, {
            field: 'title',
            align: 'center',
            title: '标题'
            //width: 40
        }*/, {
            field: 'path',
            align: 'center',
            title: '图片',
            formatter: function (value,row,index){
                var re1 = "";
                re1 += "<img style='width:300px;'  src='" + row.path + "' />";
                return re1;
            }
            //width:40
        },{
            field: 'author',
            align: 'center',
            title: '上传人'
            //width:40
        }, {
            field: 'type',
            align: 'center',
            title: '图片类别',
            //width: 40,
            formatter: function (value, row, index) {
                if (value == '1') {
                    return "首页顶部";
                } else {
                    return "首页中部";
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
                re1 += "<button href='javascript:;' class='btn btn-xs btn-info' onclick=\"queryImgInfo('" + row.id + "')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
                re1 += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"queryUpdateInfo('" + row.id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
                return re1;
            }
        }]
    });
    $('#imgMiddleList').bootstrapTable('hideColumn', 'id');
    //initDate();
    /*$('#employeeList').bootstrapTable('hideColumn', 'birthDay');
    $('#employeeList').bootstrapTable('hideColumn', 'birthPlace');
    $('#employeeList').bootstrapTable('hideColumn', 'email');
    $('#employeeList').bootstrapTable('hideColumn', 'enrollmentDate');
    $('#employeeList').bootstrapTable('hideColumn', 'graduationDate');*/

    $("#imgQueryButton").bind("click",function () {
        var queryAuthor= $("#queryAuthor").val();
        var queryType= $("#queryType").val();
        $('#imgMiddleList').bootstrapTable('refresh', {query: {rows:10,page:1,queryAuthor:queryAuthor,queryType:queryType},url: '../news/queryImgMiddleList'});
        /*alert("开始刷新");
        $('#employeeList').bootstrapTable('refresh',{url: '../employee/queryEmployeeList'});
        alert("结束刷新");*/
    });

    /**
     * 打卡新增页面
     */
    $("#imgAddButton").bind("click",function () {
        $("#remark").val("").removeAttr("readonly");
        $("#author").val("").removeAttr("readonly");
        $("#updataImg").attr("src","");
        $("#imgSaveAddBtn").show();
        $("#imgSaveUpdateBtn").hide();
        $("#clickMe").click();
    });


    $("#imgDeleteList").bind("click",function () {
        deleteImgList();
    });

    $("#summernote").summernote({
        //height:500 //不建议填写，如果上传图片高度比较大，编辑器则不会自动调整高度的
        focus:true,  //启动时自动获取焦点
        maxHeight:null,  //编辑器最大高度
        minHeight:500,//编辑器最小高度，会跟随内容和图片大小自动调整编辑器高度
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
        $('#middelImgUpdatePage').ajaxSubmit({
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
        queryAuthor:$("#queryAuthor").val()
    };
    return temp;
}


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
function queryImgInfo(queryId) {

    $.ajax({
        type:"POST",
        async:false,
        url:"../news/queryMiddleImgInfo",
        data:{"id":queryId},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#remark").val(json.remark).attr("readonly","readonly");
                $("#id").val(json.id).attr("readonly","readonly");
                $("#path").val(json.path).attr("readonly","readonly");
                $("#updataImg").show();
                $("#updataImg").attr("src",json.path);
                $("#author").val(json.author).attr("readonly","readonly");
            }
            $("#imgSaveUpdateBtn").hide();
            $("#imgSaveAddBtn").hide();
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
        url:"../news/queryMiddleImgInfo",
        data:{"id":upId},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#path").val(json.path).removeAttr("readonly");;
                $("#id").val(json.id);
                $("#updataImg").show();
                $("#updataImg").attr("src",json.path);
                $("#author").val(json.author).removeAttr("readonly");
                $("#remark").val(json.remark).removeAttr("readonly");
                $("#type").val(json.type);
            }
            $("#imgSaveUpdateBtn").show();
            $("#imgSaveAddBtn").hide();
            $("#clickMe").click();
        }
    });

}

/**
 * 保存修改后的数据到数据库
 */
function imgSaveUpdate(){
    $.ajax({
        type:"POST",
        async:false,
        url:"../news/updateMiddleImg",
        data:$("#middelImgUpdatePage").serialize(),
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#myModal2").modal({backdrop:false});
                $("#myModal2").modal('hide');
                layer.msg("修改成功");
                $('#imgMiddleList').bootstrapTable('refresh', {url: '../news/queryImgMiddleList'});
            }
        }
    });
}











$(document).ready(function(){
    //初始化Table
    $('#employeeList').bootstrapTable({
        url: '',         //请求后台的URL
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
        uniqueId: "gh",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        onDblClickRow: function (row) {
            //详情页面
            queryUpdateInfo(row.gh);
        },
        columns: [{
            title:'全选',
            field:'select',
            //复选框
            checkbox:true,
            width:25,
            align:'center',
            valign:'middle'
        }, {
            field: 'gh',
            align: 'left',
            title: '工号',
            width: '60'
        }, {
            field: 'name',
            align: 'left',
            title: '姓名',
            width: '60'
        }, {
            field: 'gender',
            align: 'center',
            title: '性别',
            width: '40'
        }, {
            field: 'telephone',
            align: 'center',
            title: '联系电话',
            width: '80'
        }, {
            field: 'xl',
            align: 'center',
            title: '学历',
            width: '60'
        }, {
            field: 'zy',
            align: 'center',
            title: '专业',
            width: '100'
        }, {
            field: 'bm',
            align: 'center',
            title: '工作部门',
            width: '120'
        }, {
            field: 'zw',
            align: 'center',
            title: '岗位',
            width: '120'
        }, {
            field: 'zt',
            align: 'center',
            title: '状态',
            width: '40'
        }, {
            field:'ID',
            title: '操作',
            width: 120,
            align: 'center',
            valign: 'middle',
            formatter: actionFormatter
        }]
    });

    //initDate();
    /*$('#employeeList').bootstrapTable('hideColumn', 'birthDay');
    $('#employeeList').bootstrapTable('hideColumn', 'birthPlace');
    $('#employeeList').bootstrapTable('hideColumn', 'email');
    $('#employeeList').bootstrapTable('hideColumn', 'enrollmentDate');
    $('#employeeList').bootstrapTable('hideColumn', 'graduationDate');*/

    $("#emQueryButton").bind("click",function () {
       var queryName= $("#queryname").val();
        var queryGhid= $("#queryGhid").val();
        // var queryDegree= $("#queryDegree").val();
        var queryTelephone= $("#queryTelephone").val();
        var queryEmployer= $("#queryEmployer").val();
        $('#employeeList').bootstrapTable('refresh', {query: {rows:10,page:1,queryName:queryName,queryGhid:queryGhid,queryTelephone:queryTelephone,queryEmployer:queryEmployer},url: '../employee/queryEmployeeList'});
        /*alert("开始刷新");
        $('#employeeList').bootstrapTable('refresh',{url: '../employee/queryEmployeeList'});
        alert("结束刷新");*/
    });

    /**
     * 打卡新增页面
     */
    $("#emAddButton").bind("click",function () {
        $("#emName").val("").removeAttr("readonly");
        $("#ghid").val("").removeAttr("readonly");
        $("#gender").val("").removeAttr("readonly");
        $("#birthDay").val("").removeAttr("readonly");
        $("#telephone").val("").removeAttr("readonly");
        $("#email").val("").removeAttr("readonly");
        $("#rxDate").val("").removeAttr("readonly");
        $("#byDate").val("").removeAttr("readonly");
        $("#degree").val("").removeAttr("readonly");
        $("#college").val("").removeAttr("readonly");
        $("#major").val("").removeAttr("readonly");
        $("#employer").val("").removeAttr("readonly");
        $("#position").val("").removeAttr("readonly");
        $("#state").val("").removeAttr("readonly");
        $("#birthPlase").val("").removeAttr("readonly");

        $("#emSaveAddBtn").show();
        $("#emSaveUpdateBtn").hide();
        $("#clickMe").click();
    });


    $("#emDeleteList").bind("click",function () {
        deleteEmList();
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
        queryName:$("#queryname").val(),
        queryGhid:$("#queryGhid").val(),
        queryDegree:$("#queryDegree").val(),
        queryTelephone:$("#queryTelephone").val(),
        queryEmployer:$("#queryEmployer").val()
    };
    return temp;
}

//操作栏的格式化
// function actionFormatter(value, row, index) {
//     var id = value;
//     var result = "";
//     result += "<button href='javascript:;' class='btn btn-xs btn-info' onclick=\"queryEmployeeInfo('" + row.gh + "')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"queryUpdateInfo('" + row.gh + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteInfo('" + row.gh + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";
//
//     return result;
// };

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
function queryEmployeeInfo(queryId) {

    $.ajax({
        type:"POST",
        async:false,
        url:"../employee/queryEmployeeInfo",
        data:{"ghid":queryId},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#emName").val(json.name).attr("readonly","readonly");
                $("#ghid").val(json.gh).attr("readonly","readonly");
                $("#gender").val(json.gender).attr("readonly","readonly");
                $("#birthDay").val(json.csrq).attr("readonly","readonly");
                $("#telephone").val(json.telephone).attr("readonly","readonly");
                $("#email").val(json.email).attr("readonly","readonly");
                $("#rxDate").val(json.rxrq).attr("readonly","readonly");
                $("#byDate").val(json.byrq).attr("readonly","readonly");
                $("#degree").val(json.xl).attr("readonly","readonly");
                $("#college").val(json.xy).attr("readonly","readonly");
                $("#major").val(json.zy).attr("readonly","readonly");
                $("#employer").val(json.ssbm).attr("readonly","readonly");
                $("#position").val(json.zw).attr("readonly","readonly");
                $("#state").val(json.state).attr("readonly","readonly");
                $("#birthPlase").val(json.csd).attr("readonly","readonly");
            }
            $("#emSaveUpdateBtn").hide();
            $("#emSaveAddBtn").hide();
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
        url:"../employee/queryEmployeeInfo",
        data:{"ghid":upId},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#emName").val(json.name).removeAttr("readonly");
                $("#ghid").val(json.gh).removeAttr("readonly");
                $("#gender").val(json.gender).removeAttr("readonly");
                $("#birthDay").val(json.csrq).removeAttr("readonly");
                $("#telephone").val(json.telephone).removeAttr("readonly");
                $("#email").val(json.email).removeAttr("readonly");
                $("#rxDate").val(json.rxrq).removeAttr("readonly");
                $("#byDate").val(json.byrq).removeAttr("readonly");
                $("#degree").val(json.xl).removeAttr("readonly");
                $("#college").val(json.xy).removeAttr("readonly");
                $("#major").val(json.zy).removeAttr("readonly");
                $("#employer").val(json.ssbm).removeAttr("readonly");
                $("#position").val(json.zw).removeAttr("readonly");
                $("#state").val(json.state).removeAttr("readonly");
                $("#birthPlase").val(json.csd).removeAttr("readonly");
            }
            $("#emSaveUpdateBtn").show();
            $("#emSaveAddBtn").hide();
            $("#clickMe").click();
        }
    });

}

/**
 * 保存修改后的数据到数据库
 */
function emSaveUpdate(){
    $.ajax({
        type:"POST",
        async:false,
        url:"../employee/updateEmployeeInfo",
        data:$("#emUpdatePage").serialize(),
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#myModal2").modal({backdrop:false});
                $("#myModal2").modal('hide');
                alert("修改成功");
                $('#employeeList').bootstrapTable('refresh', {url: '../employee/queryEmployeeList'});
            }
        }
    });
}

/**
 * 保存新增职员信息到数据库
 */
function emSaveAdd(){
    $.ajax({
        type:"POST",
        async:false,
        url:"../employee/addEmployeeInfo",
        data:$("#emUpdatePage").serialize(),
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                $("#myModal2").modal({backdrop:false});
                $("#myModal2").modal('hide');
                layer.msg("新增成功");
                $('#employeeList').bootstrapTable('refresh', {url: '../employee/queryEmployeeList'});
            }
        }
    });
}

/**
 * 删除选中的记录信息
 * @param deleteid 选中记录的工号字段值
 * @constructor
 */

function DeleteInfo(deleteid) {
    $.ajax({
        type:"POST",
        async:false,
        url:"../employee/deleteEmployeeInfo",
        data:{"ghid":deleteid},
        dataType:'json',
        contentType:'application/x-www-form-urlencoded',
        success:function(data){
            var json = eval(data);
            if(json.flag == "success"){
                layer.msg("删除成功");
                $('#employeeList').bootstrapTable('refresh', {url: '../employee/queryEmployeeList'});
            }
        }
    });

}

//批量删除
function deleteEmList() {
    //获取所有被选中的记录
    var rows= $("#employeeList").bootstrapTable('getSelections');
    var idList = "";
    if(rows.length>0){
        for (var i=0;i<rows.length;i++){
             var ghid = rows[i].id;
            idList = idList+","+ghid;
        }
        $.ajax({
            type:"POST",
            async:false,
            url:"../employee/deleteEmList",
            data:{"ghids":idList},
            dataType:'json',
            contentType:'application/x-www-form-urlencoded',
            success:function(data){
                var json = eval(data);
                if(json.flag == "success"){
                    layer.msg("批量删除成功");
                    $('#employeeList').bootstrapTable('refresh', {url: '../employee/queryEmployeeList'});
                }
            }
        });
    }else{
        layer.msg("请至少选中一行");
    }



}






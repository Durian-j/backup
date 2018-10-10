//列表展示毕业生名册
$(document).ready(function () {
    $("#sbInfo").css("height", $(window).height() - 240);
    $("#sbInfo").css("overflow-y", "scroll");

    //表单效验
    formValidator();
    //初始化Table


    /**
     * bootstrap table 查询条件
     * @param params
     * @returns {{rows: *, page: number, sort: *, sortOrder: *, name: (*|jQuery), rxrq: (*|jQuery), fy: (*|jQuery), zymc: (*|jQuery|string), bh: (*|jQuery), xl: (*|jQuery), dsxm: (*|jQuery), sex: (*|jQuery)}}
     */
    function queryParams(params) {
        //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        var temp = {
            rows: params.limit,                         //页面大小
            page: (params.offset / params.limit) + 1,   //页码
            id: $("#zdxz").val()
        };
        return temp;
    }

    function tableData(id, url) {
        id="#"+id;
        $(id).bootstrapTable({
            url: '',         //请求后台的URL
            method: 'post',                      //请求方式
            toolbar: '#serchBtn',                //工具按钮用哪个容器
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
            pagination: true,                   //是否显示分页
            sortable: false,                     //是否启用排序
            sortOrder: "asc",                   //排序方式
            queryParams: queryParams,
            sidePagination: "server",           //分页方式：client客户端分页，server服务端分页
            pageNumber: 1,                       //初始化加载第一页，默认第一页
            pageSize: 10,                       //每页的记录行数
            pageList: [10, 20, 30, 40, 50],        //可供选择的每页的行数
            search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            strictSearch: true,
            showColumns: false,                  //是否显示所有的列
            showRefresh: false,                  //是否显示刷新按钮
            minimumCountColumns: 2,             //最少允许的列数
            clickToSelect: true,                //是否启用点击选中行
            height: 600,                    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
            cardView: false,                    //是否显示详细视图
            detailView: false,                   //是否显示父子表
            onDblClickRow: function (row) {
                //校友信息详情页面
                queryById(row.id, row.text);
            },
            columns: [{
                title: '全选',
                field: 'select',
                //复选框
                checkbox: true,
                width: 25,
                align: 'center',
                valign: 'middle',
                visible: false
            }, {
                field: 'id',
                align: 'left',
                title: 'ID',
                width: '60'
            }, {
                field: 'text',
                align: 'left',
                title: '名称',
                width: '80'
            }, {
                field: 'gzlxId',
                align: 'left',
                title: '父级关系',
                width: '80'
            }, {
                field: 'ID',
                title: '操作',
                width: 80,
                align: 'center',
                valign: 'middle',
                formatter: actionFormatter
            }]
        });
    }

});
//关闭模态窗口删除数据和表单验证样式
$('#myModa15').on('hidden.bs.modal', function () {
    $("#zdForm").data('bootstrapValidator').destroy();
    $('#zdForm').data('bootstrapValidator', null);
    $("#zdForm")[0].reset();
    $("#groupName").select2({
        data: [],
        placeholder: '请选择校友组别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    formValidator();
});

//表单验证
function formValidator() {
    $("#zdForm").bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            xqah: {
                validators: {
                    notEmpty: {
                        message: '兴趣爱好不能为空'
                    }
                }
            }
        }
    });
}

var str_permissions = [[${session.permissiontypes}]];

var editBtnFlag=false;

if(str_permissions==''){

}else{
    var permissions =  str_permissions.split(',');
    $.each(permissions,function (index, item) {
        if(item=='2'){//修改
            editBtnFlag=true;
        }else if(item=='3'){//添加
            $("#serchBtn").css("display","block");
        }else if(item=='4'){//删除

        }
    })
}
//操作栏的格式化
function actionFormatter(value, row, index) {
    var id = row.id;
    var name = row.text;
    var result = "";
    if (editBtnFlag){
        // result += "<button href='javascript:;' class='btn btn-xs btn-info' style='display: none' onclick=\"queryById('" + id + "', '" + name + "')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
        result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"EditViewById('" + id + "', '" + name + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
        result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";
    }
    return result;
};
//修改保存
$("#saveInfo").click(function () {
    var defalutForm = $("#zdForm").data('bootstrapValidator');
    defalutForm.validate();
    if (defalutForm.isValid()) {
        $.ajax({
            url: "../updateZdById",
            type: "post",
            data: {
                id: $("#id").val(),
                name: $("#tabName").val(),
                colName: $("#name").val(),
                gzlx: $("#gzlx").val()
            },
            success: function (data) {
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../queryZdDetails'});
            }
        });
    }
});
$("#1").click(function () {
    tableData(id,url);
});
//新增保存
$("#saveInfo2").click(function () {
    var defalutForm = $("#zdForm").data('bootstrapValidator');
    defalutForm.validate();
    if (defalutForm.isValid()) {
        $.ajax({
            url: "../addZd",
            type: "post",
            data: {
                tabname: $("#zdxzAdd").val(),
                name: $("#nameAdd").val(),
                gzlx: $("#gzlxAdd").val()
            },
            success: function (data) {
                $("#myModa12").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../queryZdDetails'});
            }
        });
    }
});

//根据搜索条件查询字典信息
$("#search").click(function (params) {
    var id = $("#zdxz").val();
    var tabName = $("#zdxz").val();
    $("#tabName").val(tabName);
    $("#xyList").bootstrapTable('refresh', {url: '../queryZdDetails'});
});

$("#zdxzAdd").change(function () {
    var tableName = $("#zdxzAdd").val();
    if (tableName == "T_DIC_GZLX_ZW") {
        $("#showZwAdd").attr("style", "display:block;");
    } else {
        $("#showZwAdd").attr("style", "display:none;");
    }
});
//新增信息
$("#serchBtn").click(function () {
    $("#add").click();
    $("#addZd")[0].reset();
    $(".tab-pane .form-control").prop("readonly", false);
    $("#showZwAdd").attr("style", "display:none;");

});

//根据ID查看校友详细信息
function queryById(id, name) {
    $(".tab-pane .form-control").prop("readonly", true);
    $("#saveInfo").hide();
    $("#gzlx").prop("disabled", true);
    queryUtil(id, name);
}

//修改信息
function EditViewById(id, name) {
    $(".tab-pane .form-control").prop("readonly", false);
    $("#saveInfo").show();
    $("#closeInfo").show();
    $("#id").val(id);
    $("#gzlx").prop("disabled", false);
    queryUtil(id, name);
}

//删除
function DeleteByIds(id) {
    layer.alert('您真的确定要删除吗？', {
        time: 0 //不自动关闭
        , btn: ['确定', '取消']
        , yes: function (index) {
            layer.close(index);
            $.ajax({
                url: "../deleteZdById",
                type: "post",
                data: {
                    id: id,
                    name: $("#tabName").val()
                },
                success: function (data) {
                    layer.msg('删除成功', function () {

                    });
                    $("#xyList").bootstrapTable('refresh', {url: '../queryZdDetails'});

                }
            });
        }
    });
}

//通过ID查询详细信息公共方法
function queryUtil(id, name) {
    $("#queryBk").click();
    //TODO 需要清空表单
    $("#zdForm")[0].reset();
    $("#name").val(name);
    $("#showZw").attr("style", "display:none;");
    var tableName = $("#zdxz").val();
    if (tableName == "T_DIC_GZLX_ZW") {
        $("#showZw").attr("style", "display:block;");
        $.ajax({
            url: "../queryGzlxById",
            type: "post",
            data: {
                id: id
            },
            success: function (data) {
                $("#gzlx").val(data[0].id).select2();
            }
        });
    }
}


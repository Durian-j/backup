//列表展示毕业生名册
$(document).ready(function () {
    //设置select2宽度和input相同
    var inputWidth = $("#nameQuery").css("width");
    $("#groupQuery").css("width", inputWidth);
    $("#search").css("width", parseInt(inputWidth) / 2);
    // var search_top_content_height = parseInt($("#top-content").css("height")) + 10;
    //表单效验
    formValidator();

    //初始化Table
    $('#xyList').bootstrapTable({
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
        height: 600,                    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度  $(window).height()-search_top_content_height
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        onDblClickRow: function (row) {
            //校友信息详情页面
            queryById(row.id);
        },
        columns: [{
            field: 'id',
            align: 'left',
            title: 'id',
            width: '60',
            visible: false
        }, {
            field: 'name',
            align: 'left',
            title: '刊物名称',
            width: '80'
        }, {
            field: 'groupId',
            align: 'left',
            title: '刊物组名',
            width: '80'
        }, {
            field: 'photo',
            align: 'center',
            title: '封面',
            width: '80',
            formatter:function(value,row,index){
                return '<a href="'+value+'" title="'+row.photo+'" data-gallery=""><img  src="'+value+'" class="img-rounded"  style="width: 50px;height: 50px;"></a>'
            }
        }, {
            field: 'createTime',
            align: 'center',
            title: '创建时间',
            width: '80'
        }, {
            field: 'createUser',
            align: 'center',
            title: '创建人',
            width: '80'
        }, {
            field: 'updateTime',
            align: 'center',
            title: '修改时间',
            width: '80'
        }, {
            field: 'updateUser',
            align: 'center',
            title: '修改人',
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
            name: "%" + $("#nameQuery").val() + "%",
            groupId: "%" + $("#groupQuery").val() + "%"
        };
        return temp;
    }

    var xykw_data = [];
    $.ajax({
        url: "../queryXykwList",
        async: false,
        success: function (data) {
            xykw_data = data;
        }
    });
    //校友刊物初始化
    $("#groupQuery").select2({
        data: xykw_data,
        placeholder: '请选择校友组别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#groupId").select2({
        data: xykw_data,
        placeholder: '请选择校友组别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
});
//关闭模态窗口删除数据和表单验证样式
$('#myModa15').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
    $("#id").val("");
    $("#groupId").select2({
        data: [],
        placeholder: '请选择刊物组别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    formValidator();
    $("#photo").attr('src',"");
});
//表单验证
function formValidator() {
    $("#bys").bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            name: {
                message: '刊物名称不合法',
                validators: {
                    notEmpty: {
                        message: '刊物名称不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '请输入2到16个字符'
                    },
                }
            }
            , groupId: {
                validators: {
                    notEmpty: {
                        message: '校友组别不能为空'
                    }
                }
            }
            , photoUrl: {
                validators: {
                    notEmpty: {
                        message: '刊物封面不能为空'
                    }
                }
            }
            , pdfUrl: {
                validators: {
                    notEmpty: {
                        message: '刊物PDF不能为空'
                    }
                }
            }
        }
    });
}

//新增信息
$("#serchBtn").click(function () {
    $("#addXykw").click();
});

$("#saveInfo").click(function () {
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    var size = $("#pdfUrl")[0].files[0].size;
    if(size > 5242880){
        layer.msg("上传文件大小超过5M，无法上传");
        return;
    }
    $("#saveInfo").attr("disabled",true);
    if (defalutForm.isValid()) {
        $.ajax({
            url: "../alumniJournal/addXykwInfo",
            method: 'POST',
            processData: false,
            contentType: false,
            data: new FormData($('#bys')[0]),
            success: function (data) {
                $("#saveInfo").removeAttr("disabled");
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../alumniJournal/query'});
            }
        });
    }
});

function queryById(id) {
    $("#addXykw").click();
    $("#saveInfo").prop("disabled", true);
    queryUtil(id);
}

//修改信息
function EditViewById(id) {
    $("#addXykw").click();
    $("#saveInfo").prop("disabled", false);
    queryUtil(id);
}

//操作栏的格式化
// function actionFormatter(value, row, index) {
//     var id = row.id;
//     var result = "";
//     // result += "<button href='javascript:;' class='btn btn-xs btn-info' onclick=\"queryById('" + id + "', '"+ xl +"')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";
//
//     return result;
// };

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#xyList").bootstrapTable('refresh', {url: '../alumniJournal/query'});
});

//通过ID查询详细信息公共方法
function queryUtil(id) {
    $.ajax({
        url: "../alumniJournal/queryById",
        type: "post",
        data: {
            id: id
        },
        success: function (data) {
            $("#bys")[0].reset();
            $("#id").val(data.data[0].id);
            $("#name").val(data.data[0].name);
            $("#groupId").val(data.data[0].groupId).select2();
            $("#photo").attr('src',data.data[0].photo);
        }
    });
}

//删除
function DeleteByIds(id) {
    layer.alert('您真的确定要删除吗？', {
        time: 0 //不自动关闭
        , btn: ['确定', '取消']
        , yes: function (index) {
            layer.close(index);
            $.ajax({
                url: "../alumniJournal/delete",
                type: "post",
                data: {
                    id: id
                },
                success: function (data) {
                    layer.msg(data.data, function(){
                        if(data.retMsg == "失败") return;
                    });
                    $("#xyList").bootstrapTable('refresh', {url: '../alumniJournal/query'});
                }
            });
        }
    });
}
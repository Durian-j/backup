//列表展示毕业生名册
$(document).ready(function () {
    //设置select2宽度和input相同
    var inputWidth = $("#nameQuery").css("width");
    $("#groupQuery").css("width", inputWidth);
    $("#search").css("width", parseInt(inputWidth) / 2);
    // var search_top_content_height = parseInt($("#top-content").css("height")) + 10;
    //表单效验
    formValidator();
    $("#cityShow").hide();
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
            title: '机构名称',
            width: '80'
        }, {
            field: 'area',
            align: 'left',
            title: '所属地区',
            width: '80'
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
            field: 'status',
            align: 'center',
            title: '状态',
            width: '80',
            formatter: changeStuats
        },{
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
            name: "%" + $("#nameQuery").val() + "%"
            // area: "%" + $("#areaQuery").val() + "%"
        };
        return temp;
    }

    function changeStuats(value, row, index) {
        var result = "";
        if (value == 0) {
            result += "<span class='badge badge-danger' style='padding: 6px'>禁用</span>";
        } else if (value == 1) {
            result += "<span class='badge badge-primary' style='padding: 6px'>启用</span>";
        }
        return result;
    }
});
//关闭模态窗口删除数据和表单验证样式
$('#myModa15').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
    $("#area").select2({
        data: [],
        placeholder: '请选择校友会类型',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#city").select2({
        data: [],
        placeholder: '请选择地区',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    formValidator();
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
                message: '机构名称不合法',
                validators: {
                    notEmpty: {
                        message: '机构名称不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '请输入2到16个字符'
                    },
                }
            }
            , area: {
                validators: {
                    notEmpty: {
                        message: '所属地区不能为空'
                    }
                }
            }
        }
    });
}
$("#area").change(function () {
    // 先清空第二个
    $("#city").empty();
    var valueNow = $("#area").val();
    if (valueNow == 1){
        $("#cityShow").show();
        var all_data = [];
        $.ajax({
            url: "../alumniInstitutions/queryCityList",
            async: false,
            success: function (data) {
                all_data = data;
            }
        });
        //二级联动选择下拉框初始化
        $("#city").select2({
            data: all_data,
            placeholder: '请选择院系名称',
            allowClear: true,
            language: "zh-CN"
        });
    }else{
        $("#cityShow").hide();
    }
});

//新增信息
$("#serchBtn").click(function () {
    $("#addXykw").click();
    $("#saveInfo").show();
    $("#name").prop("disabled", false);
    $("#area").prop("disabled", false);
    $("#city").hide();
    $("#bys")[0].reset();
    $("#area").select2({
        data: [],
        placeholder: '请选择校友会类型',
        allowClear: true,
        language: "zh-CN"
    });
    $("#city").select2({
        data: [],
        placeholder: '请选择校友会类型',
        allowClear: true,
        language: "zh-CN"
    });
});

$("#saveInfo").click(function () {
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    var data = {
        parent : $("#area").val(),
        name : $("#name").val(),
        area: $("#city").val()
    };
    if (defalutForm.isValid()) {
        $.ajax({
            type : "POST",
            url: "../alumniInstitutions/saveInfo",
            data : JSON.stringify(data),
            contentType : "application/json",
            dataType : "json",
            success: function (result) {
                $("#myModa15").modal('hide');
                layer.msg(result.data);
                $("#xyList").bootstrapTable('refresh', {url: '../alumniInstitutions/init'});
            }
        });
    }
});

function queryById(id) {
    $("#addXykw").click();
    $("#saveInfo").hide();
    $("#name").prop("disabled", true);
    $("#area").prop("disabled", true);
    queryUtil(id);
}

//修改信息
function EditViewById(id) {
    $("#addXykw").click();
    $("#saveInfo").show();
    $("#name").prop("disabled", false);
    $("#area").prop("disabled", false);
    queryUtil(id);
}

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#xyList").bootstrapTable('refresh', {url: '../alumniInstitutions/init'});
});

//通过ID查询详细信息公共方法
function queryUtil(id) {
    $.ajax({
        url: "../alumniInstitutions/queryById",
        type: "post",
        data: {
            id: id
        },
        success: function (data) {
            $("#bys")[0].reset();
            $("#id").val(data.data[0].id);
            $("#name").val(data.data[0].name);
            $("#area").val(data.data[0].area).select2();

        }
    });
}

//列表展示毕业生名册
$(document).ready(function () {
//    $("#bys").bootstrapValidator({
//        message: '输入值不合法',
//        feedbackIcons: {
//            valid: 'glyphicon glyphicon-ok',
//            invalid: 'glyphicon glyphicon-remove',
//            validating: 'glyphicon glyphicon-refresh'
//        },
//        fields: {
//            sex: {
//                validators: {
//                    notEmpty: {
//                        message: '性别不能为空'
//                    }
//                }
//            }
//            , csrq: {
//                validators: {
//                    notEmpty: {
//                        message: '出生日期不能为空'
//                    }
//                }
//            }
//            , mz: {
//                validators: {
//                    notEmpty: {
//                        message: '名族不能为空'
//                    }
//                }
//            }
//            , zzmm: {
//                validators: {
//                    notEmpty: {
//                        message: '政治面貌不能为空'
//                    }
//                }
//            }
//            , bysj: {
//                validators: {
//                    notEmpty: {
//                        message: '毕业时间不能为空'
//                    }
//                }
//            }
//        }
//    });

    var inputWidth = $("#titleQuery").css("width");
    $("#statusQuery").css("width", inputWidth);
    $("#search").css("width", parseInt(inputWidth) / 2);
    //毕业时间控件
    $('#bysj').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyymmdd", //格式化日期
        minView: "month",//设置只显示到月份
        initialDate: new Date(),
        autoclose: true,//选中自动关闭
        todayBtn: true,//显示今日按钮
    }).on('hide', function (e) {
        $('#bys').data('bootstrapValidator')
            .updateStatus('bysj', 'NOT_VALIDATED', null)
            .validateField('bysj');
    });
    //出生日期时间控件
    $('#csrq').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyymmdd", //格式化日期
        minView: "month",//设置只显示到月份
        initialDate: new Date(),
        autoclose: true,//选中自动关闭
        todayBtn: true//显示今日按钮

    }).on('hide', function (e) {
        $('#bys').data('bootstrapValidator')
            .updateStatus('csrq', 'NOT_VALIDATED', null)
            .validateField('csrq');
    });

    //设置select2宽度和input相同
    var inputWidth = $("#nameQuery").css("width");
    $("#xlxz").css("width", inputWidth);
    $("#yxxz").css("width", inputWidth);
    $("#zymcxz").css("width", inputWidth);
    $("#search").css("width", parseInt(inputWidth) / 2);

    var search_top_content_height = parseInt($("#top-content").css("height")) + 10;
    $("#sbInfo").css("height", $(window).height() - 240);
    $("#sbInfo").css("overflow-y", "scroll");

    $("#sbInfoAdd").css("height", $(window).height() - 240);
    $("#sbInfoAdd").css("overflow-y", "scroll");

    //表单效验

    //初始化Table
    $('#xyList').bootstrapTable({
        url: '',         //请求后台的URL
        method: 'post',                      //请求方式
        toolbar: '',                //工具按钮用哪个容器
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
        onDblClickRow: onDblClickRow,
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
            title: 'id',
            width: '60',
            visible: false
        }, {
            field: 'title',
            align: 'left',
            title: '事务代办标题',
            width: '80'
        }, {
            field: 'image',
            align: 'left',
            title: '代办图片',
            width: '80',
            formatter:function(value,row,index){
                return '<a href="'+value+'" title="'+row.image+'" data-gallery=""><img  src="'+value+'" class="img-rounded"  style="width: 50px;height: 50px;"></a>'
            }
        }, {
            field: 'content',
            align: 'center',
            title: '代办内容',
            width: '80'
        }, {
            field: 'type',
            align: 'center',
            title: '代办类型',
            width: '120'
        }, {
            field: 'status',
            align: 'center',
            title: '状态',
            width: '80',
            formatter: changeStuats
        }, {
            field: 'createTime',
            align: 'center',
            title: '提交时间',
            width: '130'
        }, {
            field: 'updateTime',
            align: 'center',
            title: '审核时间',
            width: '130'
        }, {
            field: 'updateUser',
            align: 'center',
            title: '审核人',
            width: '80'
        }, {
            field: 'checkResult',
            align: 'center',
            title: '审核结果',
            width: '130'
        }, {
            field: 'ID',
            title: '操作',
            width: 100,
            align: 'center',
            valign: 'middle',
            formatter: actionFormatter
        }]
    });

    //双击事件，弹框展示详细信息
    function onDblClickRow(row) {
        //校友信息详情页面
        $("#queryInfo").click();
        $("#bys1 .form-control").prop("readonly", true);
        $("#name").val(row.name);
        $("#rxnf").val(row.rxnf);
        $("#xymc").val(row.xymc);
        $("#zymcs").val(row.zymc);
        $("#xwlxs").val(row.xwlx);
        $("#remarks").val(row.remarks);
        $("#phonenumber").val(row.phonenumber);
        $("#dsxm").val(row.dsxm);
        if (row.xwlx == 1) {
            $("#xwlx").val("本科");
            $("#bhs").val(row.bh);
            $("#bhSh").show();
            $("#dsxmSh").hide();
        } else if (row.xwlx == 2) {
            $("#xwlx").val("硕士");
            $("#dsxm").val(row.dsxm);
            $("#bhSh").hide();
            $("#dsxmSh").show();
        } else if (row.xwlx == 3) {
            $("#xwlx").val("博士");
            $("#dsxm").val(row.dsxm);
            $("#bhSh").hide();
            $("#dsxmSh").show();
        }
        if (row.status == 0) {
            $("#status").val("审核未通过");
        } else if (row.status == 1 || row.status == 3) {
            $("#status").val("正在审核");
        } else if (row.status == 2) {
            $("#status").val("审核通过");
        }

    }

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
            title: "%" + $("#titleQuery").val() + "%",
            status: "%" + $("#statusQuery").val() + "%",
            yxmc: "%" + $("#yxxz").val() + "%"
        };
        return temp;
    }

    //获取院系下拉框数据
    var yxmc_data = [];
    $.ajax({
        url: "../queryYxList",
        async: false,
        success: function (data) {
            yxmc_data = data;
        }

    });
    //院系选择下拉框初始化
    $("#yxxz").select2({
        data: yxmc_data,
        placeholder: '请选择院系名称',
        allowClear: false,
        language: "zh-CN"
    });

    //状态初始化
    $("#statusQuery").select2({
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN",
        minimumResultsFor: -1
    });

});

//状态展示
function changeStuats(value, row, index) {
    var result = "";
    if (value == 0) {
        result += "<span class='badge badge-danger' style='padding: 3px'>审核中</span>";
    } else if (value == 1) {
        result += "<span class='badge badge-primary' style='padding: 3px'>通过</span>";
    } else if (value == 2) {
        result += "<span class='badge badge-warning' style='padding: 3px'>未通过</span>";
    }
    return result;
}

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#xyList").bootstrapTable('refresh', {url: '../swdb/query'});
});

//新增信息
$("#serchBtn").click(function () {
    $("#querySb").click();
    $("#saveInfo").show();
    $("#closeInfo").show();
    $("#bys")[0].reset();
});

//通过事务代办信息
function pass(id) {
    layer.alert("您真的确定通过审核吗?", {
        time: 0 //不自动关闭
        , btn: ['确定', '取消']
        , yes: function (index) {
            layer.close(index);
            $.ajax({
                url: "../swdb/setStatus",
                type: "post",
                data: {
                    id: id,
                    status: 1,
                    checkResult: "审核通过"
                },
                success: function (data) {
                    layer.msg(data.data);
                    $("#xyList").bootstrapTable('refresh', {url: '../swdb/query'});
                }
            });
        }
    });
}

//拒绝事务代办
function disagree(id) {
    $("#ids").val(id);
    $("#refuse").click();
}

//修改信息-审核不通过
function disagree(id, name, phone) {
    $("#refuse").click();
    $("#ids").val(id);
    $("#nameR").val(name);
    $("#phoneN").val(phone);
}

//审核不通过
$("#saveInfo2").click(function () {
    $.ajax({
        url: "../swdb/setStatus",
        type: "post",
        data: {
            id: $("#ids").val(),
            status: 2,
            checkResult: $("#remarkBack").val()
        },
        success: function (data) {
            $("#myModa12").modal('hide');
            layer.msg(data.data);
            $("#xyList").bootstrapTable('refresh', {url: '../swdb/query'});
        }
    });
});





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
        toolbar: '#exportExcel',                //工具按钮用哪个容器
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
            title: '校友编号',
            width: '60',
            visible: false
        }, {
            field: 'name',
            align: 'left',
            title: '姓名',
            width: '80'
        }, {
            field: 'openid',
            align: 'left',
            title: 'openid',
            width: '80',
            visible: false
        }, {
            field: 'rxnf',
            align: 'center',
            title: '入学年份',
            width: '80'
        }, {
            field: 'xymc',
            align: 'center',
            title: '学院名称',
            width: '120'
        }, {
            field: 'zymc',
            align: 'center',
            title: '专业名称',
            width: '150'
        }, {
            field: 'phonenumber',
            align: 'center',
            title: '手机号码',
            width: '100'
        }, {
            field: 'bh',
            align: 'center',
            title: '班号',
            width: '80',
        }, {
            field: 'dsxm',
            align: 'center',
            title: '导师姓名',
            width: '80',
        }, {
            field: 'xwlx',
            align: 'center',
            title: '学位类型',
            width: '80',
            formatter: changeXwlx
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
            field: 'createUser',
            align: 'center',
            title: '审核人',
            width: '80'
        }, {
            field: 'remarks',
            align: 'center',
            title: '审核内容',
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
        $.ajax({
            url: "../review/saveRemarks",
            type: "post",
            data: {
                id: row.id,
                remarks: row.remarks
            },
            success: function (data) {
                // layer.msg(data.data, function () {
                //     $("#myModa12").modal('hide');
                // });
                // $("#xyList").bootstrapTable('refresh', {url: '../review/query'});
            }
        });
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
            name: "%" + $("#nameQuery").val() + "%",
            rxnf: "%" + $("#rxnfQuery").val() + "%",
            xymc: "%" + $("#yxxz").val() + "%",
            zymc: $("#zymcxz").val() || "%%",
            bh: "%" + $("#bhQuery").val() + "%",
            xwlx: "%" + $("#xlxz").val() + "%",
            dsxm: "%" + $("#dsxmQuery").val() + "%"
        };
        return temp;
    }

    //获取名族下拉框数据
    var mz_data = [];
    $.ajax({
        url: "../queryMzList",
        async: false,
        success: function (data) {
            mz_data = data;
        }

    });
    //名族选择下拉框初始化
    $("#mz").select2({
        data: mz_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });

    var zzmm_data = [];
    $.ajax({
        url: "../queryZzmmList",
        async: false,
        success: function (data) {
            zzmm_data = data;
        }

    });

    //政治面貌选择下拉框初始化
    $("#zzmm").select2({
        data: zzmm_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });

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

    var collegeNow = $("#yxxz").val();
    var zymcxz_data = [];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
        },
        success: function (data) {
            zymcxz_data = data;
        }
    });
    //专业名称初始化
    $("#zymcxz").select2({
        data: zymcxz_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });

    //学历初始化
    $("#xlxz").select2({
        placeholder: '请选择学历',
        allowClear: true,
        language: "zh-CN",
        minimumResultsFor: -1
    });

    //性别初始化
    $("#sex").select2({
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsFor: -1
    });
});

//状态展示
function changeStuats(value, row, index) {
    var result = "";
    if (value == 0) {
        result += "<span class='badge badge-danger' style='padding: 3px'>审核未通过</span>";
    } else if (value == 1) {
        result += "<span class='badge badge-warning' style='padding: 3px'>正在审核</span>";
    } else if (value == 2) {
        result += "<span class='badge badge-primary' style='padding: 3px'>审核通过</span>";
    } else if (value == 3) {
        result += "<span class='badge badge-warning' style='padding: 3px'>硕士审核</span>";
    } else if (value == 4) {
        result += "<span class='badge badge-warning' style='padding: 3px'>博士审核</span>";
    } else if (value == 5) {
        result += "<span class='badge badge-warning' style='padding: 3px'>已查阅,未审核</span>";
    }
    return result;
}

//学位类型展示
function changeXwlx(value, row, index) {
    var result = "";
    if (value == 1) {
        result += "<span class='badge badge-primary' style='padding: 3px; width: 50px;'>本科</span>";
    } else if (value == 2) {
        result += "<span class='badge badge-primary' style='padding: 3px; width: 50px;'>硕士</span>";
    } else if (value == 3) {
        result += "<span class='badge badge-primary' style='padding: 3px; width: 50px;'>博士</span>";
    }
    return result;
}

$("#yxxz").change(function () {
    // 先清空第二个
    $("#zymcxz").empty();
    var collegeNow = $("#yxxz").val();
    if (collegeNow) {
        $("#zymcxz").prop("disabled", false);
    } else {
        $("#zymcxz").prop("disabled", true);
    }
    var zymcxz_data = [];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
        },
        success: function (data) {
            zymcxz_data = data;
        }

    });
    //专业名称选择下拉框初始化
    $("#zymcxz").select2({
        data: zymcxz_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
});

//操作栏的格式化
// function actionFormatter(value, row, index) {
//     var id = row.id;
//     var name = row.name;
//     var rxnf = row.rxnf;
//     var xymc = row.xymc;
//     var zymc = row.zymc;
//     var bh = row.bh;
//     var dsxm = row.dsxm;
//     var xwlx = row.xwlx;
//     var registerTime = row.createTime;
//     var status = row.status;
//     var phone = row.phonenumber;
//     var openid = row.openid;
//     var status = row.status;
//     var result = "";
//     if (status == 2) {
//         result += "<span>-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;-</span>";
//     } else {
//         result += "<button href='javascript:;' class='btn btn-xs btn-primary' onclick=\"pass('" + id + "','" + name + "', " +
//             "'" + rxnf + "', '" + xymc + "', '" + zymc + "', '" + bh + "', '" + dsxm + "', '" + xwlx + "', '" + registerTime + "', '" + phone + "', '" + openid + "', '" + status + "')\" title='通过'><span class='glyphicon glyphicon-search'>通过</span></button>";
//         result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"disagree('" + id + "','" + name + "','" + phone + "')\" title='拒绝'><span class='glyphicon glyphicon-pencil'>拒绝</span></button>";
//     }
//
//     return result;
// };

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#xyList").bootstrapTable('refresh', {url: '../review/query'});
});

function exportExl() {
    var name = $("#nameQuery").val();
    var rxnf = $("#rxnfQuery").val();
    var xymc = $("#yxxz").val();
    var zymc = $("#zymcxz").val();
    var bh = $("#bhQuery").val();
    var xwlx = $("#xlxz").val();
    var dsxm = $("#dsxmQuery").val();
    var toUrl = "../corporation/exportExcelByReview?name =" + name + "&rxnf=" + rxnf + "&xymc=" + xymc + "&zymc=" + zymc + "&bh=" + bh + "&xwlx=" + xwlx + "&dsxm=" + dsxm;
    $("#exl").attr("href", toUrl);
}
//新增信息
$("#serchBtn").click(function () {
    $("#querySb").click();
    $("#saveInfo").show();
    $("#closeInfo").show();
    $("#bys")[0].reset();
});

//根据ID查看校友详细信息
function pass(id, name, rxnf, xymc, zymc, bh, dsxm, xwlx, registerTime, phone, openid, status) {
    $("#bys")[0].reset();
    $("#sex").select2({
        data: [],
        disabled: false,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#mz").select2({
        data: [],
        disabled: false,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zzmm").select2({
        data: [],
        disabled: false,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    if (xwlx == 1) {
        $("#bhShow").show();
        $("#ybyyxShow").hide();
        $("#bh").val(bh);
    } else {
        $("#bhShow").hide();
        $("#ybyyxShow").show();
    }
    $("#id").val(id);
    $("#nameP").val(name);
    $("#rxnfs").val(rxnf);
    $("#xymcs").val(xymc);
    $("#zymc").val(zymc);
    $("#bhss").val(bh);
    $("#dsxms").val(dsxm);
    $("#xwlxs").val(xwlx);
    $("#phoneNum").val(phone);
    $("#registerTime").val(registerTime);
    $("#openid").val(openid);
    $("#statusS").val(status);
    $("#record").click();

}

//修改信息-审核不通过
function disagree(id, name, phone) {
    $("#refuse").click();
    $("#ids").val(id);
    $("#nameR").val(name);
    $("#phoneN").val(phone);
}
//关闭模态窗口刷新table
$('#myModa12').on('hidden.bs.modal', function() {
    $("#xyList").bootstrapTable('refresh', {url: '../review/query'});
});

//审核通过，保存补填内容
$("#saveInfo").click(function () {
    var xl = $("#xwlxs").val();
    var checkId = $("#id").val();
    var sfzhm = $("#sfzhm").val();
    var mz = $("#mz").val();
    var zzmm = $("#zzmm").val();
    var bh = $("#bh").val();
    var bysj = $("#bysj").val();
    var byrq = $("#bysj").val();
    var sex = $("#sex").val();
    var ybyyx = $("#ybyyx").val();
    var jg = $("#jg").val();
    var csrq = $("#csrq").val();
    var name = $("#nameP").val();
    var rxnf = $("#rxnfs").val();
    var rxrq = $("#rxnfs").val();
    var fy = $("#xymcs").val();
    var zymc = $("#zymc").val();
    var bh = $("#bhss").val();
    var dsxm = $("#dsxms").val();
    var yxmc = "南京航空航天大学";
    var nj = $("#rxnfs").val();
    var remark = $("#remark").val();
    var openid = $("#openid").val();
    var id=$("#id").val();
    var phone = $("#phoneNum").val();
    var status = $("#statusS").val();
    // if(sfzhm=="" || typeof(sfzhm)=="undefined") {
    //     layer.alert('身份证号码不能为空');
    //     return false;
    // }
    // if(csrq=="" || typeof(csrq)=="undefined") {
    //     layer.alert('出生日期不能为空');
    //     return false;
    // }
    // if(sex=="" || typeof(sex)=="undefined") {
    //     layer.alert('性别不能为空');
    //     return false;
    // }
    // if(jg=="" || typeof(jg)=="undefined") {
    //     layer.alert('籍贯不能为空');
    //     return false;
    // }
    // if(mz=="" || typeof(mz)=="undefined") {
    //     layer.alert('名族不能为空');
    //     return false;
    // }
    // if(zzmm=="" || typeof(zzmm)=="undefined") {
    //     layer.alert('政治面貌不能为空');
    //     return false;
    // }if(bh=="" || typeof(bh)=="undefined") {
    //     layer.alert('班号不能为空');
    //     return false;
    // }
    // if(bysj=="" || typeof(bysj)=="undefined") {
    //     layer.alert('毕业时间不能为空');
    //     return false;
    // }

//    var defalutForm = $("#bys").data('bootstrapValidator');
//    defalutForm.validate();
//    if(defalutForm.isValid()) {
    $.ajax({
        url: "../review/updateInfo",
        type: "post",
        data: {
            id: id,
            openid: openid
        },
        success: function (data) {
            $("#myModa15").modal('hide');
            layer.msg(data.data);
            $("#xyList").bootstrapTable('refresh', {url: '../review/query'});
        }
    });
});

//审核不通过，修改审核表状态
$("#saveInfo2").click(function () {
    var id = $("#ids").val();
    var remarkBack = $("#remarkBack").val();
    var name = $("#nameR").val();
    var phonenumber = $("#phoneN").val();
    $.ajax({
        url: "../review/saveReview",
        type: "post",
        data: {
            id: id,
            remarks: remarkBack,
            name: name,
            phonenumber: phonenumber
        },
        success: function (data) {
            layer.msg(data.data, function () {
                $("#myModa12").modal('hide');
            });
            $("#xyList").bootstrapTable('refresh', {url: '../review/query'});
        }
    });
});



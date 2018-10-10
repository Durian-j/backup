//列表展示毕业生名册
$(document).ready(function () {


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
    formValidator();
    //初始化Table
    $('#smsSend_table').bootstrapTable({
        url: '',         //请求后台的URL
        method: 'post',                      //请求方式
        toolbar: '#smsSendMsg',                //工具按钮用哪个容器
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
            title: '短信编号',
            width: '60',
            visible: false
        }, {
            field: 'name',
            align: 'left',
            title: '姓名',
            width: '80'
        }, {
            field: 'phone',
            align: 'left',
            title: '手机号码',
            width: '100'
        }, {
            field: 'content',
            align: 'center',
            title: '短信内容',
            width: '200'
        }, {
            field: 'sendTime',
            align: 'center',
            title: '发送时间',
            width: '80'
        }, {
            field: 'status',
            align: 'center',
            title: '状态',
            width: '80',
            formatter: changeStuats
        }, {
            field: 'reason',
            align: 'center',
            title: '发送原因',
            width: '130'
        }, {
            field: 'createUser',
            align: 'center',
            title: '发送人',
            width: '80'
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
});

//关闭模态窗口删除数据和表单验证样式
$('#myModa12').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
    $("#sendType").select2({
        data: [],
        placeholder: '请选择发送类型',
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
            sendType: {
                validators: {
                    notEmpty: {
                        message: '发送类型不能为空'
                    }
                }
            }
            , content: {
                validators: {
                    notEmpty: {
                        message: '短信内容不能为空'
                    }
                }
            }
        }
    });
}

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
    }
    return result;
}

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#smsSend_table").bootstrapTable('refresh', {url: '../smsSend/query'});
});

//新增信息
$("#smsSendMsg").click(function () {
    $("#sendShow").click();
    $("#bys")[0].reset();
    //发送类型初始化
    $("#sendType").select2({
        placeholder: '请选择发送类型',
        allowClear: true,
        language: "zh-CN"
    });
});

$("#sendType").change(function () {
    var isOne = $("#sendType").val();
    if (isOne == 2) {
        $("#showExcle").attr("style", "display:block;");
        $("#showName").attr("style", "display:none;");
        $("#showPhone").attr("style", "display:none;");
    } else if(isOne == 1){
        $("#showExcle").attr("style", "display:none;");
        $("#showName").attr("style", "display:block;");
        $("#showPhone").attr("style", "display:block;");
    }else{
        $("#showExcle").attr("style", "display:none;");
        $("#showName").attr("style", "display:none;");
        $("#showPhone").attr("style", "display:none;");
    }
});

$("#saveInfo").click(function () {
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    $("#saveInfo").attr("disabled",true);
    if (defalutForm.isValid()) {
        // $.ajax({
        //     url: "../smsSend/addSmsSendInfo",
        //     method: 'POST',
        //     processData: false,
        //     contentType: false,
        //     data: new FormData($('#bys')[0]),
        //     success: function (data) {
        //         $("#saveInfo").removeAttr("disabled");
        //         $("#myModa12").modal('hide');
        //         layer.msg(data.data);
        //         $("#smsSend_table").bootstrapTable('refresh', {url: '../smsSend/query'});
        //     }
        // });
        $('#bys').ajaxSubmit({
            url:'../smsSend/importExcel',
            dataType: 'text',
            success: function(msg){
                alert(msg);
                $("#upfile").val("");
                //$('#tb_CorporationUserInfo').bootstrapTable('refresh', {url: path+'../corporation/corporationInfoList'});
                $("#sysUserInfo_query").click();
            },
            error: function(){
                alert("导入excel出错！");
            }
        });
    }
});






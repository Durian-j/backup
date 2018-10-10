//列表展示毕业生名册
$(document).ready(function () {
    //设置select2宽度和input相同
    var inputWidth = $("#contentQuery").css("width");
    $("#typeQuery").css("width", inputWidth);
    $("#statusQuery").css("width", inputWidth);
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
            queryById(row.id, row.remark);
        },
        columns: [{
            field: 'id',
            align: 'left',
            title: 'id',
            width: '60',
            visible: false
        }, {
            field: 'content',
            align: 'left',
            title: '反馈内容',
            width: '80'
        }, {
            field: 'imgPath',
            align: 'center',
            title: '反馈图片',
            width: '80',
            formatter:function(value,row,index){
                return '<a href="'+value+'" title="'+row.photo+'" data-gallery=""><img  src="'+value+'" class="img-rounded"  style="width: 50px;height: 50px;"></a>'
            }
        }, {
            field: 'type',
            align: 'center',
            title: '反馈问题类型',
            width: '80'
        }, {
            field: 'contact',
            align: 'center',
            title: '联系方式',
            width: '80'
        }, {
            field: 'remark',
            align: 'center',
            title: '处理结果',
            width: '80'
        },{
            field: 'status',
            align: 'center',
            title: '状态',
            width: '80',
            formatter: changeStuats
        },{
            field: 'createTime',
            align: 'center',
            title: '创建时间',
            width: '80'
        }, {
            field: 'updateUser',
            align: 'center',
            title: '处理人',
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
            content: "%" + $("#contentQuery").val() + "%",
            type: "%" + $("#typeQuery").val() + "%",
            status: "%" + $("#statusQuery").val() + "%"
        };
        return temp;
    }


    $("#typeQuery").select2({
        placeholder: '请选择反馈问题类型',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });

    $("#statusQuery").select2({
        placeholder: '请选择处理状态',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });

    function changeStuats(value, row, index) {
        var result = "";
        if (value == 1) {
            result += "<span class='badge badge-danger' style='padding: 6px'>正在处理</span>";
        } else if (value == 2) {
            result += "<span class='badge badge-primary' style='padding: 6px'>已处理</span>";
        }
        return result;
    }
});
//关闭模态窗口删除数据和表单验证样式
$('#myModa15').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
    $("#remark").val("");
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
            , photo: {
                validators: {
                    notEmpty: {
                        message: '刊物封面不能为空'
                    }
                }
            }
            , pdf: {
                validators: {
                    notEmpty: {
                        message: '刊物PDF不能为空'
                    }
                }
            }
        }
    });
}

$("#saveInfo").click(function () {
    $("#saveInfo").attr("disabled",true);
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    if (defalutForm.isValid()) {
        $.ajax({
            url: "../feedback/handleInfo",
            type: "post",
            data: {
                id: $("#id").val(),
                remark: $("#remark").val()
            },
            success: function (data) {
                $("#saveInfo").removeAttr("disabled");
                $("#myModa12").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../feedback/query'});
            }
        });
    }
});

function queryById(id,remark) {
    $("#handle").click();
    $("#saveInfo").prop("disabled", true);
    $("#remark").attr("readonly","readonly");
    $("#remark").val(remark);
}

//修改信息
function changeUsed(id) {
    $("#handle").click();
    $("#saveInfo").prop("disabled", false);
    $("#remark").val("").removeAttr("readonly");
    $("#id").val(id);
}

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#xyList").bootstrapTable('refresh', {url: '../feedback/query'});
});

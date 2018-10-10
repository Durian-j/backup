//列表展示毕业生名册
$(document).ready(function(){
    //设置select2宽度和input相同
    var inputWidth = $("#nameQuery").css("width");
    $("#xlxz").css("width", inputWidth);
    $("#yxxz").css("width", inputWidth);
    $("#zymcxz").css("width", inputWidth);
    $("#xbxz").css("width", parseInt(inputWidth) / 2);
    $("#search").css("width", parseInt(inputWidth) / 2);

    var search_top_content_height = parseInt($("#top-content").css("height")) + 10;
    $("#sbInfo").css("height", $(window).height() - 240);
    $("#sbInfo").css("overflow-y", "scroll");

    $("#sbInfoAdd").css("height", $(window).height() - 240);
    $("#sbInfoAdd").css("overflow-y", "scroll");

    //表单效验
    formValidator();
    //初始化Table
    $('#xyList').bootstrapTable({
        url: '',         //请求后台的URL
        method: 'post',                      //请求方式
        toolbar: '#exportExcel',               //工具按钮用哪个容器
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
        pagination: true,                   //是否显示分页
        sortable: false,                     //是否启用排序
        sortOrder: "asc",                   //排序方式
        queryParams : queryParams,
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
            queryById(row.id,row.name);
        },
        columns: [{
            title:'全选',
            field:'select',
            //复选框
            checkbox:true,
            width:25,
            align:'center',
            valign:'middle',
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
            field: 'sex',
            align: 'center',
            title: '性别',
            width: '40'
        }, {
            field: 'mz',
            align: 'center',
            title: '民族',
            width: '80'
        },{
            field: 'zzmm',
            align: 'center',
            title: '政治面貌',
            width: '40'
        },{
            field: 'csrq',
            align: 'center',
            title: '出身日期',
            width: '80'
        }, {
            field: 'yxmc',
            align: 'center',
            title: '院系',
            width: '120'
        }, {
            field: 'zymc',
            align: 'center',
            title: '专业名称',
            width: '120'
        }, {
            field: 'bh',
            align: 'center',
            title: '班号',
            width: '80'
        }, {
            field: 'dsxm',
            align: 'center',
            title: '导师姓名',
            width: '80'
        }, {
            field: 'ybyyx',
            align: 'center',
            title: '原毕业院校',
            width: '120'
        }, {
            field: 'xl',
            align: 'center',
            title: '学历',
            width: '80'
        }, {
            field: 'rxrq',
            align: 'center',
            title: '入学日期',
            width: '80'
        }, {
            field: 'bysj',
            align: 'center',
            title: '毕业日期',
            width: '80'
        }, {
            field: 'registerTime',
            align: 'center',
            title: '注册日期',
            width: '130'
        }, {
            field:'ID',
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
            name:  "%"+$("#nameQuery").val()+"%",
            rxrq: "%"+$("#rxrqQuery").val()+"%",
            fy: "%"+$("#yxxz").val()+"%",
            zymc: $("#zymcxz").val()||"%%",
            bh: "%"+$("#bhQuery").val()+"%",
            xl: "%"+$("#xlxz").val()+"%",
            dsxm: "%"+$("#dsxmQuery").val()+"%",
            sex: "%"+$("#xbxz").val()+"%"
        };
        return temp;
    }

    //获取院系下拉框数据
    var yxmc_data=[];
    $.ajax({
        url: "../queryYxList",
        async: false,
        success: function (data) {
            yxmc_data=data;
        }

    });
    //院系选择下拉框初始化
    $("#yxxz").select2({
        data: yxmc_data,
        placeholder:'请选择院系名称',
        allowClear:false,
        language: "zh-CN"
    });
    $("#fy").select2({
        data: yxmc_data,
        placeholder:'请选择院系名称',
        allowClear:true,
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
    $("#zymc").select2({
        data: [],
        disabled: true,
        placeholder:'请选择院系名称',
        allowClear:true,
        language: "zh-CN"
    });

    //学历初始化
    $("#xlxz").select2({
        placeholder:'请选择学历',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#xl").select2({
        placeholder:'请选择学历',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });

    //性别初始化
    $("#xbxz").select2({
        placeholder:'请选择性别',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#sex").select2({
        placeholder:'请选择性别',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#sexsbAdd").select2({
        placeholder:'请选择性别',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    //获取工作类型下拉框数据
    var gzlx_data=[];
    $.ajax({
        url: "../queryGzlxList",
        async: false,
        success: function (data) {
            gzlx_data=data;
        }

    });
    //工作类型选择下拉框初始化
    $("#gzlx").select2({
        data: gzlx_data,
        placeholder:'请选择工作类型名称',
        allowClear:true,
        language: "zh-CN"
    });
    //获取工作职务下拉框数据
    var gzzw_data=[];
    $.ajax({
        url: "../queryZwList",
        async: false,
        success: function (data) {
            gzzw_data=data;
        }

    });
    //工作职务选择下拉框初始化
    $("#gzzw").select2({
        data: gzzw_data,
        placeholder:'请选择工作职务名称',
        allowClear:true,
        language: "zh-CN"
    });
    //获取行业下拉框数据
    var hy_data=[];
    $.ajax({
        url: "../queryHyList",
        async: false,
        success: function (data) {
            hy_data=data;
        }

    });
    //从事行业选择下拉框初始化
    $("#cshy").select2({
        data: hy_data,
        placeholder:'请选择从事行业名称',
        allowClear:true,
        language: "zh-CN"
    });
    //关注行业选择下拉框初始化
    $("#gzhy").select2({
        data: hy_data,
        placeholder:'请选择关注行业名称',
        allowClear:true,
        language: "zh-CN"
    });
    //工作状态初始化
    $("#gzzt").select2({
        placeholder:'请选择工作状态',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
});
//关闭模态窗口删除数据和表单验证样式
$('#myModa15').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
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
    $("#bys").bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            phone: {
                message: '手机号码不合法',
                validators: {
                    notEmpty: {
                        message: '手机号码不能为空'
                    },
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    },
                }
            }
            , email: {
                validators: {
                    notEmpty: {
                        message: '邮箱不能为空'
                    }, stringLength: {
                        min: 4,
                        max: 60,
                        message: '请输入4到60个字符'
                    }
                }
            }
            , gzdw: {
                validators: {
                    notEmpty: {
                        message: '工作单位不能为空'
                    }, stringLength: {
                        min: 2,
                        max: 20,
                        message: '请输入2到20个字符'
                    }
                }
            }
            , gzlx: {
                validators: {
                    notEmpty: {
                        message: '工作类型不能为空'
                    }
                }
            }
            , gzzw: {
                validators: {
                    notEmpty: {
                        message: '工作职务不能为空'
                    }
                }
            }
            , gzzt: {
                validators: {
                    notEmpty: {
                        message: '工作状态不能为空'
                    }
                }
            }
            , cshy: {
                validators: {
                    notEmpty: {
                        message: '从事行业不能为空'
                    }
                }
            }
            , gzhy: {
                validators: {
                    notEmpty: {
                        message: '关注行业不能为空'
                    }
                }
            }
            , xqah: {
                validators: {
                    notEmpty: {
                        message: '兴趣爱好不能为空'
                    }
                }
            }
        }
    });
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

$("#fy").change(function(){
    // 先清空第二个
    $("#zymc").empty();
    var collegeNow = $("#fy").val();
    if(collegeNow) {
        $("#zymc").prop("disabled", false);
    }else{
        $("#zymc").prop("disabled", true);
    }
    var zymc_data=[];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
        },
        success: function (data) {
            zymc_data=data;
        }
    });
    //专业名称选择下拉框初始化
    $("#zymc").select2({
        data: zymc_data,
        placeholder:'请选择院系名称',
        allowClear:true,
        language: "zh-CN"
    });
});

//操作栏的格式化
// function actionFormatter(value, row, index) {
//     var id = row.id;
//     var name = row.name;
//     var result = "";
//     result += "<button href='javascript:;' class='btn btn-xs btn-info' style='display: none' onclick=\"queryById('" + id + "', '"+ name +"')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"EditViewById('" + id + "', '"+ name +"')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
//     return result;
// };

$("#saveInfo").click(function () {
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    if(defalutForm.isValid()) {
        $.ajax({
            url: "../xy/saveXyInfo",
            type: "post",
            data: {
                sid: $("#id").val(),
                phone: $("#phone").val(),
                email: $("#email").val(),
                qtlxfs: $("#qtlxfs").val(),
                xsdfxyh: $("#xsdfxyh").val(),
                xyhzw: $("#xyhzw").val(),
                gzdw: $("#gzdw").val(),
                gzlx: $("#gzlx").val(),
                gzzw: $("#gzzw").val(),
                gzzt: $("#gzzt").val(),
                gzzc: $("#gzzc").val(),
                cshy: $("#cshy").val(),
                gzhy: $("#gzhy").val(),
                shjz: $("#shjz").val(),
                xqah: $("#xqah").val(),
                zytc: $("#zytc").val(),
                grjj: $("#grjj").val(),
                remark: $("#remark").val()
            },
            success: function (data) {
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../xy/query'});
            }
        });
    }
});

//根据搜索条件查询校友信息
$("#search").click(function(params){
    $("#xyList").bootstrapTable('refresh', {url: '../xy/query'});
});

//新增信息
// $("#exlExport").click(function () {
//     var data = {
//         name:  "%"+$("#nameQuery").val()+"%",
//         rxrq: "%"+$("#rxrqQuery").val()+"%",
//         fy: "%"+$("#yxxz").val()+"%",
//         zymc: $("#zymcxz").val()||"%%",
//         bh: "%"+$("#bhQuery").val()+"%",
//         xl: "%"+$("#xlxz").val()+"%",
//         dsxm: "%"+$("#dsxmQuery").val()+"%",
//         sex: "%"+$("#xbxz").val()+"%"
//     };
//     $.ajax({
//         type : "POST",
//         url: "../corporation/exportExcel",
//         // data : data,
//         data : JSON.stringify(data),
//         contentType : "application/json",
//         dataType : "json",
//         success: function (result) {
//             $("#myModa15").modal('hide');
//             layer.msg(result.data);
//             $("#xyList").bootstrapTable('refresh', {url: '../alumniInstitutions/init'});
//         }
//     });
// });
function exportExl() {
    var name = $("#nameQuery").val();
    var rxrq = $("#rxrqQuery").val();
    var fy = $("#yxxz").val();
    var zymc = $("#zymcxz").val();
    var bh = $("#bhQuery").val();
    var xl = $("#xlxz").val();
    var dsxm = $("#dsxmQuery").val();
    var sex = $("#xbxz").val();
    var toUrl = "../corporation/exportExcel?name =" + name + "&rxrq=" + rxrq + "&fy=" + fy + "&zymc=" + zymc + "&bh=" + bh + "&xl=" + xl + "&dsxm=" + dsxm + "&sex=" + sex;
    $("#exl").attr("href", toUrl);
}
//根据ID查看校友详细信息
function queryById(id,name) {
    $(".tab-pane .form-control").prop("readonly",true);
    $("#saveInfo").hide();

    queryUtil(id,name);
}
//修改信息
function EditViewById(id,name) {
    $(".tab-pane .form-control").prop("readonly",false);
    $("#saveInfo").show();
    $("#closeInfo").show();

    queryUtil(id,name);
}

//通过ID查询详细信息公共方法
function queryUtil(id,name){
    $("#queryBk").click();
    //TODO 需要清空表单
    $("#bys")[0].reset();
    $("#name").val(name);
    $.ajax({
        url: "../xy/queryById",
        type: "post",
        data: {
            sid: id
        },
        success: function (data) {
            $("#id").val(data[0].sid);
            var zymc_data = [];
            $.ajax({
                url: "../queryZymcList",
                async: false,
                data: {
                    collegeNow: data[0].fy
                },
                success: function (data) {
                    zymc_data = data;
                }
            });
            //专业名称选择下拉框初始化
            $("#zymc").select2({
                data: zymc_data,
                placeholder: '请选择院系名称',
                allowClear: true,
                language: "zh-CN"
            });
            $("#id").val(data[0].sid);
            $("#phone").val(data[0].phone);
            $("#email").val(data[0].email);
            $("#qtlxfs").val(data[0].qtlxfs);
            $("#xsdfxyh").val(data[0].xsdfxyh);
            $("#xyhzw").val(data[0].xyhzw);
            $("#gzdw").val(data[0].gzdw);
            $("#gzlx").val(data[0].gzlx).select2();
            $("#gzzw").val(data[0].gzzw).select2();
            $("#gzzt").val(data[0].gzzt).select2();
            $("#gzzc").val(data[0].gzzc);
            $("#cshy").val(data[0].cshy).select2();
            $("#gzhy").val(data[0].gzhy).select2();
            $("#shjz").val(data[0].shjz);
            $("#xqah").val(data[0].xqah);
            $("#zytc").val(data[0].zytc);
            $("#grjj").val(data[0].grjj);
            $("#remark").val(data[0].remark);

        }
    });
}


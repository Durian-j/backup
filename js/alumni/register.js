//模态窗口中select2获取焦点
// $.fn.modal.Constructor.prototype.enforceFocus = function () {};

//列表展示毕业生名册
$(document).ready(function () {
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
        height: 600,                    //行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        onDblClickRow: function (row) {
            //校友信息详情页面
            // $("#queryBk").click();
            queryById(row.id, row.xl);
            // $(this).find('td:eq(0) input').prop('checked', true);
            // $(this).find("checkbox").attr("check",true);
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
            title: '校友编号',
            width: '60'
        }, {
            field: 'name',
            align: 'left',
            title: '姓名',
            width: '60'
        }, {
            field: 'sex',
            align: 'center',
            title: '性别',
            width: '40'
        }, {
            field: 'mz',
            align: 'center',
            title: '民族',
            width: '60'
        }, {
            field: 'zzmm',
            align: 'center',
            title: '政治面貌',
            width: '40'
        }, {
            field: 'csrq',
            align: 'center',
            title: '出身日期',
            width: '80'
        }, {
            field: 'yxmc',
            align: 'center',
            title: '院系',
            width: '130'
        }, {
            field: 'zymc',
            align: 'center',
            title: '专业名称',
            width: '160'
        }, {
            field: 'bh',
            align: 'center',
            title: '班号',
            width: '60'
        }, {
            field: 'dsxm',
            align: 'center',
            title: '导师姓名',
            width: '60'
        }, {
            field: 'ybyyx',
            align: 'center',
            title: '原毕业院校',
            width: '100'
        }, {
            field: 'xl',
            align: 'center',
            title: '学历学位',
            width: '60'
        }, {
            field: 'rxrq',
            align: 'center',
            title: '入学日期',
            width: '80'
        }, {
            field: 'status',
            align: 'center',
            title: '状态',
            width: '60',
            formatter: changeStuats
        }, {
            field: 'ID',
            title: '操作',
            width: 100,
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
            rxrq: "%" + $("#rxrqQuery").val() + "%",
            fy: "%" + $("#yxxz").val() + "%",
            zymc: $("#zymcxz").val() || "%%",
            bh: "%" + $("#bhQuery").val() + "%",
            xl: "%" + $("#xlxz").val() + "%",
            dsxm: "%" + $("#dsxmQuery").val() + "%",
            sex: "%" + $("#xbxz").val() + "%"
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
    $("#mzAdd").select2({
        data: mz_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#mzsb").select2({
        data: mz_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#mzsbAdd").select2({
        data: mz_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    //获取政治面貌下拉框数据
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
    $("#zzmmAdd").select2({
        data: zzmm_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zzmmsb").select2({
        data: zzmm_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zzmmsbAdd").select2({
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
    $("#yxxz option[index='0']").attr("selected", true);
    $("#fy").select2({
        data: yxmc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#fyAdd").select2({
        data: yxmc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#yxmcsbAdd").select2({
        data: yxmc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#yxmcsb").select2({
        data: yxmc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
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
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zymcAdd").select2({
        data: [],
        disabled: true,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zymcsb").select2({
        data: [],
        disabled: true,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zymcsbAdd").select2({
        data: [],
        disabled: true,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });

    //学历初始化
    $("#xlxz").select2({
        placeholder: '请选择学历',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1,
    });
    $("#xlxzsb").select2({
        placeholder: '请选择学历',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#xwlx").select2({
        placeholder: '请选择学历',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });


    //性别初始化
    $("#xbxz").select2({
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1,
    });
    $("#sex").select2({
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#sexsb").select2({
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#sexsbAdd").select2({
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
});


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

$("#fy").change(function () {
    // 先清空第二个
    $("#zymc").empty();
    var collegeNow = $("#fy").val();
    if (collegeNow) {
        $("#zymc").prop("disabled", false);
    } else {
        $("#zymc").prop("disabled", true);
    }
    var zymc_data = [];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
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
});

$("#fyAdd").change(function () {
    // 先清空第二个
    $("#zymcAdd").empty();
    var collegeNow = $("#fyAdd").val();
    if (collegeNow) {
        $("#zymcAdd").prop("disabled", false);
    } else {
        $("#zymcAdd").prop("disabled", true);
    }
    var zymc_data = [];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
        },
        success: function (data) {
            zymc_data = data;
        }
    });
    //专业名称选择下拉框初始化
    $("#zymcAdd").select2({
        data: zymc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
});
$("#yxmcsb").change(function () {
    // 先清空第二个
    $("#zymcsb").empty();
    var collegeNow = $("#yxmcsb").val();
    if (collegeNow) {
        $("#zymcsb").prop("disabled", false);
    } else {
        $("#zymcsb").prop("disabled", true);
    }
    var zymc_data = [];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
        },
        success: function (data) {
            zymc_data = data;
        }
    });
    //专业名称选择下拉框初始化
    $("#zymcsb").select2({
        data: zymc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
});

$("#yxmcsbAdd").change(function () {
    // 先清空第二个
    $("#zymcsbAdd").empty();
    var collegeNow = $("#yxmcsbAdd").val();
    if (collegeNow) {
        $("#zymcsbAdd").prop("disabled", false);
    } else {
        $("#zymcsbAdd").prop("disabled", true);
    }
    var zymc_data = [];
    $.ajax({
        url: "../queryZymcList",
        async: false,
        data: {
            collegeNow: collegeNow
        },
        success: function (data) {
            zymc_data = data;
        }
    });
    //专业名称选择下拉框初始化
    $("#zymcsbAdd").select2({
        data: zymc_data,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
});

function changeStuats(value, row, index) {
    var result = "";
    if (value == -1) {
        result += "<span class='badge badge-danger' style='padding: 3px'>未注册</span>";
    } else if (value == 1) {
        result += "<span class='badge badge-primary' style='padding: 3px'>已注册</span>";
    }
    return result;
}

//操作栏的格式化
// function actionFormatter(value, row, index) {
//     var id = row.id;
//     var xl = row.xl;
//     var result = "";
//     // result += "<button href='javascript:;' class='btn btn-xs btn-info' onclick=\"queryById('" + id + "', '"+ xl +"')\" title='查看'><span class='glyphicon glyphicon-search'>查看</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"EditViewById('" + id + "', '" + xl + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
//     result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";
//
//     return result;
// };

//tab index 1：第一个；2：第二个
var tab_index = 1;
//tab 切换获取下标
$("#bkInfoAdd").click(function () {
    tab_index = 1
});
$("#sbInfoAdd").click(function () {
    tab_index = 2
});

//保存新增信息
$("#saveInfoAdd").click(function () {
    if (tab_index == 2) {
        var name = $("#namesbAdd").val();
        var nj = $("#njAdd").val();
        var sex = $("#sexsbAdd").val();
        var csrq = $("#csrqsbAdd").val();
        var sfzhm = $("#sfzhmsbAdd").val();
        var yjfx = $("#yjfxAdd").val();
        var pylbmc = $("#pylbmcAdd").val();
        var jg = $("#jgsbAdd").val();
        var mz = $("#mzsbAdd").val();
        var zzmm = $("#zzmmsbAdd").val();
        var ybyyx = $("#ybyyxAdd").val();
        var ygzdw = $("#ygzdwAdd").val();
        var xz = $("#xzsbAdd").val();
        var lwtm = $("#lwtmAdd").val();
        var lwdbrq = $("#lwdbrqAdd").val();
        var bysj = $("#bysjAdd").val();
        var sxwrq = $("#sxwrqAdd").val();
        var xwlx = $("#xlxzsb").val();
        var dsxm = $("#dsxmAdd").val();
        var yxdm = $("#yxdmAdd").val();
        var yxmc = $("#yxmcsbAdd").val();
        var zydm = $("#zydmAdd").val();
        var zymc = $("#zymcsbAdd").val();
        var xxxs = $("#xxxssbAdd").val();
        var xiaozhang = $("#xiaozhangAdd").val();
        var pydwmc = $("#pydwmcAdd").val();
        var rxrq = $("#rxrqsbAdd").val();
        if(name=="" || typeof(name)=="undefined") {
            layer.alert('姓名不能为空');
            return false;
        }
        if(nj=="" || typeof(nj)=="undefined") {
            layer.alert('年级不能为空');
            return false;
        }
        if(sex=="" || typeof(sex)=="undefined") {
            layer.alert('性别不能为空');
            return false;
        }
        if(csrq=="" || typeof(csrq)=="undefined") {
            layer.alert('出生日期不能为空');
            return false;
        }
        if(jg=="" || typeof(jg)=="undefined") {
            layer.alert('籍贯不能为空');
            return false;
        }
        if(mz=="" || typeof(mz)=="undefined") {
            layer.alert('名族不能为空');
            return false;
        }
        if(zzmm=="" || typeof(zzmm)=="undefined") {
            layer.alert('政治面貌不能为空');
            return false;
        }
        if(ybyyx=="" || typeof(ybyyx)=="undefined") {
            layer.alert('原毕业院校不能为空');
            return false;
        }
        if(bysj=="" || typeof(bysj)=="undefined") {
            layer.alert('毕业时间不能为空');
            return false;
        }
        if(xwlx=="" || typeof(xwlx)=="undefined") {
            layer.alert('学位类型不能为空');
            return false;
        }
        if(dsxm=="" || typeof(dsxm)=="undefined") {
            layer.alert('导师姓名不能为空');
            return false;
        }
        if(yxmc=="" || typeof(yxmc)=="undefined") {
            layer.alert('院校名称不能为空');
            return false;
        }
        if(zymc=="" || typeof(zymc)=="undefined") {
            layer.alert('专业名称不能为空');
            return false;
        }
        if(rxrq=="" || typeof(rxrq)=="undefined") {
            layer.alert('入学日期不能为空');
            return false;
        }

        $.ajax({
            url: "../bys/insert/student/sb/info",
            type: "post",
            data: {
                name: name || "",
                nj: nj || "",
                sex: sex || "",
                csrq: csrq || "",
                sfzhm: sfzhm || "",
                yjfx: yjfx || "",
                pylbmc: pylbmc || "",
                jg: jg || "",
                mz: mz || "",
                zzmm: zzmm || "",
                ybyyx: ybyyx || "",
                ygzdw: ygzdw || "",
                xz: xz || "",
                lwtm: lwtm || "",
                lwdbrq: lwdbrq || "",
                bysj: bysj || "",
                sxwrq: sxwrq || "",
                xwlx: xwlx || "",
                dsxm: dsxm || "",
                yxdm: yxdm || "",
                yxmc: yxmc || "",
                zydm: zydm || "",
                zymc: zymc || "",
                xxxs: xxxs || "",
                xiaozhang: xiaozhang || "",
                pydwmc: pydwmc || "",
                rxrq: rxrq || ""
            },
            success: function (data) {
                $("#myModa12").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../bys/query'});
            }
        });
    }else if (tab_index == 1) {
        var name = $("#nameAdd").val();
        var sex = $("#sexAdd").val();
        var csrq = $("#csrqAdd").val();
        var sfzhm = $("#sfzhmAdd").val();
        var mz = $("#mzAdd").val();
        var zzmm = $("#zzmmAdd").val();
        var fy = $("#fyAdd").val();
        var zymc = $("#zymcAdd").val();
        var xh = $("#xhAdd").val();
        var bh = $("#bhAdd").val();
        var xxxs = $("#xxxsAdd").val();
        var xl = $("#xlAdd").val();
        var rxrq = $("#rxrqAdd").val();
        var byrq = $("#byrqAdd").val();
        var xz = $("#xzAdd").val();
        var bjyjl = $("#bjyjlAdd").val();
        var nj = $("#bynfAdd").val();
        var jg = $("#jgAdd").val();
        if(name=="" || typeof(name)=="undefined") {
            layer.alert('姓名不能为空');
            return false;
        }
        if(sex=="" || typeof(sex)=="undefined") {
            layer.alert('性别不能为空');
            return false;
        }
        if(csrq=="" || typeof(csrq)=="undefined") {
            layer.alert('出生日期不能为空');
            return false;
        }
        if(jg=="" || typeof(jg)=="undefined") {
            layer.alert('籍贯不能为空');
            return false;
        }
        if(mz=="" || typeof(mz)=="undefined") {
            layer.alert('名族不能为空');
            return false;
        }
        if(zzmm=="" || typeof(zzmm)=="undefined") {
            layer.alert('政治面貌不能为空');
            return false;
        }
        if(byrx=="" || typeof(byrx)=="undefined") {
            layer.alert('毕业日期不能为空');
            return false;
        }
        if(xl=="" || typeof(xl)=="undefined") {
            layer.alert('学历不能为空');
            return false;
        }
        if(bh=="" || typeof(bh)=="undefined") {
            layer.alert('班号不能为空');
            return false;
        }
        if(fy=="" || typeof(fy)=="undefined") {
            layer.alert('院校名称不能为空');
            return false;
        }
        if(zymc=="" || typeof(zymc)=="undefined") {
            layer.alert('专业名称不能为空');
            return false;
        }
        if(rxrq=="" || typeof(rxrq)=="undefined") {
            layer.alert('入校日期不能为空');
            return false;
        }
        if(nj=="" || typeof(nj)=="undefined") {
            layer.alert('毕业年份不能为空');
            return false;
        }
        $.ajax({
            url: "../bys/insert/student/bk/info",
            type: "post",
            data: {
                name: name || "",
                sex: sex || "",
                csrq: csrq || "",
                sfzhm: sfzhm || "",
                mz: mz || "",
                zzmm: zzmm || "",
                fy: fy || "",
                zymc: zymc || "",
                xh: xh || "",
                bh: bh || "",
                xxxs: xxxs || "",
                xl: xl || "",
                rxrq: rxrq || "",
                byrq: byrq || "",
                xz: xz || "",
                bjyjl: bjyjl || "",
                nj: nj || "",
                jg: jg || ""
            },
            success: function (data) {
                $("#myModa12").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../bys/query'});
            }
        });
    }
});

$("#saveInfo").click(function () {
    if (show_modal_xl_name == '本科') {
        $.ajax({
            url: "../bys/save/student/bk/info",
            type: "post",
            data: {
                id: $("#id").val() || "",
                name: $("#name").val() || "",
                sex: $("#sex").val() || "",
                csrq: $("#csrq").val() || "",
                sfzhm: $("#sfzhm").val() || "",
                mz: $("#mz").val() || "",
                zzmm: $("#zzmm").val() || "",
                // yxmc: $("#yxmc").val() || "",
                fy: $("#fy").val() || "",
                zymc: $("#zymc").val() || "",
                xh: $("#xh").val() || "",
                bh: $("#bh").val() || "",
                xxxs: $("#xxxs").val() || "",
                xl: $("#xl").val() || "",
                rxrq: $("#rxrq").val() || "",
                byrq: $("#byrq").val() || "",
                xz: $("#xz").val() || "",
                bjyjl: $("#bjyjl").val() || "",
                nj: $("#bknj").val() || "",
            },
            success: function (data) {
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../bys/query'});
            }
        });
    } else {
        $.ajax({
            url: "../bys/save/student/sb/info",
            type: "post",
            data: {
                id: $("#id").val() || "",
                name: $("#namesb").val() || "",
                nj: $("#nj").val() || "",
                sex: $("#sexsb").val() || "",
                csrq: $("#csrqsb").val() || "",
                sfzhm: $("#sfzhmsb").val() || "",
                yjfx: $("#yjfx").val() || "",
                pylbmc: $("#pylbmc").val() || "",
                jg: $("#jg").val() || "",
                mz: $("#mzsb").val() || "",
                zzmm: $("#zzmmsb").val() || "",
                ybyyx: $("#ybyyx").val() || "",
                ygzdw: $("#ygzdw").val() || "",
                xz: $("#xzsb").val() == null ? "" : $("#xzsb").val(),
                lwtm: $("#lwtm").val() || "",
                lwdbrq: $("#lwdbrq").val() || "",
                bysj: $("#bysj").val() || "",
                sxwrq: $("#sxwrq").val() || "",
                xwlx: $("#xwlx").val() || "",
                dsxm: $("#dsxm").val() || "",
                yxdm: $("#yxdm").val() || "",
                yxmc: $("#yxmcsb").val() || "",
                zydm: $("#zydm").val() || "",
                zymc: $("#zymcsb").val() || "",
                xxxs: $("#xxxssb").val() || "",
                xiaozhang: $("#xiaozhang").val() || "",
                pydwmc: $("#pydwmc").val() || "",
                rxrq: $("#rxrqsb").val() || ""
            },
            success: function (data) {
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../bys/query'});
            }
        });
    }

});

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#xyList").bootstrapTable('refresh', {url: '../bys/query'});
});

//新增信息
$("#serchBtn").click(function () {
    $("#querySb").click();
    $("#saveInfoAdd").show();
    $("#closeInfoAdd").show();
    $("#bysAdd")[0].reset();
    $(".tab-pane .form-control").prop("readonly", false);

    $("#sexAdd").prop("disabled", false);
    $("#fyAdd").prop("disabled", false);
    $("#sexsbAdd").prop("disabled", false);
    $("#sexAdd").select2({
        data: [],
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#sexsbAdd").select2({
        data: [],
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#fyAdd").select2({
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zymcAdd").select2({
        data: [],
        disabled: true,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zymcsbAdd").select2({
        data: [],
        disabled: true,
        placeholder: '请选择院系名称',
        allowClear: true,
        language: "zh-CN"
    });
    $("#zymcAdd").empty();

});

//根据ID查看校友详细信息
function queryById(id, xl) {
    $(".tab-pane .form-control").prop("readonly", true);
    $("#saveInfo").hide();
    // $("#closeInfo").hide();
    $("#zymc").prop("disabled", true);
    $("#sex").prop("disabled", true);
    $("#fy").prop("disabled", true);
    $("#sexsb").prop("disabled", true);
    $("#mz").prop("disabled", true);
    $("#zzmm").prop("disabled", true);
    queryUtil(id, xl);
}

//编辑毕业生信息对应的学历
var show_modal_xl_name = "";

//修改信息
function EditViewById(id, xl) {
    show_modal_xl_name = xl;
    $(".tab-pane .form-control").prop("readonly", false);
    $("#saveInfo").show();
    // $("#closeInfo").show();
    $("#zymc").prop("disabled", false);
    $("#sex").prop("disabled", false);
    $("#fy").prop("disabled", false);
    $("#sexsb").prop("disabled", false);
    $("#mz").prop("disabled", false);
    $("#zzmm").prop("disabled", false);
    queryUtil(id, xl);
}

//批量删除
function DeleteByIds(ids) {
    //获取所有被选中的记录
    var rows = $("#xyList").bootstrapTable('getSelections');
    if (rows.length > 1) {
        ids = "";
        for (var i = 0; i < rows.length; i++) {
            ids += rows[i]['id'] + ",";
        }
        ids = ids.substring(0, ids.length - 1);
    }
    deleteUser(ids);
}

//删除
function deleteUser(ids) {
    layer.alert('您真的确定要删除吗？', {
        time: 0 //不自动关闭
        , btn: ['确定', '取消']
        , yes: function (index) {
            layer.close(index);
            $.ajax({
                url: "../bys/delete",
                type: "post",
                data: {
                    ids: ids
                },
                success: function (data) {
                    // $("#myModa12").modal('hide');
                    layer.msg(data.data);

                    $("#xyList").bootstrapTable('refresh', {url: '../bys/query'});
                }
            });
        }
    });
}

//通过ID查询详细信息公共方法
function queryUtil(id, xl) {
    $("#queryBk").click();
    $('#myTab li').eq(1).addClass("active");
    $("#sbInfo").addClass("in active");
    $("#bys")[0].reset();
    //展示本科或者硕博信息
    if (xl == '本科') {
        $('#myTab li').eq(0).show();
        $('#myTab li').eq(1).hide();
        $("#bkInfo").show();
        $("#sbInfo").hide();
    } else {
        $('#myTab li').eq(1).show();
        $('#myTab li').eq(0).hide();
        $("#bkInfo").hide();
        $("#sbInfo").show();
    }
    $.ajax({
        url: "../bys/queryById",
        type: "post",
        data: {
            id: id,
            xl: xl
        },
        success: function (data) {
            $("#id").val(data[0].id);
            if (xl == '本科') {
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
                $("#name").val(data[0].name);
                $("#sex").val(data[0].sex).select2();
                $("#csrq").val(data[0].csrq);
                $("#sfzhm").val(data[0].sfzhm);
                $("#mz").val(data[0].mz).select2();
                $("#zzmm").val(data[0].zzmm).select2();
                $("#yxmc").val(data[0].yxmc);
                $("#xh").val(data[0].xh);
                $("#fy").val(data[0].fy).select2();
                $("#zymc").val(data[0].zymc).select2();
                $("#xxxs").val(data[0].xxxs);
                $("#xl").val(data[0].xl);
                $("#bh").val(data[0].bh);
                $("#rxrq").val(data[0].rxrq);
                $("#byrq").val(data[0].byrq);
                $("#xz").val(data[0].xz);
                $("#bjyjl").val(data[0].bjyjl);
                $("#bknj").val(data[0].nj);
            } else {
                $("#namesb").val(data[0].name);
                $("#sexsb").val(data[0].sex).select2();
                $("#csrq").val(data[0].csrq);
                $("#sfzhm").val(data[0].sfzhm);
                $("#mzsb").val(data[0].mz);
                $("#zzmmsb").val(data[0].zzmm);
                $("#nj").val(data[0].nj);
                $("#yjfx").val(data[0].yjfx);
                $("#pylbmc").val(data[0].pylbmc);
                $("#jg").val(data[0].jg);
                $("#ybyyx").val(data[0].ybyyx);
                $("#ygzdw").val(data[0].ygzdw);
                $("#xz").val(data[0].xz);
                $("#lwtm").val(data[0].lwtm);
                $("#lwdbrq").val(data[0].lwdbrq);
                $("#bysj").val(data[0].bysj);
                $("#sxwrq").val(data[0].sxwrq);
                $("#xwlx").val(data[0].xwlx).select2();
                $("#dsxm").val(data[0].dsxm);
                $("#xxxssb").val(data[0].xxxs);
                $("#yxdm").val(data[0].yxdm);
                $("#yxmcsb").val(data[0].yxmc).select2();
                $("#zydm").val(data[0].zydm);
                $("#zymcsb").val(data[0].zymc).select2();
                $("#xiaozhang").val(data[0].xiaozhang);
                $("#pydwmc").val(data[0].pydwmc);
                $("#rxrqsb").val(data[0].rxrq);
            }
        }
    });
}


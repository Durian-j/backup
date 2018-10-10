//列表展示毕业生名册
$(document).ready(function () {
    //设置select2宽度和input相同
    var inputWidth = $("#nameQuery").css("width");
    // $("#areaQuery").css("width", inputWidth);
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
            title: '会员名',
            width: '80'
        }, {
            field: 'zw',
            align: 'left',
            title: '职位',
            width: '80'
        }, {
            field: 'institutionsName',
            align: 'left',
            title: '所属机构',
            width: '80'
        }, {
            field: 'userId',
            align: 'center',
            title: '校友编号',
            width: '80',
            visible: false
        }, {
            field: 'joinTime',
            align: 'center',
            title: '加入时间',
            width: '80'
        }, {
            field: 'phone',
            align: 'center',
            title: '手机号码',
            width: '80'
        }, {
            field: 'email',
            align: 'center',
            title: '邮箱',
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

    $('#menuList').jstree({
        "plugins": ["types"],
        'core': {
            "check_callback": true,
            'data': function (obj, callback) {
                var jsonstr = "[]";
                var jsonarray = eval('(' + jsonstr + ')');
                $.ajax({
                    type: "GET",
                    url: "../communityMembers/getcitylist",
                    dataType: "json",
                    async: false,
                    success: function (result) {
                        var arrays = result.data;
                        for (var i = 0; i < arrays.length; i++) {
                            var arr = {
                                "id": arrays[i].id,
                                "parent": arrays[i].parent,
                                "text": arrays[i].text,
                                "state": {"opened": true}
                            }
                            jsonarray.push(arr);
                        }
                    }

                });
                callback.call(this, jsonarray);
            },
            'themes': {
                'name': 'proton',
                'responsive': true
            }
        }
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
            area: "%" + $("#areaQuery").val() + "%",
            parent: $("#parentQuery").val(),
            id: $("#idQuery").val()
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

    var zw_data = [];
    $.ajax({
        url: "../queryXyhzwList",
        async: false,
        success: function (data) {
            zw_data = data;
        }

    });
    //校友机构选择下拉框初始化
    $("#zw").select2({
        data: zw_data,
        placeholder: '请选择校友机构',
        allowClear: true,
        language: "zh-CN"
    });

    var yxmc_data = [];
    $.ajax({
        url: "../communityMembers/getInstitutionsList",
        async: false,
        success: function (data) {
            yxmc_data = data;
        }

    });
    //校友机构选择下拉框初始化
    $("#institutionsId").select2({
        data: yxmc_data,
        placeholder: '请选择校友机构',
        allowClear: true,
        language: "zh-CN"
    });
    $("#areaQuery").select2({
        data: yxmc_data,
        placeholder: '请选择校友机构',
        allowClear: true,
        language: "zh-CN"
    });

    $("#userId").select2({
        multiple: false,
        language : "zh-CN",
        placeholder: "请输入校友姓名",
        ajax: {
            url: "../communityMembers/getIdNameList",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    name: params.term
                };
            },
            processResults: function (data) {
                return {
                    results: data.data
                };
            },
            cache: false
        },
        escapeMarkup: function (markup) { return markup; },
        minimumInputLength: 1,
    });
});
$("#userId").change(function () {
    $.ajax({
        url: "../communityMembers/queryPhoneById",
        type: "post",
        data: {
            idAndName: $("#userId").val()
        },
        success: function (data) {
            $("#bys")[0].reset();
            $("#phone").val(data.phone);
            $("#email").val(data.email);
        }
    });
});
$('#menuList').bind("activate_node.jstree", function (obj, e) {
    var currentNode = e.node;
    var id = currentNode.id;
    var parent = currentNode.parent;

    if(parent=='#' || parent=='999999' ){
        return;
    }else{
        $("#idQuery").val(id);
        $("#parentQuery").val(parent);
        $("#xyList").bootstrapTable('refresh', {url: '../communityMembers/init'});
    }
});

//关闭模态窗口删除数据和表单验证样式
$('#myModa15').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
    $("#institutionsId").select2({
        data: [],
        placeholder: '请选择所属机构',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#zw").select2({
        data: [],
        placeholder: '请选择所属机构',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#userId").empty();
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
            userId: {
                validators: {
                    notEmpty: {
                        message: '校友信息不能为空'
                    }
                }
            }
            , zw: {
                validators: {
                    notEmpty: {
                        message: '职务不能为空'
                    }
                }
            }
            , institutionsId: {
                validators: {
                    notEmpty: {
                        message: '所属ID不能为空'
                    }
                }
            }
            , phone: {
                validators: {
                    stringLength: {
                        min: 11,
                        max: 11,
                        message: '请输入11位手机号码'
                    }
                }
            }
            , email: {
                validators: {
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '请输入2~16个字符'
                    }
                }
            }
        }
    });
}

//新增信息
$("#serchBtn").click(function () {
    $("#addXykw").click();
    $("#bys")[0].reset();
    $("#saveInfo").show();
    $("#name").prop("disabled", false);
    $("#area").prop("disabled", false);
    $("#parentId").prop("disabled", false);
});

$("#saveInfo").click(function () {
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    if (defalutForm.isValid()) {
        $.ajax({
            url: "../communityMembers/saveInfo",
            method: 'POST',
            processData: false,
            contentType: false,
            data: new FormData($('#bys')[0]),
            success: function (data) {
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#xyList").bootstrapTable('refresh', {url: '../communityMembers/init'});
            }
        });
    }
});

function queryById(id) {
    $("#addXykw").click();
    $("#saveInfo").hide();
    $("#name").prop("disabled", true);
    $("#area").prop("disabled", true);
    $("#parentId").prop("disabled", true);
    queryUtil(id);
}

//修改信息
function EditViewById(id) {
    $("#addXykw").click();
    $("#saveInfo").show();
    $("#name").prop("disabled", false);
    $("#area").prop("disabled", false);
    $("#parentId").prop("disabled", false);
    queryUtil(id);
}

// //操作栏的格式化
// function actionFormatter(value, row, index) {
//     var id = row.id;
//     var result = "";
//     result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"EditViewById('" + id + "')\" title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
//     // result += "<button href='javascript:;' class='btn btn-xs btn-danger' style='margin-left: 3px' onclick=\"DeleteByIds('" + id + "')\" title='删除'><span class='glyphicon glyphicon-remove'>删除</span></button>";
//
//     return result;
// };

//根据搜索条件查询校友信息
$("#search").click(function (params) {
    $("#idQuery").val("");
    // $(".jstree-clicked").removeClass();
    $("#xyList").bootstrapTable('refresh', {url: '../communityMembers/init'});
});

//通过ID查询详细信息公共方法
function queryUtil(id) {
    $.ajax({
        url: "../communityMembers/queryById",
        type: "post",
        data: {
            id: id
        },
        success: function (data) {
            $("#bys")[0].reset();
            $("#id").val(data.data[0].id);
            $("#name").val(data.data[0].name);
            $("#userId").append("<option value='"+data.data[0].userid+"'>"+data.data[0].text+"</option>");
            $("#zw").val(data.data[0].zw).select2();
            $("#phone").val(data.data[0].phone);
            $("#email").val(data.data[0].email);
            $("#institutionsId").val(data.data[0].institutionsId).select2();


        }
    });
}

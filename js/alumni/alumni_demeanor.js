//列表展示毕业生名册
$(document).ready(function () {
    //设置select2宽度和input相同
    var inputWidth = $("#nameQuery").css("width");
    $("#groupQuery").css("width", inputWidth);
    $("#search").css("width", parseInt(inputWidth) / 2);
    // var search_top_content_height = parseInt($("#top-content").css("height")) + 10;
    //表单效验
    formValidator();

    //富文本框初始化
    $("#summernote").summernote({
         //不建议填写，如果上传图片高度比较大，编辑器则不会自动调整高度的
        focus: true,  //启动时自动获取焦点
        maxHeight: null,  //编辑器最大高度
        minHeight: 300,//编辑器最小高度，会跟随内容和图片大小自动调整编辑器高度
        placeholder: '说点什么吧',
        lang: 'zh-CN',
        callbacks: {
            onImageUpload: function (files, editor, $editable) {
                sendFile(files);
            }
        }
    });

    function sendFile(files, editor, $editable) {
        var data = new FormData();
        data.append("imgFile", files[0]);
        $.ajax({
            data: data,
            type: "POST",
            url: "../alumniDemeanor/saveImageFile", //图片上传出来的url，返回的是图片上传后的路径，http格式
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            success: function (data) {//data是返回的hash,key之类的值，key是定义的文件名
                $('#summernote').summernote('insertImage', data.data);
                $("#photo").val(data.data);
            },
            error: function () {
                alert("上传失败");
            }
        });
    }

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
            field: 'sid',
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
            field: 'describe',
            align: 'left',
            title: '描述',
            width: '60',
            visible: false
        }, {
            field: 'groupid',
            align: 'center',
            title: '校友组别',
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
            groupid: "%" + $("#groupQuery").val() + "%"
        };
        return temp;
    }

    //获取校友组别下拉框数据
    var group_data = [];
    $.ajax({
        url: "../queryXyzbList",
        async: false,
        success: function (data) {
            group_data = data;
        }
    });
    //校友组别初始化
    $("#groupQuery").select2({
        data: group_data,
        placeholder: '请选择校友组别',
        allowClear: true,
        language: "zh-CN"
    });
    $("#group").select2({
        data: group_data,
        placeholder: '请选择校友组别',
        allowClear: true,
        language: "zh-CN"
    });
});

//新增信息
$("#serchBtn").click(function () {
    // $("#bys").data("bootstrapValidator").resetForm();
    $("#addXyfc").click();
    $("#bys")[0].reset();
    $("#group").select2({
        data: [],
        placeholder: '请选择性别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#summernote").summernote('code','');

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
            sid: {
                message: '校友编号不合法',
                validators: {
                    notEmpty: {
                        message: '校友编号不能为空'
                    },
                    stringLength: {
                        min: 2,
                        max: 16,
                        message: '请输入2到16个字符'
                    },
                }
            }
            , group: {
                validators: {
                    notEmpty: {
                        message: '校友组别不能为空'
                    }
                }
            }
        }
    });
}
$('#myModa15').on('hidden.bs.modal', function() {
    $("#bys").data('bootstrapValidator').destroy();
    $('#bys').data('bootstrapValidator', null);
    $("#bys")[0].reset();
    $("#group").select2({
        data: [],
        placeholder: '请选择校友组别',
        allowClear: true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });
    $("#bys").removeData("previousValue");
    formValidator();
});

$("#saveInfo").click(function () {
    $("#saveInfo").attr("disabled",true);
    var defalutForm = $("#bys").data('bootstrapValidator');
    defalutForm.validate();
    if (defalutForm.isValid()) {
        var describe = $("#summernote").summernote('code');
        var photo = $("#photo").val();
        var sid = $("#sid").val();
        var groupid = $("#group").val();
        var id = $("#id").val();
        $.ajax({
            url: "../alumniDemeanor/addXyfcInfo",
            type: "post",
            data: {
                photo: photo,
                describe: describe,
                sid: sid,
                groupid: groupid,
                id: id
            },
            success: function (data) {
                $("#saveInfo").removeAttr("disabled");
                $("#myModa15").modal('hide');
                layer.msg(data.data);
                $("#bys")[0].reset();
                $("#xyList").bootstrapTable('refresh', {url: '../alumniDemeanor/query'});
            }
        });
    }
});

function queryById(id) {
    $("#addXyfc").click();
    queryUtil(id);

}

//修改信息
function EditViewById(id) {
    $("#addXyfc").click();
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
    $("#xyList").bootstrapTable('refresh', {url: '../alumniDemeanor/query'});
});

//通过ID查询详细信息公共方法
function queryUtil(id) {
    $.ajax({
        url: "../alumniDemeanor/queryById",
        type: "post",
        data: {
            id: id
        },
        success: function (data) {
            $("#bys")[0].reset();
            $("#id").val(data.data[0].id);
            $("#nameFc").val(data.data[0].name);
            $("#sid").val(data.data[0].sid);
            $("#group").val(data.data[0].groupid).select2();
            // $('#summernote').summernote('code', '');
            $('#summernote').summernote('code', data.data[0].describe);
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
                url: "../alumniDemeanor/delete",
                type: "post",
                data: {
                    id: id
                },
                success: function (data) {
                    layer.msg(data.data, function(){
                        if(data.retMsg == "失败") return;
                    });
                    $("#xyList").bootstrapTable('refresh', {url: '../alumniDemeanor/query'});
                }
            });
        }
    });
}
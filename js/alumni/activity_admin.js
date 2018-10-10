$(document).ready(function(){

    $('#q_hdsj').datepicker({
        language:"zh-CN",    //语言选择中文
        format:"yyyy-mm-dd", //格式化日期
        timepicker:true,     //关闭时间选项
        yearEnd:2999,        //设置最大年份
        autoclose: 1,        //选择完日期后，弹出框自动关闭
        startView:3,         //打开弹出框时，显示到什么格式,3代表月
        minView: 3,          //能选择到的最小日期格式
        clearBtn: true,
        todayHighlight: true,
    });

    $(".input-group-addon").click(function(){
        $('#q_hdsj').focus()
    })

    $("#id_hdzt").css("width",$("#q_hdzt").css("width"))
    $("#id_hdlx").css("width",$("#q_hdzt").css("width"))
    $("#search").css("width",parseInt($("#q_hdzt").css("width"))+56)

    $("#id_hdzt").select2({
        placeholder:'请选择活动状态',
        allowClear:true,
        language: "zh-CN",
        minimumResultsForSearch: -1
    });

    var hdlx_data=[];

    $.ajax({
        url: "../activity/getdichdlx",
        async: false,
        success: function (data) {
            hdlx_data=data.data;
        }
    });

    $("#id_hdlx").select2({
        data: hdlx_data,
        placeholder:'请选择活动类型',
        allowClear:true,
        language: "zh-CN",
    });


    //初始化Table
    $('#activity_table').bootstrapTable({
        // url: '/xy/query',         //请求后台的URL
        method: 'get',                      //请求方式
        toolbar:'#toolbar',
        striped: true,                      //是否显示行间隔色
        cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性
        pagination: true,                   //是否显示分页
        sortable: true,                     //是否启用排序
        sortOrder: "desc",                   //排序方式
        queryParams : queryParams,
        sidePagination: "server",           //分页方式：client客户端分页，server服务端分页
        pageNumber: 1,                       //初始化加载第一页，默认第一页
        pageSize: 10,                       //每页的记录行数
        pageList: [10, 20, 30, 40, 50],        //可供选择的每页的行数
        search: false,                       //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
        strictSearch: true,
        showColumns: false,                  //是否显示所有的列
        showRefresh: false,                  //是否显示刷新按钮
        clickToSelect: true,                //是否启用点击选中行
        height: $(window).height()*0.7,//行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
        uniqueId: "id",                     //每一行的唯一标识，一般为主键列
        showToggle: false,                    //是否显示详细视图和列表视图的切换按钮
        cardView: false,                    //是否显示详细视图
        detailView: false,                   //是否显示父子表
        onDblClickRow: function (row) {
            queryById(row.id);
        },
        columns: [{
            title:'活动编号',
            field:'id',
            align:'center',
            valign:'middle'
        },{
            title:'活动主题',
            field:'hdzt',
            align:'center',
            valign:'middle'
        },{
            title:'活动宣传照',
            field:'logo',
            align:'center',
            valign:'middle',
            formatter:function(value,row,index){
                var n = value.lastIndexOf(".");
                var j = value.substring(0,n)+'_100x100.'+value.substring(n+1,value.length);
                // value=value.replace(j,'_50x50.jpg');
                return '<a href="'+value+'" title="'+row.hdzt+'" data-gallery=""><img  src="'+j+'" class="img-rounded"  style="width: 50px;height: 50px;"></a>'
            },
        },{
            title:'活动时间',
            field:'hdsj',
            align:'center',
            valign:'middle'
        },{
            title:'活动地址',
            field:'address',
            valign:'middle'
        },{
            title:'活动详情',
            field:'hdxq',
            align:'center',
            valign:'middle'
        },{
            title:'活动发起人',
            field:'fqr',
            align:'center',
            valign:'middle'
        },{
            title:'活动组织人',
            field:'zzr',
            align:'center',
            valign:'middle'
        },{
            title:'报名情况',
            field:'bmqk',
            align:'center',
            valign:'middle'
        },{
            title:'当前状态',
            field:'status',
            align:'center',
            valign:'middle',
            formatter:function(value,row,index){
                if(value==1){
                    return "<label class='label label-info'>报名中</label>";
                }else if(value==2){
                    return "<label class='label label-danger'>活动中</label>";
                }else if(value==3){
                    return "<label class='label'>已结束</label>";
                }
            }
        },{
            field:'ID',
            title: '操作',
            width: 80,
            align: 'center',
            valign: 'middle',
            formatter: actionFormatter
            //     function(value,row,index){
            //     // if(row.fqr==$.cookie('username') || row.zzr==$.cookie('username')){
            //         if(row.status==3){
            //             return "<button href='javascript:;' class='btn btn-xs btn-primary'  title='编辑'><span class='glyphicon glyphicon-pencil'>编辑</span></button>";
            //         }else if(row.status ==1){
            //             return "<button href='javascript:;' class='btn btn-xs btn-primary' onclick=\"activityEnd('" + id + "')\" title='活动掠影'><span class='glyphicon glyphicon-pencil'>活动掠影</span></button>";
            //         }
            //     // }
            //     // return '--';
            // }
        }]
    });

    //操作栏的格式化
    // function actionFormatter(value, row, index) {
    //     var id = row.id;
    //     var result = "";
    //     if(row.status==3) {
    //         result += "<button href='javascript:;' class='btn btn-xs btn-primary' style='margin-left: 3px' onclick=\"activityEnd('" + id + "')\" title='上传掠影'><span class='glyphicon glyphicon-pencil'>上传掠影</span></button>";
    //     }
    //
    //     return result;
    // };

    function queryParams(params) {
        //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        var temp = {
            rows: params.limit,                         //页面大小
            page: (params.offset / params.limit) + 1,   //页码
            hdzt:"%"+$("#q_hdzt").val()+"%",
            hdsj:"%"+$("#q_hdsj").val()+"%",
            fqr:"%"+$("#q_fqr").val()+"%",
            status:"%"+$("#id_hdzt").val()+"%",
            hdlx:"%"+$("#id_hdlx").val()+"%"
        };
        return temp;
    }

    //查看活动详情
    function queryById(id){
        layer.open({
            type: 2,
            area: ['900px', '600px'],
            fixed: true, //不固定
            title:'活动详情',
            maxmin: true,
            content: '../activity/showInfo'+'?id='+id
            // content: '../activity/getinfobyid'+'#'+id
        });
    }

    //添加活动
    $("#addActivityBtn").click(function () {
        layer.open({
            type: 2,
            area: ['900px', '600px'],
            fixed: true, //不固定
            title:'添加活动',
            btn: ['发布活动', '取消'],
            maxmin: true,
            content: '../activity/showAdd',
            yes: function (add_index, layero) {
                //调用edit_shop页面的函数
                var iframeWin =  window[layero.find('iframe')[0]['name']];
                var flag = iframeWin.form_submit(); //调用子页面的form_submit函数
                if(flag){
                    layer.close(add_index);
                }
                $("#activity_table").bootstrapTable('refresh', {url: '../activity/search'});
            },
            no: function (add_index, layero) {
                layer.close(add_index);
            }
        });
    });


    //根据搜索条件查询校友信息
    $("#search").click(function(params){
        $("#activity_table").bootstrapTable('refresh', {url: '../activity/search'});
    });
});
//活动结束
function activityEnd(id) {
    layer.open({
        type: 2,
        area: ['900px', '600px'],
        fixed: true, //不固定
        title:'活动掠影',
        btn: ['上传照片', '取消'],
        maxmin: true,
        content: 'activity_end.html?id='+id,
        yes: function (add_index, layero) {
            //调用edit_shop页面的函数
            var iframeWin =  window[layero.find('iframe')[0]['name']];
            var flag = iframeWin.form_submit(); //调用子页面的form_submit函数
            if(flag){
                layer.close(add_index);
            }
        },
        no: function (add_index, layero) {
            layer.close(add_index);
        }
    });
}
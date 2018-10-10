$(document).ready(function () {

    //不能动 强制激活上传图片的控件
    $('#MyTab a:last').tab('show')
    $('#MyTab a:first').tab('show')

    form.bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            hdzt: {
                message: '用户名不合法',
                validators: {
                    notEmpty: {
                        message: '活动主题不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '请输入3到30个字符'
                    },
                }
            }
            , hdxq: {
                validators: {
                    notEmpty: {
                        message: '活动详情不能为空'
                    }
                }
            }, hdAddress: {
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        min: 4,
                        max: 100,
                        message: '请选择活动地址'
                    }
                }
            }, totalNumber: {
                validators: {
                    notEmpty: {
                        message: '请填写可参加活动人数'
                    }
                }
            }, fqr: {
                validators: {
                    notEmpty: {
                        message: '请填写活动发起人'
                    }
                }
            }, zzr: {
                validators: {
                    notEmpty: {
                        message: '请填写活动组织人'
                    }
                }
            }, kjfw: {
                validators: {
                    notEmpty: {
                        message: '请选择活动可见范围'
                    }
                }
            }, cjrlx: {
                validators: {
                    notEmpty: {
                        message: '请选择活动参加人类型'
                    }
                }
            }, startTime: {
                validators: {
                    notEmpty: {
                        message: '请选择活动开始时间'
                    }
                }
            }, endTime: {
                validators: {
                    notEmpty: {
                        message: '请选择活动结束时间'
                    }
                }
            }, stopTime: {
                validators: {
                    notEmpty: {
                        message: '请选择截止报名时间'
                    }
                }
            }
        }
    });

    zdForm.bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            hdzt: {
                message: '用户名不合法',
                validators: {
                    notEmpty: {
                        message: '活动主题不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 30,
                        message: '请输入3到30个字符'
                    },
                }
            }
            , hdxq: {
                validators: {
                    notEmpty: {
                        message: '活动详情不能为空'
                    }
                }
            }, hdAddress: {
                validators: {
                    notEmpty: {
                        message: '地址不能为空'
                    }, stringLength: {
                        min: 4,
                        max: 100,
                        message: '请选择活动地址'
                    }
                }
            }, totalNumber: {
                validators: {
                    notEmpty: {
                        message: '请填写可参加活动人数'
                    }
                }
            }, fqr: {
                validators: {
                    notEmpty: {
                        message: '请填写活动发起人'
                    }
                }
            }, zzr: {
                validators: {
                    notEmpty: {
                        message: '请填写活动组织人'
                    }
                }
            }, kjfw: {
                validators: {
                    notEmpty: {
                        message: '请选择活动可见范围'
                    }
                }
            }, hdcjr: {
                validators: {
                    notEmpty: {
                        message: '请选择活动参加人'
                    }
                }
            }
        }
    });

    var index = layer.msg('加载中', {
        icon: 16
        , shade: 0.01
    });


    var startTime;
    var endTime;
    var stopTime;
    $('#start_time').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyy-mm-dd hh:ii", //格式化日期
        autoclose: 1,        //选择完日期后，弹出框自动关闭
        startView: 2,         //打开弹出框时，显示到什么格式,3代表月
        todayHighlight: true,
        minuteStep: 5
    }).on('changeDate', function (ev) {
        startTime = ev.date.valueOf();
        if (endTime != null) {
            if (startTime > endTime) {
                layer.alert('“结束时间 ”不能早于“开始时间 ” ！', {icon: 5});
                $("#start_time").focus();
                $('#start_time').val("");
            }
        }
    }).on('hide', function (e) {
        form.data('bootstrapValidator')
            .updateStatus('startTime', 'NOT_VALIDATED', null)
            .validateField('startTime');
    });
    $('#end_time').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyy-mm-dd hh:ii", //格式化日期
        autoclose: 1,        //选择完日期后，弹出框自动关闭
        startView: 2,         //打开弹出框时，显示到什么格式,3代表月
        todayHighlight: true,
        minuteStep: 5
    }).on('changeDate', function (ev) {
        endTime = ev.date.valueOf();
        if (startTime != null) {
            if (startTime > endTime) {
                layer.alert('“结束时间 ”不能早于“开始时间 ” ！', {icon: 5});
                $("#end_time").focus();
                $('#end_time').val("");
            }
        }
    }).on('hide', function (e) {
        form.data('bootstrapValidator')
            .updateStatus('endTime', 'NOT_VALIDATED', null)
            .validateField('endTime');
    });
    $('#stop_time').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyy-mm-dd hh:ii", //格式化日期
        autoclose: 1,        //选择完日期后，弹出框自动关闭
        startView: 2,         //打开弹出框时，显示到什么格式,3代表月
        todayHighlight: true,
        minuteStep: 5
    }).on('changeDate', function (ev) {
        stopTime = ev.date.valueOf();
        if (endTime != null) {
            if (stopTime > endTime) {
                layer.alert('“报名截止时间”不能早于“活动结束时间 ” ！', {icon: 5});
                $("#stop_time").focus();
                $('#stop_time').val("");
            }
        }
    }).on('hide', function (e) {
        form.data('bootstrapValidator')
            .updateStatus('stopTime', 'NOT_VALIDATED', null)
            .validateField('stopTime');
    });



    $('#zd_start_time').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyy-mm-dd hh:ii", //格式化日期
        autoclose: 1,        //选择完日期后，弹出框自动关闭
        startView: 2,         //打开弹出框时，显示到什么格式,3代表月
        todayHighlight: true,
        minuteStep: 5
    }).on('changeDate', function (ev) {
        startTime = ev.date.valueOf();
        if (endTime != null) {
            if (startTime > endTime) {
                layer.alert('“结束时间 ”不能早于“开始时间 ” ！', {icon: 5});
                $("#zd_start_time").focus();
                $('#zd_start_time').val("");
            }
        }
    })
    $('#zd_end_time').datetimepicker({
        language: "zh-CN",    //语言选择中文
        format: "yyyy-mm-dd hh:ii", //格式化日期
        autoclose: 1,        //选择完日期后，弹出框自动关闭
        startView: 2,         //打开弹出框时，显示到什么格式,3代表月
        todayHighlight: true,
        minuteStep: 5
    }).on('changeDate', function (ev) {
        endTime = ev.date.valueOf();
        if (startTime != null) {
            if (startTime > endTime) {
                layer.alert('“结束时间 ”不能早于“开始时间 ” ！', {icon: 5});
                $("#zd_end_time").focus();
                $('#zd_end_time').val("");
            }
        }
    })


    //加载活动类型字典数据
    $.ajax({
        url: "../activity/getdichdlx",
        async: false,
        success: function (data) {
            $(data.data).each(function (i, e) {
                $("#hdlx").append(
                    '<option value="' + e.id + '">' + e.text + '</option>'
                );
                $("#zd_hdlx").append(
                    '<option value="' + e.id + '">' + e.text + '</option>'
                );
            });
            $("#hdlx").selectpicker('refresh');
            $("#zd_hdlx").selectpicker('refresh');
            layer.close(index)
        }
    });

    //tab 切换获取下标
    $("#t1").click(function () {
        tab_index = 1
    })
    $("#t2").click(function () {
        tab_index = 2
    })

    $("#hdcjr").select2({
        multiple: true,
        language : "zh-CN",
        placeholder: "请选择活动参与人",
        ajax: {
            url: "../activity/common/search/person",
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

})

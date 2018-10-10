$(document).ready(function () {
    zdForm.bootstrapValidator({
        message: '输入值不合法',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            hdzj: {
                message: '活动总结不合法',
                validators: {
                    notEmpty: {
                        message: '活动总结不能为空'
                    },
                    stringLength: {
                        min: 3,
                        max: 500,
                        message: '请输入3到500个字符'
                    },
                }
            }
            , hdly: {
                validators: {
                    notEmpty: {
                        message: '活动掠影不能为空'
                    }
                }
            }
        }
    });

})
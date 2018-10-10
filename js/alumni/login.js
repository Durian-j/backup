$().ready(function() {
    var e = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            gh: {required: !0},
            telephone: {required: !0}
        },
        messages: {
            gh: {required: e + "请输入您的用户名"},
            telephone: {required: e + "请输入您的密码"},
        }
    });

    var url = location.search; //获取url中"?"符后的字串
    var str = url.indexOf("?");
    if (str != -1) {
        var msg = "用户名密码错误！";
        layer.msg(msg);
    }
});

// jQuery(document).ready(function ($) {
//     if (window.history && window.history.pushState) {
//         $(window).on('popstate', function () {
//             var hashLocation = location.hash;
//             var hashSplit = hashLocation.split("#!/");
//             var hashName = hashSplit[1];
//             if (hashName !== '') {
//                 var hash = window.location.hash;
//                 if (hash === '') {
//                     window.location.href = "../login.html";
//                 }
//             }
//         });
//         window.history.pushState('forward', null, './#forward');
//     }
// });
jQuery(document).ready(function () {
    if (window.history && window.history.pushState) {
        $(window).on('popstate', function () {
            /// 当点击浏览器的 后退和前进按钮 时才会被触发，
            window.history.pushState('forward', null, '');
            window.history.forward(1);
        });
    }
    //
    window.history.pushState('forward', null, '');  //在IE中必须得有这两行
    window.history.forward(1);
});

function loginSubmit() {
    $("#password").val(hex_md5($("#password").val()))
    // alert($("#password").val())
}

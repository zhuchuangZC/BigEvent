// 退出功能
let layer = layui.layer;
$('#logout').on('click', function () {
    layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
        layer.close(index);
        // 回到登录页面
        location.href = "./../login.html";
        //删除token
        localStorage.removeItem('token');
    });
});

// **************************************************获取个人信息

// 获取个人信息
$.ajax({
  url: 'http://ajax.frontend.itheima.net/my/userinfo',
  //设置请求头
  headers: {
    Authorization: localStorage.getItem('token')
  },
  success:function (res) {
    if (res.status == 0) {
      // 设计思路:优先显示昵称 后显示用户名
      let name = res.data.nickname || res.data.username;
      $('.username').text(name);
      if (res.data.user_pic != null) {
        $('.userinfo img').show().css('display', 'inline-block').attr('src', res.data.user_pic);
      } else {
        let str = name.substr(0, 1);
        str = str.toUpperCase();
        $('.avatar').show().css('display', 'inline-block').text(str);
      }
    }
  },
  complete:function (xhr) {
    let obj = JSON.parse(xhr.responseText);
    if (obj.status == 1 && obj.message == '身份认证失败!') {
      // 回到login.html
      location.href = './../login.html';
      //同时清除token
      localStorage.removeItem('token');
    }
  }
})
// $.ajax({
//   url: "http://ajax.frontend.itheima.net/my/userinfo",
//   // type:"get",
//   // 没有传参
//   // 设置请求头：
//   headers: {
//     Authorization: localStorage.getItem("token")
//   },
//   success: function(res) {
//     if (res.status == 0) {
//       // 产品经理设计思路：
//       //      1.名字：优先显示昵称，后则显示用户名！
//       let name = res.data.nickname || res.data.username;
//         $(".username").text(name);
        
//       //      2.圆形：优先显示头像，后则显示名字的第一个字！
//       if (res.data.user_pic != null) {
//         $(".userinfo img").show().css("display", "inline-block").attr("src", res.data.user_pic);

//       }
//       //      名字第一个字！
//       else {
//         // 1.截取
//         let str = name.substr(0, 1);

//         // 2.大写：防止第一个字是英文！
//         str = str.toUpperCase();

//         // 3.设置
//         $(".avatar").show().css("display", "inline-block").text(str);
//         //      show方法：给DOM添加行内样式 display: inline;
//         //      需要：单独设置css样式
//       }
//     }
//   },
//   // index页面内所有请求，都需要通过complete处理过期业务！
//   complete: function(xhr) {
//     // xhr 当前请求xhr实例化  原生
//     let obj = JSON.parse(xhr.responseText);

//     // 特别标注："status":1,"message":"身份认证失败！"
//     if (obj.status == 1 && obj.message == "身份认证失败！") {
//       //
//       // 1.回到login.html
//       location.href = "../login.html";

//       // 2.同时清除过期token
//       localStorage.removeItem("token");
//     }
//   }
// });





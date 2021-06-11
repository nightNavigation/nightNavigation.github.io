// 存放只要交互逻辑 js 代码
// javascript 模块化
var seckill = {
    // 封装秒杀相关 ajax 的url
    URL : {
        now : '/seckill/time/now',
        exposer : function (seckillId){
            return '/seckill/' + seckillId + '/exposer';
        },
        execution : function (seckillId, md5) {
            return '/seckill/' + seckillId + md5 + '/execution';
        }
    },
    validatePhone : function (phone){
        if(phone && phone.length == 11 && !isNaN(phone)){
            console.log("return true : ", phone, phone.length, isNaN(phone) );
            return true;
        }else {
            console.log("return false : ", phone, isNaN(phone) );
            return false;
        }
    },
    handleSeckill : function (seckillId, node) {
        // 处理秒杀逻辑
        node.hide()
            .html('<botton class="btn btn-primary brn-lg" id="killBtn">开始秒杀</botton>');
        $.post(seckill.URL.exposer(seckillId), {}, function (result) {
            // 在回调函数中执行交互流程
            if(result && result['success']){
                var exposer = result['data'];
                if(exposer['exposed']){
                    // 开启秒杀, 获取秒杀地址
                    var md5 =exposer['md5'];
                    var killUrl = seckill.URL.execution(seckillId, md5);
                    console.log('killURL : ' + kilUrl);
                    // 绑定一次点击事件
                    $('#killBtn').one('click', function (){
                        // 执行秒杀请求
                        // 1.禁用按钮
                        $(this).addClass('disabled');
                        // 2.发送请求执行秒杀
                        $.post(killUrl, {}, function (result) {
                            if(result && result['success']){
                                var killResult = result['data'];
                                var state = killResult['state'];
                                var stateInfo = killResult['stateInfo'];
                                // 3.显示秒杀结果
                                node.html('<span class="label label-success">' + stateInfo +'</span>');
                            };
                        });
                    });
                    node.show();
                }else{
                    // 未开启秒杀
                    var now = exposer['now'];
                    var start = exposer['start'];
                    var end = exposer['end'];
                    // 重新开始计算计时逻辑
                    seckill.countdown(seckillId, now, start, end);
                }
            }else{
                console.log('result: ' + result);
            }
        })
    },
    countdown : function (seckillId, nowTime, startTime, endTime) {
        var seckillBox = $('#seckill-box');
        // 时间判断
        if(nowTime > endTime){
            seckillBox.html('秒杀结束！');
        }else if(nowTime < startTime){
            // 秒杀未开始，计时事件绑定
            var killTime = new Date(startTime + 1000);  // 防止用户端计时时间偏移
            seckillBox.countdown(killTime, function (event){
                var format = event.strftime('秒杀倒计时： %D天 %H时 %M分 %S秒');
                seckillBox.html(format);
            }).on('finish.countdown', function () {
                // 时间完成后回调事件 -- 获取秒杀地址，实现逻辑，执行秒杀
                seckill.handleSeckill(seckillId, seckillBox);
            });
        }else {
            // 秒杀开始
            seckill.handleSeckill(seckillId, seckillBox);
        }
    },
    // 详情页秒杀逻辑
    detail : {
        // 详情页初始化
        init : function (params) {
            // 手机验证和登录，计时交互
            // 规划交互流程
            // 在cookie中查找手机号
            var killPhone = $.cookie('killPhone');
            var seckillId = params['seckillId'];
            var startTime = params['startTime'];
            var endTime = params['endTime'];
            // 验证手机号
            if(!seckill.validatePhone(killPhone)){
                // 绑定phone
                var killPhoneModel = $("#killPhoneModel");
                // 控制输出，显示弹出层
                killPhoneModel.modal({
                    show : true,  // 显示弹出层
                    backdrop : 'static',  //禁止位置关闭
                    keyboard : false  // 关闭键盘事件
                });
                $('#killPhoneBtn').click(function(){
                   var inputPhone = $('#killPhoneKey').val();
                   if(seckill.validatePhone(inputPhone)){
                       // 将 phone 写入 cookie
                       $.cookie('killPhone', inputPhone, {
                           expires : 7,
                           path : '/seckill'
                       });
                       // 刷新页面
                       window.location.reload();
                   }else {
                       $('#killPhoneMessage').hide().html('<label class="label label-danger">手机号错误</label>').show(300);
                   }
                });
            }
            // 登录之后： 计时交互
            $.get(seckill.URL.now, {}, function (result) {
                if(result && result['success']){
                    var nowTime = result['data'];
                    // 时间判断,计时交互
                    seckill.countdown(seckillId, nowTime, startTime, endTime);
                }
            });
        }
    }
}

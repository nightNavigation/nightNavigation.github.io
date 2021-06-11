<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 2021/2/5
  Time: 20:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@include file="common/tag.jsp" %>
<!DOCTYPE html>
<html lang="zh-CN">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
        <title>秒杀详情页</title>
        <%--jsp静态包含--%>
        <%@include file="common/head.jsp" %>
    </head>
    <body>
    <div class="contrainer">
        <div class="panel panel-default text-center">
            <div class="pannel-heaading">
                <h1>${seckillTab.seckillName}</h1>
            </div>
        </div>
        <div class="panel-body">
            <h2 class="text-danger">
                <!-- 显示 time 图标 -->
                <span class="glyphicon glyphicon-time"></span>
                <!-- 展示倒计时 -->
                <span class="glyphicon" id="seckill-box"></span>
            </h2>
        </div>
    </div>
    <!-- 登录弹出层，输入电话 -->
    <div id="killPhoneModel" class="modal fade">
        <div class="model-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-tittle text-center">
                        <span class="glyphicon glyphicon-phone"></span>秒杀电话：
                    </h3>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-xs-8 col-xs-offset-2">
                            <input type="text" name="killPhone" id="killPhoneKey" placeholder="请填写手机号码" class="form-control">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <!-- 验证消息：用以存放用户出错信息 -->
                    <span id="killPhoneMessage" class="glyphicon"></span>
                    <button type="button" id="killPhoneBtn" class="btn btn-success">
                        <span class="glyphicon glyphicon-phone"></span>
                        提交
                    </button>
                </div>
            </div>
        </div>
    </div>
        <!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
        <script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
        <!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
        <script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>

        <!-- 使用CDN 获取公共js https://www.bootcdn.cn/ -->
        <!-- jQuery cookie 操作插件 -->
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
        <!-- jQuery countdown 倒计时插件 -->
        <script src="https://cdn.bootcdn.net/ajax/libs/jquery.countdown/2.2.0/jquery.countdown.min.js"></script>
        <!-- 交互逻辑编写 -->
        <script src="../../resources/script/seckill.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function (){
                // 使用EL表达式传入参数
                seckill.detail.init({
                    seckillId : ${seckillTab.seckillId},
                    startTime : ${seckillTab.startTime.time},  // 毫秒
                    endTime   : ${seckillTab.endTime.time}
                })
            })
        </script>
    </body>
</html>

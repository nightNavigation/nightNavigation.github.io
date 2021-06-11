<%--
  Created by IntelliJ IDEA.
  User: ASUS
  Date: 2021/2/5
  Time: 20:41
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java"  %>
<%-- 静态方式标签引入_jstl --%>
<%@include file="common/tag.jsp"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
    <title>秒杀列表页</title>
    <%--jsp静态包含--%>
    <%@include file="common/head.jsp" %>

</head>
<body>
<!-- 页面显示部分 -->
<div class="contrainer">
    <div class="panel panel-default">
        <h2>秒杀列表</h2>
    </div>
    <div class="panel-body">
        <table class="table table-hover">
            <thead>
            <tr>
                <th>名称</th>
                <th>库存</th>
                <th>开始时间</th>
                <th>结束时间</th>
                <th>创建时间</th>
                <th>详情页</th>
            </tr>
            </thead>
            <tbody>
<%--                <tr>--%>
<%--                    <td>${list.get(0).seckillName}</td>--%>
<%--                    <td>${list.get(0).seckillNumber}</td>--%>
<%--                    <td>${list.get(0).startTime}</td>--%>
<%--                    <td>${list.get(0).endTime}</td>--%>
<%--                    <td>${list.get(0).createTime}</td>--%>
<%--                    <td><a class="btn btn-info" href="/seckill/${list.get(1).seckillId}/detail" target="_blank">link</a></td>--%>
<%--                </tr>--%>

                <c:forEach var="sk" items="${list}">
                    <tr>
                        <td>${sk.seckillName}</td>
                        <td>${sk.seckillNumber}</td>
                        <td><fmt:formatDate value="${sk.startTime}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
                        <td><fmt:formatDate value="${sk.endTime}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
                        <td><fmt:formatDate value="${sk.createTime}" pattern="yyyy-MM-dd HH:mm:ss" /></td>
                        <td><a class="btn btn-info" href="/seckill/${sk.seckillId}/detail" target="_blank">link</a></td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>
    </div>
</div>

</body>
<!-- jQuery文件。务必在bootstrap.min.js 之前引入 -->
<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
<!-- 最新的 Bootstrap 核心 JavaScript 文件 -->
<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
</html>
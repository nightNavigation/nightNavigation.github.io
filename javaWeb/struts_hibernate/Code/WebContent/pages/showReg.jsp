<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<jsp:useBean id="userinfo" class="com.po.UserInfo" scope="session" />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>注册展示</title>
		<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath }/css/global.css" type="text/css" media="all" />
	</head>
	<body>
		<div id="page">
			<div id="header">
				<jsp:include page="/blocks/header.jsp" />      
	       	</div>	
	       	<div id="div_reg">	
				<table style="align:center">
					<tr>
						<td><label>用户名：</label></td>
						<td><jsp:getProperty property="username" name="userinfo"/></td>
					</tr>
					<tr>
						<td><label>密码：</label></td>
						<td><jsp:getProperty property="password" name="userinfo"/></td>
					</tr>
					<tr>
						<td><label>性别：</label></td>
						<td><jsp:getProperty property="sex" name="userinfo"/></td>
					</tr>
					<tr>
						<td><label>兴趣：</label></td>
						<td><jsp:getProperty property="hobby" name="userinfo"/></td>
					</tr>
					<tr>
						<td colspan="2"><a href="${pageContext.request.contextPath}/index.jsp">返回首页</a></td>
					</tr>
				</table>
			</div>
	       	<div id="footer">
				<jsp:include page="/blocks/bottom.jsp" />  
			</div>
		</div>	
	</body>
</html>
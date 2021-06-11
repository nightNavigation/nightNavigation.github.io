<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>注册新用户</title>
		<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath }/css/global.css" type="text/css" media="all" />
	</head>
	<body>
		<div id="page">
			<div id="header">
				<jsp:include page="/blocks/header.jsp" />      
	       	</div>
	       	
	       	<div id="div_reg">
	       		<h3>注册新用户</h3><br>
	       		<hr size=1>  
	       		<%
					String mess = (String) request.getAttribute("mess");
	       			if(mess != null){
				%>
					<%=mess %>
				<%
					}
				%>
				<form action="${pageContext.request.contextPath}/regAction" method="post">
					<table align="center">
						<tr>
							<td><label>用户名：</label></td>
							<td><input type="text" name="userName"></td>
						</tr>
						<tr>
							<td><label>密码：</label></td>
							<td><input type="password" name="pwd"></td>
						</tr>
						<tr>
							<td><label>确认密码：</label></td>
							<td><input type="password" name="repass"></td>
						</tr>
						<tr>
							<td><label>性别：</label></td>
							<td>
								<input type="radio" name="sex" value="man">男
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<input type="radio" name="sex" value="woman">女
							</td>
						</tr>
						<tr>
							<td><label>兴趣：</label></td>
							<td>
								<input type="checkbox" name="interest" value="看书">看书
								<span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
								<input type="checkbox" name="interest" value="玩游戏">玩游戏
							</td>
						</tr>
						<tr>
							<td><input type="submit" value="注册"></td>
							<td><input type="reset" value="重置"></td>
						</tr>
					</table>
				</form>
	        </div>
	       	
	       	<div id="footer">
				<jsp:include page="/blocks/bottom.jsp" />  
			</div>
		</div>	
	</body>
</html>
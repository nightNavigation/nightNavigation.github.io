<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>爱尚网扇品</title>
		<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath}/css/global.css" type="text/css" media="all" />
	</head>
	<body>
		
		<div id="page">
			<div id="header">
				<jsp:include page="/blocks/header.jsp" />      
       		</div>
			<div id="left_column">
				<jsp:include page="/blocks/left_column.jsp" />  
			</div>
			<div id="center_column">
				<jsp:include page="/blocks/center_column.jsp" />  
			</div>
			<div id="footer">
				<jsp:include page="/blocks/bottom.jsp" />  
			</div>
		</div>
	</body>
</html>
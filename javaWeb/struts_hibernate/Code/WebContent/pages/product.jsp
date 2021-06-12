<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.List,com.po.Product" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:if test="#request.products == null"><s:action name="showProductAction" executeResult="true" /></s:if>
<s:elseif test="#request.products != null">
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>爱尚网扇品</title>
		<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath}/css/global.css" type="text/css" media="all" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
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
				<div class="divBorder">
					<img src="${pageContext.request.contextPath}/images/all_fans.gif" /><br>
					<s:iterator value="#request.products">
						<div id='sort_product'>
							<ul>
								<li>
									<p class='gpic'>
										<a href='itemAction?id=<s:property value="id" />'><img width="205" height="154" src='${pageContext.request.contextPath}/<s:property value="img" />'></a>
									</p>
									
								</li>
								<li><p class='gbt'><a class="a" href='itemAction?id=<s:property value="id" />'><s:property value="name" /></a></p></li>
								<li><p class='gprice'>促销价：<span style='color:#FF6600;font-weight:bold;'></span>￥<s:property value="price" />元</p></li>
								<li><p class='gsale'>已售出：<span style='font-weight:bold;'><s:property value="sale" /></span>&nbsp;笔</p></li>
							</ul>
						</div>		
					</s:iterator>
				<div id='page_next'>
				<s:if test="#request.eleNumOfPage<6">
					<script type="text/javascript">
						$(function(){
							var num = $(".pageLink").length;
							for(var i=0;i<num;i++){
								$(".pageLink").eq(i).attr("disabled", true);
							}
						})
					</script>
				</s:if>
					<a class="pageLink" href='showProductAction?offset=<s:property value="(#request.products.get(0).getId()-7 >0)? #request.products.get(0).getId()-7 :0" />&sort=<s:property value="#request.sort"/>&eleNumOfPage=<s:property value="#request.eleNumOfPage" />&textfield=<s:property value="#request.keyword" />' >上一页</a>
					&nbsp;
					<a class="pageLink" href='showProductAction?offset=<s:property value="#request.products.get(#request.products.size()-1).getId()" />&sort=<s:property value="#request.sort"/>&eleNumOfPage=<s:property value="#request.eleNumOfPage" />&textfield=<s:property value="#request.keyword" />' >下一页</a>
					&nbsp;
				</div>   	
			</div>
						
			<div id="footer">
				<jsp:include page="/blocks/bottom.jsp" />  
			</div>
		</div>
	</body>
</html>
</s:elseif>
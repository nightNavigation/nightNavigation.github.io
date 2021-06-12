<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s"  %>
<s:if test="#request.product == null"><jsp:forward page="/index.jsp" /></s:if>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
		<title>爱尚网扇品</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/bootstrap-3.3.7/css/bootstrap.min.css"/>
		<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath}/css/global.css" type="text/css" media="all" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/bootstrap-3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript">
			$(function(){
				$("#cut").click(function(){
					var count = ($("#count").val() - 1 >=1)?$("#count").val() - 1: 1;
					$("#count").val(count);
				});
				$("#add").click(function(){
					$("#count").val(parseInt($("#count").val()) + 1);
				});
			})
		</script>
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
				<div id=item_img>
					<img width="300px" height="225px" src='${pageContext.request.contextPath}/<s:property value="#request.product.getImg()" />' />
				</div>
				<div id=item_other>
					品&nbsp;&nbsp;&nbsp;&nbsp;名：&nbsp;<span  style="font-size:15px;font-weight:bold;"><s:property value="#request.product.getName()"/></span><br>
					原&nbsp;&nbsp;&nbsp;&nbsp;价：&nbsp;<span  style="text-decoration: line-through;"><s:property value="#request.product.getOneprice()"/></span><br>
					促&nbsp;&nbsp;&nbsp;&nbsp;销：&nbsp;<span  style="font-size:28px;font-weight:bold;color:#B22222;"><s:property value="#request.product.getPrice()"/></span>元<br>
					售&nbsp;&nbsp;&nbsp;&nbsp;出：&nbsp;<span  style="font-weight:bold;color:#CC6600;"><s:property value="#request.product.getSale()"/></span>件<br>
					<br />
					<input type="image" src="${pageContext.request.contextPath}/images/buy_button.png" />&nbsp;&nbsp;			
					<input type="image" src="${pageContext.request.contextPath}/images/shopping_button.png" data-toggle="modal" data-target="#cartAdd" value="加入购物车"></p>
					<!-- 模态框（Modal） -->
					<div class="modal fade" id="cartAdd" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
					    <div class="modal-dialog">
					        <div class="modal-content">
					            <div class="modal-header">
					                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
					                <h4 class="modal-title" id="myModalLabel">添加购物车</h4>
					            </div>
					            <form action="${pageContext.request.contextPath}/cartAddAction" method="post">								
									<input type="hidden" name="productId" value='<s:property value="#request.product.getId()" />' />
									<br />
									<div class="input-group col-sm-10 col-sm-offset-1">
									    <label for="productName" class="input-group-addon">品&nbsp;&nbsp;名：</label>
									    <input type="text" class="form-control"aria-describedby="inputGroupSuccess1Status" readonly="readonly" name="productName" id= "productName" value='<s:property value="#request.product.getName()" />' />
									</div>
									<br />
									<div class="input-group col-sm-10 col-sm-offset-1">
									    <label for="price" class="input-group-addon">售&nbsp;&nbsp;价：</label>
									    <input type="text" class="form-control"aria-describedby="inputGroupSuccess1Status" readonly="readonly" name="price" id="price" value='<s:property value="#request.product.getPrice()" />' />
									</div>
									<br />
									<div class="input-group col-sm-10 col-sm-offset-1">
									    <label for="count" class="control-label input-group-addon">数&nbsp;&nbsp;量：</label>
									    <div id="cut" class="btn input-group-addon"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span></div>									    
									    <input type="text" class="form-control" name="count" id="count" value="1" >
									    <div for="count" id="add" class="btn input-group-addon"><span class="glyphicon glyphicon-plus" aria-hidden="true"></span></div>
									</div>
									<br />
						            <div class="modal-footer">
						                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
						                <button type="submit" class="btn btn-primary">提交</button>
						            </div>
								</form>
					        </div><!-- /.modal-content -->
					    </div><!-- /.modal -->
					</div>
				</div>
				<div id=item_details><img src="${pageContext.request.contextPath}/images/details.gif" /></div>
				<div id="item_parameter">
					<div style="float: left;width:230px;color:#404040;">&nbsp;&nbsp;&nbsp;货号：<s:property value="#request.product.getId()"/></div><div style="float: left;width:230px;color:#404040;">类别：<s:property value="#request.product.getSort()"/></div><div style="float: left;width:230px;color:#404040;">扇面材质:<s:property value="#request.product.getFace()"/></div><br>
					<div style="float: left;width:230px;color:#404040;">&nbsp;&nbsp;&nbsp;扇骨材质：<s:property value="#request.product.getBody()"/></div><div style="float: left;width:230px;color:#404040;">扇骨数量：<s:property value="#request.product.getQuantity()"/>根</div><div style="float: left;width:230px;color:#404040;">扇骨长度：<s:property value="#request.product.getLength()"/>CM</div>
				</div>
				<div id="item_show_img">
					<img src='${pageContext.request.contextPath}/<s:property value="#request.product.getSource()"/>' />
				</div>
			</div>
			
			<div id="footer">
				<jsp:include page="/blocks/bottom.jsp" />  
			</div>
		</div>
	
</body>
</html>
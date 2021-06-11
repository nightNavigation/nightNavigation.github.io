<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<s:if test="#session.userinfo.userName == null && #request.carts == null"><s:action name="showProductAction" executeResult="true" /></s:if>
<s:else>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>爱尚网扇品</title>
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/bootstrap-3.3.7/css/bootstrap.min.css"/>
		<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath}/css/global.css" type="text/css" media="all" />
		<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery.min.js"></script>
		<script type="text/javascript" src="${pageContext.request.contextPath}/bootstrap-3.3.7/js/bootstrap.min.js"></script>
		<script type="text/javascript">
			var delList = [];
			$(function(){
				// 添加数量
				$("tr .plus").on("click", function(e){
					var count = parseInt($(this).prev().html()) + 1;
					var price = parseFloat($(this).parent().prev().html());
					var totalPrice = parseFloat($("#totalPrice").html());
					// console.log(count, price);
					$(this).prev().html(count);
					$(this).parent().next().html(count * price);
					$("#totalPrice").html(totalPrice + price);
				});
				// 删除数量
				$("tr .minus").on("click", function(e){
					var count = parseInt($(this).next().html());
					var price = parseFloat($(this).parent().prev().html());
					var sum = count * price;
					var totalPrice = parseFloat($("#totalPrice").html()) - sum;
					count = count-1 >=1?count-1:1;
					totalPrice += count * price;
					$(this).next().html(count);
					$(this).parent().next().html(count * price);
					$("#totalPrice").html(totalPrice);
				});
				// 单个删除
				$("td .glyphicon-trash").click(function(e){
					var totalPrice = parseFloat($("#totalPrice").html());
					var id = $(this).parent().parent().find(".cId").val();
					// console.log(id);
					myDel(id);
					var node = $(this).parent().parent().nextAll();
					var price = parseFloat($(this).parent().parent().find(".sum").html());
					console.log(price);
					// console.log(node.length);
					for (var i=0;i<node.length;i++){
						var index = parseInt(node.eq(i).find(".index").html()) - 1;
						node.eq(i).find(".index").html(index);
					}
					$(this).parent().parent().remove();
					$("#totalPrice").html(totalPrice - price);
				});
				// 刷新，恢复初始化
				$("#refresh").click(function(){
					$("#cartshow")[0].click();
				});
				// 全选
				$("#selectAll").click(function(){
					var node = $("tbody tr").find("input:checkbox");
					for (var i=0;i<node.length;i++){
						node.eq(i).prop("checked", true);
					}
				});
				// 批量删除
				$("#betchDel").click(function(){
					var totalPrice = parseFloat($("#totalPrice").html());
					var node = $("input:checked").parent().parent();
					var sum = 0;
					if(node.length == 0){
						alert("请选择要删除的商品。");
						return ;
					}
					for(var i=0;i<node.length;i++){
						var id = node.eq(i).find(".cId").val();
						myDel(id);
						sum += parseFloat(node.eq(i).find(".sum").html());
						node.eq(i).remove();
					}
					node = $(".myCart tr");
					for(var i=0;i<node.length;i++){
						node.eq(i).find(".index").html(i+1);
					}
					$("#totalPrice").html(totalPrice - sum);
				});
				// 全部删除
				$("#delAll").click(function(){
					var node = $(".myCart tr");
					for(var i=0;i<node.length;i++){
						var id = node.eq(i).find(".cId").val();
						myDel(id);
						node.eq(i).remove();
					}
					$("#totalPrice").html(0);
				});
				// 保存修改
				$("#renew").click(function(){
					var subData = {
							"delList" : delList,
							"updateList" : []
					};
					var nodes = $(".myCart tr");
					var list = [];
					for (var i=0;i<nodes.length;i++){
						var node = nodes.eq(i);
						var cid = node.find(".cId").val();
						var count = parseInt(node.find(".count").html());
						list.push({
							"cid" : cid,
							"count" : count
						});
					}
					subData.updateList = list;
					console.log(subData);
					$("#subData").val(JSON.stringify(subData));
					$("#myForm").submit();
					//$.ajax({
					//	type : "POST",
					//	url : "cartUpdateAction",
					//	data : subData,
					//	dataType : "json",
					//	contentType : "application/json;charset=UTF-8",
					//	success : function(){
					//		alert("修改成功。");
					//	},
					//	error : function(){
					//		alert("修改失败。");
					//	}
					//});
				});
				function myDel(id){
					delList.push(id);
				}
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
				<s:if test="#request.carts.size == 0">
				<img src="${pageContext.request.contextPath}/images/shopping_card.gif" />
					<div id="empty">
						<h3>您的购物车还是空的，</h3>
						<h3>赶紧行动吧！</h3>
					</div>
				</s:if>
				<s:else>
					<div id="control_menu">
						<form id="myForm" action="cartUpdateAction" method="post">
							<input type="hidden" id="subData" name="subData">						
						</form>
						<ul class="nav nav-tabs">
							<li><a id="betchDel" href="#">批量删除</a></li>
							<li><a id="delAll" href="#">全部删除</a></li>
							<li><a id="selectAll" href="#">全选</a></li>
							<li><a id="renew" href="#">保存修改</a></li>
							<li><a id="refresh" href="#">恢复</a></li>
						</ul>
					</div>
					<div id="cart_tb">
						<table class="table table-hover">
							<thead>
								<tr>
									<td width="6%"><span style="color:#696969;size:13;font-weight:bold;">选择</span></td>
									<td width="6%"><span style="color:#696969;size:13;font-weight:bold;">序号</span></td>
									<td width="26%"><span style="color:#696969;size:13;font-weight:bold;">商品名称</span></td>
									<td width="14%"><span style="color:#696969;size:13;font-weight:bold;">单价（元）</span></td>
									<td width="20%"><span style="color:#696969;size:13;font-weight:bold;">数量</span></td>
									<td width="14%"><span style="color:#696969;size:13;font-weight:bold;">小计（元）</span></td>
									<td width="14%"><span style="color:#696969;size:13;font-weight:bold;">控件</span></td>
								</tr>
							</thead>
							<tbody class="myCart">
								<s:iterator value="#request.carts" status="cartList">
									<tr>
										<td>
											<input type="checkbox" />
											<input type="hidden" class="cId" value='<s:property value="cartId" />' />
											<input type="hidden" class="pId" value='<s:property value="product.getId()" />' />
										</td>
										<td class="index"><s:property value="#cartList.index + 1"/></td>
										<td><s:property value="product.getName()"/></td>
										<td class="price"><s:property value="product.getPrice()" /></td>
										<td>
											<span class="btn glyphicon glyphicon-minus minus" aria-hidden="true"></span>
											<span class="count"><s:property value="count"/></span>
											<span class="btn glyphicon glyphicon-plus plus" aria-hidden="true"></span>
										</td>
										<td class="sum"><s:property value="sumPrice"/></td>
										<td>
											<span class="btn glyphicon glyphicon-shopping-cart" title="立即付款"></span>
											<span class="btn glyphicon glyphicon-trash" title="删除"></span>
										</td>
									</tr>
								</s:iterator>	
							</tbody>

						</table>
					</div>
					<div id="cart_tt">	
						合计总金额：<span id="totalPrice" style="font-size:18px;color:#f60;"><s:property value="#request.sum"/></span>元
					</div>			
				</s:else>
				
				<div id="cart_lk">
					<br />
					<a href="${pageContext.request.contextPath}/index.jsp">继续购物</a> | <a href="#">去收银台结账</a> | <a href="cart_remove.jsp">清空购物车</a> 
				</div>
			
			</div>
			<div id="footer">
				<jsp:include page="/blocks/bottom.jsp" />  
			</div>
		</div>
	</body>
</html>
</s:else>
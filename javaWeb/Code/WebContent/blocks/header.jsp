<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%> 
<jsp:useBean id="userinfo" class="com.po.UserInfo" scope="session" />

<script>
	function openWin(url,width,height){
		var phxWin=window.open(url,'','width='+width+',height='+height+',left='+(screen.width-width)/2+',top='+(screen.height-height)/2+'');
	}
</script>
	
	<div id="logo">
		<a href="#"><img src="${pageContext.request.contextPath}/images/logo.png" border= "0 "/></a>
	</div>
	
	<div id="header_right">
		<%
			String userName = null;
			if(session.getAttribute("userinfo") != null){
				userName = userinfo.getUsername();
			}
      		if(userName == null){
      	%>
		欢迎光临，<a href="${pageContext.request.contextPath}/pages/reg.jsp">注册</a>/<a href="${pageContext.request.contextPath}/pages/login.jsp">登陆</a>
		<%
      	}else{
      		byte a[]=userName.getBytes("utf-8");
      		userName=new String(a);
      		out.print(""+userName+"，<span style='color:red'>欢迎光临!</span>/<a href='logoutAction'>注销</a>");
      	}
      	%>
		<br>
		<img src="${pageContext.request.contextPath}/images/chat.png" />&nbsp;<a onClick="openWin('contact.jsp',300,200)" style="cursor:hand" >联系我们</a> <img src="${pageContext.request.contextPath}/images/order.png" />&nbsp;<a id="cartshow" href="${pageContext.request.contextPath}/cartShowAction">购物车</a>
	</div>

	<div id="headermenu">

		<ul id="menu">
		<li>
			<a class="li" href="${pageContext.request.contextPath}/index.jsp"><img src="${pageContext.request.contextPath}/images/dh_1.png" border= "0 "/>&nbsp首页</a>
		</li>
		<li>
			<a class="li" href="#" ><img src="${pageContext.request.contextPath}/images/dh_2.png" border= "0 "/>&nbsp商店公告</a>
		</li>
		
		<li>
			<a class="li" href="${pageContext.request.contextPath}/showProductAction" ><img src="${pageContext.request.contextPath}/images/dh_3.png" border= "0 "/>&nbsp全部商品</a>
		</li>
		
		<li>
			<a class="li" href="#" ><img src="${pageContext.request.contextPath}/images/dh_4.png" border= "0 "/>&nbsp付款方式</a>
		</li>
		
		<li>
			<a class="li" href="#"><img src="${pageContext.request.contextPath}/images/dh_5.png" border= "0 "/>&nbsp关于我们</a>
		</li>
		
		<li>
			<a class="li" href="#" ><img src="${pageContext.request.contextPath}/images/dh_6.png" border= "0 "/>&nbsp在线留言</a>
		</li>
		

		</ul>
	</div>
	
	<div id="search">
		<form id="form1" name="search" method="post" action="showProductAction">
			<input type="text" name="textfield" style="color:#a4a4a4;vertical-align:middle;" value="请输入关键字"  onfocus="this.value=''" />&nbsp
			<input name="imageField" type="image" align="absmiddle" src="${pageContext.request.contextPath}/images/search.gif" />
		</form>
	</div>
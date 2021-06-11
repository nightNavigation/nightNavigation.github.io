<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.util.Vector,com.po.Product" %>
<%@ taglib uri="/struts-tags" prefix="s" %>
<link rel="stylesheet" rev="stylesheet" href="${pageContext.request.contextPath}/css/center_column.css" type="text/css" media="all" />
<s:if test="#request.products == null"><s:action name="showIndexAction" executeResult="true" /></s:if>
<s:elseif test="#request.products != null">
<script language="javascript">
//选择器
function $a(id,tag){var re=(id&&typeof id!="string")?id:document.getElementById(id);if(!tag){return re;}else{return re.getElementsByTagName(tag);}}

//焦点滚动图 点击移动
function movec() 
{
	var o=$a("bd1lfimg","");
	var oli=$a("bd1lfimg","dl");
    var oliw=oli[0].offsetWidth; //每次移动的宽度	 
	var ow=o.offsetWidth-2;
	var dnow=0; //当前位置	
	var olf=oliw-(ow-oliw+10)/2;
		o["scrollLeft"]=olf+(dnow*oliw);
	var rqbd=$a("bd1lfsj","ul")[0];
	var extime;

	<!-- for(var i=1;i<oli.length;i++){rqbd.innerHTML+="<li>"+i+"</li>";}-->
	var rq=$a("bd1lfsj","li");
	for(var i=0;i<rq.length;i++){reg(i);};
	oli[dnow].className=rq[dnow].className="show";
	var wwww=setInterval(uu,2000);

	function reg(i){rq[i].onclick=function(){oli[dnow].className=rq[dnow].className="";dnow=i;oli[dnow].className=rq[dnow].className="show";mv();}}
	function mv(){clearInterval(extime);clearInterval(wwww);extime=setInterval(bc,15);wwww=setInterval(uu,5000);}
	function bc()
	{
		var ns=((dnow*oliw+olf)-o["scrollLeft"]);
		var v=ns>0?Math.ceil(ns/10):Math.floor(ns/10);
		o["scrollLeft"]+=v;if(v==0){clearInterval(extime);oli[dnow].className=rq[dnow].className="show";v=null;}
	}
	function uu()
	{
		if(dnow<oli.length-2)
		{
			oli[dnow].className=rq[dnow].className="";
			dnow++;
			oli[dnow].className=rq[dnow].className="show";
		}
		else{oli[dnow].className=rq[dnow].className="";dnow=0;oli[dnow].className=rq[dnow].className="show";}
		mv();
	}
	o.onmouseover=function(){clearInterval(extime);clearInterval(wwww);}
	o.onmouseout=function(){extime=setInterval(bc,15);wwww=setInterval(uu,5000);}
}
</script>

<!-------- content start --------->
	<div id="content">


		<!-- ===================== header end ===================== -->
	

	<!--------main begin--------->
	<div id="main">

		<!-----------图片切换  begin----------->
		<div class="sub_box">
			<div id="p-select" class="sub_nav">
				
				<div class="sub_no" id="bd1lfsj">
					<ul>
						<li class="show">1</li><li class="">2</li>
					</ul>
				</div>
			</div>
			<div id="bd1lfimg">
				<div>
					<dl class="show"></dl>
										<dl class="">
						<dt><a href="#"><img src="${pageContext.request.contextPath}/images/asw.jpg" alt="爱尚网扇品"></a></dt>
					</dl>
										<dl class="">
						<dt><a href="#"><img src="${pageContext.request.contextPath}/images/summer.jpg" alt="清爽夏日"></a></dt>
					</dl>
				</div>
			</div>
		</div>
		<script type="text/javascript">movec();</script>
		<!-----------图片切换  end----------->
	</div>
	<!--------main end--------->



	</div>

<div class="divBorder">
	<div id="select_title">
		<h3>&nbsp;&nbsp;最新商品<img src="${pageContext.request.contextPath}/images/new.gif" /></h3>
		<hr size=1>
	</div>
	<s:iterator value="#request.products">
		<div id="select_product">
			<div id="select_img">
				<a href='itemAction?id=<s:property value="id"/>'><img width="205" height="154" src='${pageContext.request.contextPath}/<s:property value="img"/> '></a>
			</div>
			<div id="select_about">
				<a class="a" href='itemAction?id=<s:property value="id"/>'><s:property value="name"/></a><br> 
				促销价：<span style="color:#FF6600;font-weight:bold;">￥<s:property value="price"/></span>元<br>
				已售出：<span style="font-weight:bold;"><s:property value="sale"/></span>&nbsp;笔
			</div>		
		</div>		
	</s:iterator>
</div>
</s:elseif>
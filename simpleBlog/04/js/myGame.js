var num = [];
var cnum = [];
var q;
var nonHit = false;
var score = [];
var count = 0;
var timeCount = 0;
// 计时器
var min=0;
var sec=0;
var ms=0;
var timer = null;

var changeData = [
	[0, 1], [0, 2], [0, 3],
	[1, 0], [1, 2], [1, 3],
	[2, 0], [2, 1], [2, 3],
	[3, 0], [3, 1], [3, 2]
]
window.onload = function(){
	initVal();
	initImg();
	intruction();
	$("#reset").click(function(){
		flipfront();
		initVal();
		delImg();
		initImg();
	});
	$("#exchange").click(function(){
		if(nonHit == false){
			flipfront();
			if(timer != null) clearInterval(timer);

			if(timeCount >= 4) {
				clearInterval(timer);
				getTime(min, sec, ms);
				$("#gradeSub").css({"display": "block"});
				var grade = "";
				for(var i=0;i<4;i++){
					if(score[i] == 'true'){
						grade = grade + '<img src="./images/star_good.png" >';
					}else{
						grade = grade + '<img src="./images/star_error.png" >';
					}
				}
				$("#grade").html(grade);
			}else{
				timeCount++;
				setTimeout(flipback, 4000);
				setTimeout(exchangeImg, 4500);
				$("#ansBox td img").removeClass("ansSel");
			}
		}
	});	
	$("#mySubmit").click(function(){
		if($("#player").val() == ''){
			alert("请输入昵称");
		}else{
			storage();
			alert("提交成功");
			$("#hideSub").trigger('click');
		}
	});
	$("#hideSub").click(function(){
		$("#gradeSub").css({"display": "none"});
	});
	$("#start").click(function(){
		flipback();
		initVal();
		intruction();
	});
	$("#ans0").click(function(){
		if(nonHit){
			$(".guessImgbg").eq(q).css("transform", "rotateY(180deg)");
			$(".guessImg").eq(q).css("transform", "rotateY(0deg)");
			$("#ans0 img").addClass("ansSel");
			checkAns(0);
			if(timer != null) clearInterval(timer);
		}
	});
	$("#ans1").click(function(){
		if(nonHit){
			$(".guessImgbg").eq(q).css("transform", "rotateY(180deg)");
			$(".guessImg").eq(q).css("transform", "rotateY(0deg)");
			$("#ans1 img").addClass("ansSel");
			checkAns(1);
			if(timer != null) clearInterval(timer);
		}
	});
	$("#ans2").click(function(){
		if(nonHit){
			$(".guessImgbg").eq(q).css("transform", "rotateY(180deg)");
			$(".guessImg").eq(q).css("transform", "rotateY(0deg)");
			$("#ans2 img").addClass("ansSel");
			checkAns(2);
			if(timer != null) clearInterval(timer);
		}
	});
	$("#ans3").click(function(){
		if(nonHit){
			$(".guessImgbg").eq(q).css("transform", "rotateY(180deg)");
			$(".guessImg").eq(q).css("transform", "rotateY(0deg)");
			$("#ans3 img").addClass("ansSel");
			checkAns(3);
			if(timer != null) clearInterval(timer);
		}
	});
	$("#rank").click(function(){
		$("#stormRank").html(addRankTable());
		$("#rankSee").css("display", "block");
	});
	$("#hideRank").click(function(){
		$("#rankSee").css("display", "none");
		$("#stormRank").html("");
	});
}
function initVal(){
	count = 0;
	timeCount = 0;
	nonHit = false;
	$("#ansBox td img").removeClass("ansSel");
	
	if(q != undefined) $(".guessImgbg").eq(q).removeClass("guessImgbgQ");
	q = undefined;
	
	if(timer != null) clearInterval(timer);
	min = 0;
	sec = 0;
	ms = -1;
	showTime();
	
	intruction();
}
function initImg(){
	var className = "guessImg";
	var ans = "#ans";
	if(num.length != 0) delImg();
	num = [];
	while(num.length < 4){
		var n = Math.floor(Math.random()*19 + 1);
		if(num.indexOf(n) == -1){
			num.push(n);
		}
	}
	for(i=0; i<4; i++){
		$(".guessImg").eq(i).addClass(className + num[i]);
		$(ans+i).html(num2Image(num[i]));		
	}
}
function delImg(){
	var className = "guessImg";
	for(i=0; i<4; i++){
		$(".guessImg").eq(i).removeClass(className + num[i]);
		$(".guessImg").eq(i).removeClass(className + cnum[i]);
	}
}
function exchangeImg(){
	delImg();
	timer = setInterval(showTime, 10);
	nonHit = true;
	if(cnum.length == 0) cnum = num.concat();
	var className = "guessImg";
	var chLog = [];
	var a, b;
	if(q != undefined) $(".guessImgbg").eq(q).removeClass("guessImgbgQ");
	q = Math.floor(Math.random()*4);
	var chTime = Math.floor(Math.random()*10 + 2);
	var str = '<p>';
	// console.log("num:", num);
	for(var i=0;i<chTime;i++){
		chLog.push(Math.floor(Math.random()*12));
		a = cnum[changeData[chLog[i]][0]];
		b = cnum[changeData[chLog[i]][1]];
		cnum[changeData[chLog[i]][0]] = b;
		cnum[changeData[chLog[i]][1]] = a;
		str = str + "0" + (changeData[chLog[i]][0] + 1) + "↔" + "0" + (changeData[chLog[i]][1] + 1) + ";&nbsp;&nbsp;&nbsp;";
		if(i%3==2)
			str = str + '<br />';
	}
	str = str + '</p>';
	// console.log(cnum);
	$("#flowMap").html(str);
	for(i=0; i<4; i++){
		$(".guessImg").eq(i).addClass(className + cnum[i]);
	}
	$(".guessImgbg").eq(q).addClass("guessImgbgQ");
	// console.log("cnum:", cnum);
}
function flipfront(){
	$(".guessImgbg").css("transform", "rotateY(180deg)");
	$(".guessImg").css("transform", "rotateY(0deg)");	
}
function flipback(){
	$(".guessImg").css("transform", "rotateY(180deg)");
	$(".guessImgbg").css("transform", "rotateY(0deg)");	
}
function checkAns(n){
	if(cnum[q] == num[n]){
		count++;
		score.push("true");
	}else{
		score.push("false");
	}
	nonHit = false;
}
function num2Image(num){
	var filePrefix = "<img src = './images/minions/0";
	var fileSuffix = ".png' />";
	var str = num.toString();
	var result = "";
	if(str.length == 1){
		str = "0" + str;
	}
	result = result + filePrefix + str + fileSuffix;
	// console.log(result);
	return result;
}
function showTime(){
	ms++;
	if(sec==60){min++;sec=0;}
	if(ms==100){sec++;ms=0;}
	var msStr=ms;
	if(ms<10){msStr="0"+ms;}
	var secStr=sec;
	if(sec<10){secStr="0"+sec;}
	var minStr=min;
	if(min<10){minStr="0"+min;}
	$('#showtime span:eq(0)').html(minStr);
	$('#showtime span:eq(2)').html(secStr);
	$('#showtime span:eq(4)').html(msStr);
}
function getTime(min=0, sec=0, ms=0){
	var msStr=ms;
	if(ms<10){msStr="0"+ms;}
	var secStr=sec;
	if(sec<10){secStr="0"+sec;}
	var minStr=min;
	if(min<10){minStr="0"+min;}
	$('#getTime span:eq(0)').html(minStr);
	$('#getTime span:eq(2)').html(secStr);
	$('#getTime span:eq(4)').html(msStr);
	return minStr + ':' + secStr + ':' + msStr;
}
function storage(){
	var data={
			name: $("#player").val(),
			time: [min, sec, ms],
			grade: count
	};
	var time=new Date().getTime();
	localStorage.setItem(time, JSON.stringify(data));
}
function addRankTable(){
	var tablePrefix = '<table id="rankTable">';
	var tableSuffix = '<table/>';
	var tableData = '<tr><th>序号</th><th>昵称</th><th>总得分</th><th>总用时</th></tr>';
	var data;
	if(localStorage.length!=0){
		for(var i=0;i<localStorage.length;i++){
			var key=localStorage.key(i);
			var jsonStr = localStorage.getItem(key);
			var json = JSON.parse(jsonStr);
			var trId = 'tr_' + ((i+1)<4?(i+1):('4_'+i%2));
			data = '<tr class="'+trId+'"><td>'+ (i + 1) + '</td><td>'
					+ json.name + '</td><td>'
					+ json.grade + '</td><td>'
					+ getTime(json.time[0], json.time[1], json.time[2]) + '</td></tr>';
			tableData += data;
		}
	}
	return tablePrefix + tableData + tableSuffix;
}
function intruction(){
	str = '<p>简介：<br />在游戏中共有四张卡牌,记住卡牌的位置，点击开始按钮，卡牌将会翻面。\
		   此时，点击调换按钮，游戏开始。在本框内会出现卡牌换位的日志。根据日志推断需要 \
		   猜测的卡牌到底是什么吧！在候选答案中选出你的答案哦。<br /> \
		   什么？没记住卡牌位置吗？那就在调换前让你再看看好了，为时四秒。把握时间吧！！</p>';
	$("#flowMap").html(str);
}



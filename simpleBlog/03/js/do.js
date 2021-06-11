var holes = [
	[{x:"130px", y:"170px", isFull: false}, {x:"322px", y:"170px", isFull: false}, {x:"516px", y:"170px", isFull: false}],
	[{x:"106px", y:"262px", isFull: false}, {x:"322px", y:"262px", isFull: false}, {x:"522px", y:"262px", isFull: false}],
	[{x:"97px", y:"362px", isFull: false}, {x:"322px", y:"362px", isFull: false}, {x:"544px", y:"362px", isFull: false}],
];

var gameTimeId = null;
var xhr = null;
var v;  // normal mouse stop (mm)
var w;	// hit mouse stop(mm)
var main;
var mouses;
var cacheScore = 0;  // user grade
var timelyScore = 0;  // through result
var levelNeed = {
	level1 : {gradeNeed : 10, v : 3000, w : 1000},
	level2 : {gradeNeed : 40, v : 3000, w : 1000},
	level3 : {gradeNeed : 100, v : 3000, w : 1000},
	level4 : {gradeNeed : 160, v : 3000, w : 1000},
	level5 : {gradeNeed : 220, v : 3000, w : 1000},
	level6 : {gradeNeed : 280, v : 3000, w : 500},
	level7 : {gradeNeed : 340, v : 2800, w : 500},
	level8 : {gradeNeed : 420, v : 2400, w : 500},
	level9 : {gradeNeed : 520, v : 1800, w : 500},
};
var gameLevel = 1; 
var levelNum = Object.keys(levelNeed).length;  // get json.length

var textScore = [];
// var textScore =[
// 	{"name": "q", "score": "12", "level": "1"},
// 	{"name": "b", "score": "42", "level": "4"},
// 	{"name": "c", "score": "22", "level": "3"},
// 	{"name": "q", "score": "22", "level": "3"},
// ];

window.onload = function init(){
	main = document.getElementById("main");
	mouses = main.getElementsByTagName("span");
	var Rank = document.getElementById("rank");
	var stormRank = document.getElementById("stormRank");
	var rankFormat = stormRank.innerHTML;

	for(var index=0; index<mouses.length; index++){
		mouses[index].onmouseover = mouseOver;
		mouses[index].onmouseout = mouseOut;
		mouses[index].onmouseup = mouseHit;
		mouses[index].index = index;
		mouses[index].style.display = "none";
	}

	document.getElementById("btnPlay").onclick = function startGame(){
		// console.log("startGame");
		cacheScore = 0;
		timelyScore = -1;
		gameLevel = 1;
		recordScore();
		document.getElementById("gameCover").style.display = "none";
		document.getElementById("container").style.display = "inherit";
		levelGrade();
		moveMouses();
		if(gameTimeId){
				clearInterval(gameTimeId);
		}
		gameTimeId = setInterval(updateGameTime, 1000);
	}
	
	document.getElementById("btnRetry").onclick = function reGame(){
		// console.log("reGame");
		cacheScore = 0;
		timelyScore = -1;
		gameLevel = 1;
		recordScore();
		document.getElementById("roller").style.left = "";
		document.getElementById("gameOver").style.display = "none";
		document.getElementById("container").style.display = "inherit";
		levelGrade();
		moveMouses();
		if(gameTimeId){
				clearInterval(gameTimeId);
		}
		gameTimeId = setInterval(updateGameTime, 1000);
	}
	
	document.getElementById("btnBackToMenu").onclick = function reCover(){
		document.getElementById("roller").style.left = "";
		document.getElementById("next").style.display = "none";
		document.getElementById("gameOver").style.display = "none";
		document.getElementById("gameCover").style.display = "inherit";
		document.getElementById("leveGrade").innerHTML = "";
		timelyScore = -1;
		recordScore();
	}
	
	document.getElementById("sub").onclick = subGrade;
	
	document.getElementById("hideSub").onclick = function(){
		document.getElementById("gradeSub").style.display = "none";
	}
	
	document.getElementById("hideRank").onclick = function(){
		Rank.style.display = "none";
		stormRank.innerHTML = rankFormat;
	}
	
	document.getElementById("rankSee").onclick = function(){
		var url = "http://192.168.99.203/lab/ajax/get.asp?appKey=201612203502035";
		doAjax(url, "GET", showGetLog);
		// console.log(Rank.innerHTML);
		// Rank.innerHTML = Rankfomat + addRankTable(textScore);
		// var stormRank = document.getElementById("stormRank");
		// var rankFormat = stormRank.innerHTML;
		// stormRank.innerHTML = rankFormat + addRankTable(textScore);
		Rank.style.display = "block";
	}
	
	document.getElementById("mySubmit").onclick = function(){
		var playerName = document.getElementById("player").value;
		if(playerName == ""){
			alert("请输入您的昵称");
		}else{
			var data = "name=" + playerName;
				data += "&score=" + (timelyScore==0?cacheScore:timelyScore) 
				data += "&level=" + gameLevel;
				// console.log(data);
			var url = "http://192.168.99.203/lab/ajax/add.asp?appKey=201612203502035";
			doAjax(url, "POST", showPostLog, data);
		}
	}
	
	document.getElementById("clearRank").onclick = function(){
		var url = "http://192.168.99.203/lab/ajax/clear.asp?appKey=201612203502035";
		  doAjax(url, "GET", showClearLog);
	}
}

function moveMouses(){
	var mouses = main.getElementsByTagName("span");
	// console.log(mouses);
	for(var index=0; index<((mouses.length<gameLevel)?mouses.length:gameLevel); index++){
		mouses[index].style.display = "block";
		moveMouse(index);
	}
}

function moveMouse(index){
    var mouse = document.getElementById("mouse" + index);
	if(!mouse.hitted){
		var i, j;
		do{
			i = Math.floor(Math.random()*3);
			j = Math.floor(Math.random()*3);
			// console.log(i, j, holes[i][j].isFull);
		}while(holes[i][j].isFull==true);

		mouse.style.left = holes[i][j].x;
		mouse.style.top = holes[i][j].y;

		if(mouse.i!=null && mouse.j!=null){
			holes[mouse.i][mouse.j].isFull = false;
		}
		mouse.i = i;
		mouse.j = j;
		holes[i][j].isFull = true;

		v = levelNeed["level" + gameLevel].v;
		mouse.stayId = setTimeout("moveMouse(" + index + ")", v);		
	}
}

function updateGameTime(){
	var roll = document.getElementById("roller");
	var gameTime = parseInt(roll.style.left) | 0;
	if(gameTime >= 80){
		if(gameLevel <= levelNum){
			throughGame();
		}
		else stopGame();
	}else{
		gameTime += 2;
		roll.style.left = gameTime + "%";
	}
}

function stopGame(){
	clearInterval(gameTimeId);
	gameTimeId = null;
	for(var i=0;i<mouses.length;i++){
		clearTimeout(mouses[i].stayId); 
		mouses[i].style.display = "none";
	}
	document.getElementById("container").style.display = "none";
	document.getElementById("gameOver").style.display = "inherit";
	// console.log("stopGame");
}

function mouseOver(){
	if(!this.hitted){
		this.className = "mouse over";
	}
}

function mouseOut(){
	if(!this.hitted){
		this.className = "mouse normal";
	}
}

function mouseHit(){
	this.className = "mouse hit";

	var count = document.getElementById("count");
	var x = parseInt(this.style.left);
	count.style.left = (x+36) + "px";
	count.style.top = this.style.top;
	count.style.display = "block";


	if(this.stayId!=null){
		clearTimeout(this.stayId);
		this.stayId = null;
	}

	w = levelNeed["level" + gameLevel].w;
	if(!this.hitted){
		this.hitted = true; //flag		
		recordScore();		
		setTimeout("mouseReset(" + this.index + ")", w);
	}	
}

function mouseReset(index){
	var mouse = document.getElementById("mouse" + index);
	mouse.className = "mouse normal";
	mouse.hitted = false;
	document.getElementById("count").style.display = "none";
	moveMouse(mouse.index);
}

function recordScore(){
	timelyScore += 1;
	// console.log(num2Image(score));
	// console.log(document.getElementById("grade").innerHTML);
	document.getElementById("grade").innerHTML = num2Image(timelyScore);
}

function num2Image(num){
	var filePrefix = "<img src = './images/num_";
	var fileSuffix = ".png' />";
	var str = num.toString();
	var result = "";
	for(var i=0;i<str.length;i++){
		var c = str.charAt(i);
		result = result + filePrefix + c + fileSuffix;
	}
	return result;
}

function throughGame(){
	var inNext = '<img src="./images/next.png" >';
	var head = ['<img id="head" src="./images/good.png" >', '<img id="head" src="./images/regret.png" >'];
	var game = '<img id="next_game" src="./images/next_game.png" onclick="nextLevel()" >';
	var tryagain = '<img id="tryagain" src="./images/tryagain.png" onclick="againLevel()" >';
	var back = '<img id="back" src="./images/back.png" onclick="reCover()" >';
	var nextDiv = document.getElementById("next");
	clearInterval(gameTimeId);
	gameTimeId = null;
	for(var i=0;i<mouses.length;i++){
		clearTimeout(mouses[i].stayId); 
		mouses[i].style.display = "none";
	}
	nextDiv.style.display = "block";
	if(timelyScore >= levelNeed["level" + gameLevel].gradeNeed){
		nextDiv.innerHTML = inNext + head[0] + game + tryagain + back;
		// console.log("恭喜过关");
	}else{
		nextDiv.innerHTML = inNext + head[1] + tryagain + back;
		// console.log("闯关失败");
	}
}

function nextLevel(){
	document.getElementById("next").style.display = "none";
	document.getElementById("roller").style.left = "";
	cacheScore = timelyScore;
	gameLevel += 1;
	levelGrade();
	moveMouses();
	if(gameTimeId){
			clearInterval(gameTimeId);
	}
	gameTimeId = setInterval(updateGameTime, 1000);
}

function againLevel(){
	document.getElementById("next").style.display = "none";
	document.getElementById("roller").style.left = "";
	timelyScore = cacheScore - 1;
	recordScore();
	moveMouses();
	if(gameTimeId){
			clearInterval(gameTimeId);
	}
	gameTimeId = setInterval(updateGameTime, 1000);
}

function reCover(){
	document.getElementById("roller").style.left = "";
	document.getElementById("next").style.display = "none";
	document.getElementById("container").style.display = "none";
	document.getElementById("gameOver").style.display = "none";
	document.getElementById("gameCover").style.display = "inherit";
	document.getElementById("leveGrade").innerHTML = "";
	cacheScore = timelyScore;
	timelyScore = -1;
	recordScore();
}

function levelGrade(){
	var grade = levelNeed["level" + gameLevel].gradeNeed;
	document.getElementById("leveGrade").innerHTML = num2Image(grade);
}

function subGrade(){
	// console.log(timelyScore, gameTimeId);
	if((timelyScore == 0 && cacheScore == 0) || gameTimeId != null){
		alert("检测到游戏进行中或不存在有效成绩，\n请在一局游戏结束后再进行提交");
	}else{
		document.getElementById("gradeSub").style.display = "block";
		document.getElementById("grade2").innerHTML = num2Image((timelyScore==0?cacheScore:timelyScore));
		document.getElementById("levelget").innerHTML = num2Image(gameLevel);
	}
}

function addRankTable(text){
	var tablePrefix = '<table id="rankTable">';
	var tableSuffix = '<table/>';
	var tableData = '<tr><th>名次</th><th>昵称</th><th>总得分</th><th>关卡</th></tr>';
	var data;
	if(text.length != 0){
		text.sort(compare);
		for(var num = 0;num<text.length;num++){
			var trId = 'tr_' + ((num+1)<4?(num+1):('4_'+num%2));
			data = '<tr class="'+trId+'"><td>'+ (num + 1) + '</td><td>'
					+ text[num].name + '</td><td>'
					+ text[num].score + '</td><td>'
					+ text[num].level + '</td></tr>';
			tableData += data;
		}	
	}

	return tablePrefix + tableData + tableSuffix;
}

function compare(a, b){
	if(a.level != b.level){
		return b.level- a.level;
	}else if(a.score != b.score){
		return b.score - a.score;
	}else{
		return b.name - a.name;
	}
}

// create XMLHttpRequest
function initXhr(){
	var xhr;
	if(window.XMLHttpRequest){//for all new browsers (include IE7+)
		xhr = new XMLHttpRequest();
	}else if(window.ActiveXObject){//for IE6
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xhr;
}

function doAjax(url, method, callback, body){
	xhr = xhr || initXhr();
	xhr.open(method, url);
	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhr.onreadystatechange = callback;
	xhr.send(body);
}

//定义响应函数
function showPostLog(){
	if(xhr.readyState == 4){ //服务器已经响应
		if(xhr.status == 200){  //请求成功
			//根据响应文本(xhr.responseText)更新页面
			var json = JSON.parse(xhr.responseText);
			var log;
			if(json.code==1){
				log = "提交成功";
			}else{
				log = "提交失败，可能原因：" + json.msg;
			}
		console.log(log);
		}//if(xhr.status == 200) 
	}// if(xhr.readyState == 4)
}

//定义响应函数
function showGetLog(){
	if(xhr.readyState == 4){ //服务器已经响应
		if(xhr.status == 200){  //请求成功
			//根据响应文本(xhr.responseText)更新页面
			var json = JSON.parse(xhr.responseText);
			var log = "";
			var stormRank = document.getElementById("stormRank");
			var rankFormat = stormRank.innerHTML;
			if(json.code==1){
				log = "获取成功，数据是 : " + xhr.responseText;
				textScore = json.data;
				stormRank.innerHTML = rankFormat + addRankTable(textScore);
			}else{
				log = "获取失败，可能原因：" + json.msg;
			}
			console.log(log);
		}//if(xhr.status == 200) 
	}// if(xhr.readyState == 4)
}

//定义响应函数
function showClearLog(){
	if(xhr.readyState == 4){ //服务器已经响应
		if(xhr.status == 200){  //请求成功
			//根据响应文本(xhr.responseText)更新页面
			var json = JSON.parse(xhr.responseText);
			var log;
			if(json.code==1){
				log = "清空成功";
			}else{
				log = "清空失败，可能原因：" + json.msg;
			}
		console.log(log);
		}//if(xhr.status == 200) 
	}// if(xhr.readyState == 4)
}


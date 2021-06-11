function isPrime(num){
	if(num == 1) return false;
	else if(num == 2 || num == 3) return true;
	for(var i=2;i<=Math.sqrt(num)+1;i++){
		if(num%i == 0){
			return false;
			break;
		}else{
			continue;
		}
	}
	if(i >= Math.sqrt(num)+1){
		return true;
	}
}
function showPrime(){
	var num = 1;
	var cont = 0;
	document.write("<table><tr>");
	while(cont<100){
		if(isPrime(num)){
			document.write("<td id='pr'>"+num+"</td>");
		}else{
			document.write("<td>"+num+"</td>");
		}
		cont ++;
		if(cont%10 == 0 && cont!=0 &&cont !=100) document.write("</tr><tr>");
		num++;
	}
	document.write("</tr></table>");
}
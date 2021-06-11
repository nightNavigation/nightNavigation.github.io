var personTax = {
	"taxFree" : 3500,
	"taxRate" :[
		{
			"down" : 0,
			"up"   : 1500,
			"rate" : 0.03,
			"Qcal" : 0
		},
		{
			"down" : 1500,
			"up"   : 4500,
			"rate" : 0.10,
			"Qcal" : 105
		},
		{
			"down" : 4500,
			"up"   : 9000,
			"rate" : 0.20,
			"Qcal" : 555
		},
		{
			"down" : 9000,
			"up"   : 35000,
			"rate" : 0.25,
			"Qcal" : 1005
		},
		{
			"down" : 35000,
			"up"   : 55000,
			"rate" : 0.30,
			"Qcal" : 2755
		},
		{
			"down" : 55000,
			"up"   : 80000,
			"rate" : 0.35,
			"Qcal" : 5505
		},
		{
			"down" : 80000,
			"rate" : 0.45,
			"Qcal" : 13505
		}
	]
};

var yearMoney;
var income;

function waySel(){
	var myselect = document.getElementsByName("monthTaxSel");
	var taxWrite = document.getElementById("taxWrite");
	var taxSel = document.getElementById("taxSel");
	// alert("waySel");
	if(myselect[0].checked){
		// console.log(0);
		taxWrite.disabled = true;
		taxWrite.value = "";
		taxSel.disabled = false;
	} 
	else{
		// console.log(1);
		taxWrite.disabled = false;
		taxSel.disabled = true;
		taxSel[0].selected = true;
	} 
}

function momeySel(){
	var taxWrite = document.getElementById("taxWrite");
	var taxSel = document.getElementById("taxSel");
	var index = taxSel.selectedIndex;
	var rate = Math.floor(Math.random() * 17 + 3);
	
	if(taxWrite.disabled == true){
		yearMoney = rate * taxSel[index].value;
		income = taxSel[index].value;
		// console.log("taxSel selected yearMoney = " + yearMoney);
	} 
	else{
		yearMoney = rate * taxWrite.value;
		income = taxWrite.value;
		// console.log("taxWrite selected yearMoney = " + yearMoney);
	} 
	var textY = document.getElementById("textY");
	textY.innerHTML = "rate : " + rate + " ; &nbsp;&nbsp; money : " + yearMoney;
}

function calTax(){
	// alert(income);
	var monthTax, yearTax;
	var num = income-personTax.taxFree;
	var output = document.getElementById("ans");
	if(num > 0){
		monthTax = monthTaxCal(num);
		yearTax = yearTaxCal(yearMoney);
	}else{
		monthTax = 0;
		yearTax = yearTaxCal((yearMoney+num));
	}
	// console.log(monthlySalary, yearEndAwards);
	output.innerHTML = "<p>月工资" + income + " 元，每月所得税为" + monthTax + 
					" 元；年终奖" + yearMoney + " 元，一次性所得税为 " + yearTax + 
					"元；全年所得税共计 " + monthTax*12 + yearTax + " 元</p>";
	output.innerHTML += "最佳方案 ： 当月月工资为 " + bestPlan().monthlySalary + "年终奖为 " + bestPlan().yearEndAwards;
}

function monthTaxCal(income){
	var taxMoney;
	// console.log("month income : ", income);
	for(var i=6;i>=0;i--){
		if(income > personTax.taxRate[i].down){
			taxMoney = income * personTax.taxRate[i].rate - personTax.taxRate[i].Qcal;
			break;
		}
	}
	// console.log(taxMoney);
	return Math.round(taxMoney*10)/10;
}

function yearTaxCal(income){
	var taxMoney;
	// console.log("year income : ", income);
	for(var i=6;i>=0;i--){
		if(income/12 > personTax.taxRate[i].down){
			taxMoney = income * personTax.taxRate[i].rate - personTax.taxRate[i].Qcal;
			break;
		}
	}
	// console.log(taxMoney);
	return Math.round(taxMoney*10)/10;
}

function bestPlan(){
	var differ;
	var monthTax1, yearTax1, monthTax2, yearTax2;
	var num = income-personTax.taxFree;
	monthTax1 = monthTaxCal(num);
	yearTax1 = yearTaxCal(yearMoney);
	for(var i=6;i>=0;i--){
		if(yearMoney/12 > personTax.taxRate[i].down){
			differ = yearMoney - personTax.taxRate[i].down * 12;
			yearTax2 = yearTaxCal(personTax.taxRate[i].down * 12);
			break;
		}
	}
	monthTax2 = monthTaxCal(num + differ);
	if(monthTax1 + yearTax1 > monthTax2 + yearTax2){
		return {monthlySalary : income + differ, yearEndAwards : yearMoney - differ};
	}else{
		return {monthlySalary : income, yearEndAwards : yearMoney};
	}
}




$(function(){
	$("tr .plus").on("click", function(e){
		var count = parseInt($(this).prev().html()) + 1;
		var price = parseFloat($(this).parent().prev().html());
		var totalPrice = parseFloat($("#totalPrice").html());
		// console.log(count, price);
		$(this).prev().html(count);
		$(this).parent().next().html(count * price);
		$("#totalPrice").html(totalPrice + price);
	});
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
	
})
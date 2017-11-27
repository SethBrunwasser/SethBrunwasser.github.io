// Real Estate Analysis calculator

$(document).ready(function(){
	$("input").change(function(){
			$("#cap-rate").val(yearOneCapRate());
			$("#ror-10").val(TenRoR());
			$("#ror-20").val(TwentyRoR());
			$("#ror-30").val(ThirtyRoR());
	})
})

//Get value from id
function getInput(id) {
	var val = $(id).val();
	if(val){
		var num = parseInt(val);
	} else {
		var num = 0;
	}
	return num;
}

//Return Total Operating Income
function TotalOperatingIncome(){
	var operatingIncome = 12*getInput("#monthly-rent");
	return operatingIncome;
}

//Return Total Operating Expenses
function TotalOperatingExpenses(){
	var monthlyToe = getInput("#electricity") + getInput("#water-sewer")
				+ getInput("#garbage") + getInput("#hoas")
				+ getInput("#insurance") + getInput("#management");
	var monthlyPropertyTax = (getInput("#price") * getInput("#property-taxes")) / 12;
	return monthlyToe + monthlyPropertyTax;
}

//Return Cap Rate
function yearOneCapRate(){
	return (TotalOperatingIncome()-TotalOperatingExpenses())/TotalOperatingExpenses();
}


//Calculate RoR - 10 Years
function TenRoR(){
	price = getInput("#price")
	return price;
}


//Calculate RoR - 20 Years
function TwentyRoR(){

	return "";
}

//Calculate RoR - 30 Years
function ThirtyRoR(){

	return "";
}
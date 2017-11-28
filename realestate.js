// Real Estate Analysis calculator

$(document).ready(function(){
	$("input").change(function(){
			$("#cap-rate").val(yearOneCapRate());
			$("#Cash-on-Cash").val(yearOneCashOnCash())
			$("#ror-10").val(TenRoR());
			$("#ror-20").val(TwentyRoR());
			$("#ror-30").val(ThirtyRoR());
	})
})

//Get value from id
function getInput(id) {
	var val = $(id).val();
	if(val){
		if(val.indexOf("%") > -1){
			val = val.replace("%", "");
		}
		if(val.indexOf("$") > -1){
			val = val.replace("$", "");
		}
		if(val.indexOf(",") > -1){
			val = val.replace(",", "");
		}
		var num = parseInt(val);
	} else {
		var num = 0;
	}
	return num;
}

//Return Property Value
function propertyValue(){
	return getInput("#after-repair-value");
}

function purchasePrice(){
	var price = getInput("#price");
	return price;
}

//Return Down Payment
function downPayment(){
	var downpayment = purchasePrice() * (getInput("#downpayment") / 100);
	return downpayment;
}

function loanLength(){
	var length = getInput("#amortized-length");
	return length;
}

//Return Monthly Mortgage
function monthlyMortgage(){
	var numOfPayments = loanLength()*12;
	var rate = getInput("#loan-interest-rate")/(numOfPayments * 100);
	var principle = purchasePrice() - downPayment();
	var monthlyMortgagePayment = principle * ((rate * Math.pow(1+rate, numOfPayments))/(Math.pow(1+rate, numOfPayments)-1));

	console.log(monthlyMortgagePayment);

	return monthlyMortgagePayment;
}

//Return Initial Investment
function initialInvestment(){
	var initialInvestment = downPayment() + getInput("#closing-costs");
	return initialInvestment;
}

//Return Total Operating Income
function TotalMonthlyOperatingIncome(){
	var operatingIncome = getInput("#monthly-rent");
	return operatingIncome;
}

//Return Total Operating Expenses
function TotalMonthlyOperatingExpenses(){
	var monthlyToe = getInput("#electricity") + getInput("#water-sewer")
				+ getInput("#garbage") + getInput("#hoas")
				+ getInput("#insurance") + getInput("#management");
	var monthlyPropertyTax = (getInput("#after-repair-value") * getInput("#property-taxes")) / 12;
	return monthlyToe + monthlyPropertyTax;
}

//Return Net Operating Income
function netMonthlyOperatingIncome(){
	return TotalMonthlyOperatingIncome() - TotalMonthlyOperatingExpenses();
}

//Return Cashflow
function monthlyCashFlow(){
	var monthlyCashflow = netMonthlyOperatingIncome() - monthlyMortgage();
	return monthlyCashflow;
}

//Return Year One Cash on Cash Return
function yearOneCashOnCash(){
	var yearOneCashOnCash = monthlyCashFlow()/initialInvestment();
	return yearOneCashOnCash;
}

//Return Cap Rate
function yearOneCapRate(){
	return netMonthlyOperatingIncome()/propertyValue();
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
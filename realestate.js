// Real Estate Analysis calculator

$(document).ready(function(){
	$("input").change(function(){
			$("#cap-rate").val(yearOneCapRate.formatPercent());
			$("#Cash-on-Cash").val(yearOneCashOnCash.formatPercent())
			$("#equity-5").val(equity(5).formatMoney(2));
			$("#ror-10").val(TenRoR().formatPercent());
			$("#ror-20").val(TwentyRoR().formatPercent());
			$("#ror-30").val(ThirtyRoR().formatPercent());
	})
})

//Get value from id
function getInput(id) {
	var val = $(id).val();
	if(val){
		if(val.indexOf("%") > -1){
			var val = val.replace("%", "");
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

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
 };

Number.prototype.formatPercent = function(){
	var n = this;
	return (n * 100).toString().concat("%");
}


//Input variables
var propertyValue = function() {return getInput("#after-repair-value");}
var purchasePrice = function() {return getInput("#price");}
var downPayment = function() {return getInput("#downpayment")/100;}
var loanLength = function() {return getInput("#amortized-length");}
var loanInterestRate = function() {return getInput("#loan-interest-rate");}
var closingCosts = function() {return getInput("#closing-costs");}
var monthlyRent = function() {return getInput("#monthly-rent");}
var pvGrowth = function() {return getInput("#annual-pv-growth");}
//Return Monthly Mortgage
var monthlyMortgage = function() {
	var numOfPayments = loanLength()*12*100;
	var rate = loanInterestRate()/numOfPayments;
	var principle = purchasePrice() - downPayment();
	var monthlyMortgagePayment = principle * ((rate * Math.pow(1+rate, numOfPayments))/(Math.pow(1+rate, numOfPayments)-1));
	return monthlyMortgagePayment;
}

//Return Initial Investment
function initialInvestment(){
	var initialInvestment = downPayment() + closingCosts();
	return initialInvestment;
}

//Return Total Operating Expenses
var monthlyOperatingExpenses = function() {var monthlyToe = getInput("#electricity") + getInput("#water-sewer")
				+ getInput("#garbage") + getInput("#hoas")
				+ getInput("#insurance") + getInput("#management");
				var monthlyPropertyTax = (getInput("#after-repair-value") * getInput("#property-taxes")) / 12;
				return monthlyToe + monthlyPropertyTax;}

//Return Net Operating Income
var netMonthlyOperatingIncome = function() { return monthlyRent() - monthlyOperatingExpenses();}

//Return Cashflow
var monthlyCashFlow = function(){ return netMonthlyOperatingIncome() - monthlyMortgage();}

//Return Year One Cash on Cash Return
var yearOneCashOnCash = function(){ return monthlyCashFlow()/initialInvestment();}

//Return Cap Rate
var yearOneCapRate = function(){return netMonthlyOperatingIncome()/propertyValue();}

//equity calculator
function equity(year){
	//Property Value * (1 + Appreciation Rate)^year
	var rate = pvGrowth() / 100;
	var equityOneYear = propertyValue() * Math.pow(1 + rate, year);
	return equityOneYear;
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
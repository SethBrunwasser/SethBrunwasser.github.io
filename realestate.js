// Real Estate Analysis calculator

$.fn.isInViewport = function() {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();

    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    return elementBottom > viewportTop && elementTop < viewportBottom;
};

$(document).ready(function(){

	// Quick Analysis
	$("input").change(function(){
			//$("#yearOne-monthly-cashflow").text("123");
			ReplaceCellContent("yearOne-monthly-cashflow", "1234");
			$("#cap-rate").val(yearOneCapRate);
			$("#Cash-on-Cash").val(yearOneCashOnCash);
			$("#equity-5").val(equity(5).formatMoney(2));
			$("#ror-10").val(TenRoR())
	})




	// Closer Look animation
	$("#closer-look").hide()
	$(window).on('resize scroll', function() {
	    if ($('#tax-benefits-header').isInViewport()) {
	    	$("#closer-look").fadeIn({queue: false, duration: 'slow'});
	        $("#closer-look").animate({
			    width: "70%",
			    marginLeft: "0.3in",
			    fontSize: "2em",
			    borderWidth: "10px"
			 }, 2000 );
	        $(this).off('scroll');
	    }
	});



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


//Input variables
var propertyValue = function() {return getInput("#after-repair-value");}
var purchasePrice = function() {return getInput("#price");}
var downPayment = function() {return getInput("#downpayment")/100;}
var loanLength = function() {return getInput("#amortized-length");}
var loanInterestRate = function() {return getInput("#loan-interest-rate");}
var closingCosts = function() {return getInput("#closing-costs");}
var monthlyRent = function() {return getInput("#monthly-rent");}
var pvGrowth = function() {return getInput("#annual-pv-growth")/100;}
var incomeGrowth = function() {return getInput("#annual-income-growth")/100}
var expensesGrowth = function() {return getInput("#annual-expenses-growth")/100}
//Return Monthly Mortgage
var monthlyMortgage = function() {
	var numOfPayments = loanLength()*12*100;
	var rate = loanInterestRate()/numOfPayments;
	var principle = purchasePrice() - (downPayment() * purchasePrice());
	var monthlyMortgagePayment = principle * ((rate * Math.pow(1+rate, numOfPayments))/(Math.pow(1+rate, numOfPayments)-1));
	return monthlyMortgagePayment;
}

//Return Initial Investment
function initialInvestment(){
	var initialInvestment = (downPayment() * purchasePrice()) + closingCosts();
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
var yearlyCashFlow = function(){ return monthlyCashFlow()*12;}
//Return Year One Cash on Cash Return
var yearOneCashOnCash = function(){ return (monthlyCashFlow()/initialInvestment()).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});}

//Return Cap Rate
var yearOneCapRate = function(){return (netMonthlyOperatingIncome()/propertyValue()).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2});}

//equity calculator
function equity(year){
	//Property Value * (1 + Appreciation Rate)^year
	var rate = pvGrowth();
	var equityOneYear = propertyValue() * Math.pow(1 + rate, year);
	return equityOneYear;
}

//Calculate ROI - 10 Years
function TenROI(){
	// Cashflow + Equity - initialInvestment/InitialInvestment
	var yearTenCashFlow = yearlyCashFlow()*Math.pow(1+incomeGrowth(), 10)
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
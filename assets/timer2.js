var finishdate = new Date($("#finishdate").html());
var d = new Date();

if (finishdate == 'Invalid Date'){
	finishdate = new Date(d.setHours(24,0,0,0));
}

var todaydate = new Date();
var campaigndate = new Date(finishdate.getFullYear(), finishdate.getMonth(), finishdate.getUTCDate());

if (todaydate>campaigndate){
  campaigndate = new Date(d.setHours(24,0,0,0));
}

$(function () {
	$('#timer').countdown({until: $.countdown.UTCDate(-8, campaigndate), padZeroes: true, format: 'DHMS'});
});
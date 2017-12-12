var finishdate = new Date($("#finishdate").html());
var qtysold = $("#qtysold").html();
var qtyavailable = $("#qtyavailable").html();
var total_stock = $("#total_stock").html();
var total_variants = $("#total_variants").html();
var producttype = $("#producttype").html();


var max_stock = Number(total_variants)*5000;
var amount_sold = max_stock-Number(total_stock)

qtysold = Number(qtysold) + amount_sold;

var qtyleft = Number(qtyavailable) - qtysold;

var weekdays = ["SUNDAY", "MONDAY", "TUESDAY","WEDNESDAY","THURSDAY","FRIDAY","SATURDAY"];

var bartext;

if (finishdate == 'Invalid Date'){
bartext= 'HURRY! ONLY A FEW HOURS LEFT!';
}
else {
     bartext= 'AVAILABLE UNTIL ' + weekdays[finishdate.getDay()].toString() + " " + finishdate.getDate().toString() + "!";
}

var total_items = 100;

var remaining_items = Math.round((qtysold/qtyavailable)*100);

if (remaining_items>=95) {
  if (qtyleft<1)
      qtyleft=3;
  bartext='HURRY! ONLY A <span class="qtyleftspan" style="background-color:#cc0000;color:#fff;border-radius:4px;padding:0px 4px 0px 4px;text-align:center">' + 'FEW' + '</span> LEFT!';
}

var soldclaimed = "SOLD";

if (producttype=='1')
   soldclaimed = "CLAIMED";
    


(function( $ ) {
 
    $.fn.progressbar = function() {
      	var progress_bar_html = "<center><span class='progressbartext'>" + qtysold + " " + soldclaimed + ". " + bartext + "</span></center>" + "<div id='pbar' style='height:5px'></div><div class='progressbar'><div style='width:100%'></div></div>";
      	
        this.html(progress_bar_html + this.html());
      	
        updateMeter(this);
 		   var ths = this;
      
        var spanred=1;
      
    	setInterval(function() {
        if (spanred == 1) {
            $('.qtyleftspan').css('background-color', '#fff');
          	$('.qtyleftspan').css('color', '#cc0000');
          	spanred=2;
        } else {
            $('.qtyleftspan').css('background-color', '#cc0000');
          	$('.qtyleftspan').css('color', '#fff');
          	spanred=1;
        }    
    }, 2000);      
      
    };
   
    function updateMeter(ths){
		//var progress = 100*remaining_items/total_items;
      	var progress = 100*remaining_items;
      if(remaining_items < 10) {
      	ths.find('.progressbar div:first').addClass('less-than-ten');
      }
        ths.find('.progressbar').addClass('active progress-striped');
      
      if (remaining_items>=95) {
  		  $('.progress-striped').css('background-color', '#C7C7C7');
          ths.find('.progressbar div:first').css('background-color', '#CA0000');
          progress = 100*remaining_items/total_items;
        }
      setTimeout(function(){
      
      	myanimate(ths.find('.progressbar div:first'), progress);
         ths.find('.progressbar').removeClass('active progress-striped');
    },1000);
    }	
}( jQuery ));



function myanimate(elem, total_width) {
	
  	var width = 0;
  	var max_width = parseInt(elem.closest('.progressbar').css('width'));
  	var elem_current_width = 0;
  	if(elem_current_width > total_width) {
     	 width = elem_current_width;
    }
  	//console.log("max_width = " + max_width);
  	//console.log("elem_current_width = " + elem_current_width);
  	function frame() {
      if(elem_current_width > total_width) {
      	width--;  // update parameters 
      } else {
      	width++;  // update parameters 
      }
    
      	//console.log("width = " + width);
    	elem.css('width', width + '%'); // show frame 

    	if (width == total_width || width <= 0 || width >= 100)  // check finish condition
      	clearInterval(id);
  	}

  var id = setInterval(frame, 40); // draw every 10ms
}

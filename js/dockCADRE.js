$(document).ready(function() {

 var easing = 'easeOutExpo';
 
 function resize() {
 var width = $(window.viewport).width();
 if (width < 267) { width = 267; }
 //$('#dock').animate({'left': Math.floor((width -
 //($('#dock').outerWidth())) / 5)}, {queue:false, duration:300, easing: easing}); }
 
 $('#dock').animate({'left': Math.floor((width -
 ($('#dock').outerWidth())))}, {queue:false, duration:300, easing: easing}); }

 //resize();

 $(window).bind('resize', function() {
 //resize();
 });

 $('#dock').hide().css('visibility', 'visible').fadeIn("fast");
 //$('#dock').bind('mouseenter', function() {
 //$('#dock').animate({"height": "305px"},{queue:false, duration:300, easing: easing});
 //});
 //$('#dock').bind('mouseleave', function() {
 //$('#dock').animate({"height": "158px"},{queue:false, duration:300, easing: easing});
 //});
});




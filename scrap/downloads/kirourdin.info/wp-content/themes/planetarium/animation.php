<?php 
function get_box_elements($id){
echo '<div class="text-line line-'.$id.'"></div>';
}
function draw_img($url) {

echo '<img src="'. get_bloginfo('template_url').'/animation/'.$url.'" />';
}
?>
<div id="box1">
<?php for($i=1;$i<5;$i++){
get_box_elements($i);
}
?>
</div>

<div id="box2">
<?php for($i=1;$i<5;$i++){
get_box_elements($i);
}
?>
</div>


<div id="one">
<?php draw_img('set1-1.png');?>
</div>

<div id="set1-2">
<?php draw_img('set1-2.png');?>
</div>

<div id="set1-3">
<?php draw_img('set21-3.png');?>
</div>

<div id="set1-4">
<?php draw_img('set21-4.png');?>
</div>

<div id="set1-5">
<?php draw_img('set1-5.png');?>
</div>

<div id="set2-1">
<?php draw_img('set2-1.png');?>
</div>

<div id="set2-2">
<?php draw_img('set2-2.png');?>
</div>

<div id="set2-3">
<?php draw_img('set21-3.png');?>
</div>

<div id="set2-4">
<?php draw_img('set21-4.png');?>
</div>

<div id="set2-5">
<?php draw_img('set2-5.png');?>
</div>

<!-- object style="height:0px;position:absolute; top:-50000px;left:-100px;text-indent:-1000px" width="1" height="1"><param name="movie" value="http://www.youtube.com/v/m4tcRlHY-3Q?version=3&amp&autoplay=1;hl=en_US"></param><param name="allowFullScreen" value="true"></param><param name="allowscriptaccess" value="always"></param><embed src="http://www.youtube.com/v/m4tcRlHY-3Q?version=3&autoplay=1&amp;hl=en_US" type="application/x-shockwave-flash" width="1" height="1" allowscriptaccess="always" allowfullscreen="true"></embed></object -->

<script type="text/javascript" >
function ResizeMe(){ 
var body = $('body').height();
var img = $('#image img').height();
var newimg = (body - 102)/2;
$('#image').css('top', newimg);
}
</script>

<script type="text/javascript" >

var turns = 0;
var multiplier = new Number;
var delay;
var sequence = new Array();
var actions = new Array();
var selectors = new Array();
var count = 1;

var templ = {
  'rotate': function( id ){ return "$('"+id+"').css({'-webkit-transform':'translate(0) rotate(0deg)','-moz-transform':'translate(0) rotate(0deg)','opacity':1})"},
  'slide': function( id ){ return "$('"+id+"').css({'left':'400px','opacity':1})"},
  'slide_out': function( id ){ return "$('"+id+"').css({'left':'330px','opacity':0})"},
  'slide_2': function( id ){ return "$('"+id+"').css({'right':'200px','opacity':1})"},
  'slide_4': function( id ){ return "$('"+id+"').css({'top':'110px','opacity':1})"},
  'slide_2_move': function( id ){ return "$('"+id+"').css({'right':'455px'})"},
  'slide_2_out': function( id ){ return "$('"+id+"').css({'opacity':0})"},
  'hide': function( id ){ return "$('"+id+"').hide()"},
  'intro': function( id ){ return "$('"+id+"').fadeIn(3000)"},
  'slide_3': function( id ){ return "$('"+id+"').css({'left':'510px','opacity':1})"}
} 

function seq(action, id, timeout){
sequence.push(timeout*multiplier + delay);
//alert(timeout*multiplier + delay);
actions.push(action);
selectors.push(id);
return false;
}

function slow_down(factor, d){
multiplier = Math.pow((1 + factor/100),turns);
delay = d;
//alert("asdf: "+multiplier);
}

function end_turn (){
//clearTimeout(t);
var maxValue = 6
turns=Math.min(turns+1,maxValue);
setup();
//next_slide();
}

function next_slide(){
if (actions.length == 0)
{end_turn()}//alert('No mo.') 
else
{
var z = sequence.splice(0,1);
var x = actions.splice(0,1);
var y = selectors.splice(0,1);
play(x,y,z);
}
}

function play(action, id, timeout){
var t=setTimeout(templ[action](id)+";next_slide();",timeout);
//alert(timeout);
}

function setup(){
slow_down(33, 0);

seq('slide','#one',100);
seq('slide','#set1-2',300);
seq('slide','#one',100);
seq('slide_2','#set1-3',2200);
seq('slide_out','#one',300);
seq('slide_out','#set1-2',500);
seq('slide_2','#set1-4',300);
seq('slide_2_move','#set1-4',900);
seq('slide_2','#set1-5',300);
seq('slide_2_out','#set1-3',1000);
seq('slide_2_out','#set1-5, #set1-4',600);

seq('rotate','#box1 .line-1', 0);
seq('rotate','#box1 .line-2', 400);
seq('rotate','#box1 .line-3', 300);
seq('rotate','#box1 .line-4', 400);

seq('slide_3','#set2-1',100);
seq('slide_3','#set2-2',600);
seq('slide_3','#set2-1',100);
seq('slide_out','#set2-1',1900);
seq('slide_3','#set2-3',150);
seq('slide_2_out','#set2-2',500);
seq('slide_4','#set2-5',0);
seq('slide_2_out','#set2-3',3000);

seq('rotate','#box2 .line-1', 0);

seq('slide_2_out','#set2-5, #set1-4',100);
seq('rotate','#box2 .line-2', 300);
seq('rotate','#box2 .line-3', 400);
seq('rotate','#box2 .line-4', 500);


seq('fadeout','#img0',10000);

seq('fadein','#img'+count,300);
seq('fadeout','#img'+count++,8000);


seq('fadein','#img'+count,2000);
seq('fadeout','#img'+count++,23000);
seq('fadein','#img'+count++,300);

}

$(document).ready(function() {
setup();
next_slide();
});


</script>
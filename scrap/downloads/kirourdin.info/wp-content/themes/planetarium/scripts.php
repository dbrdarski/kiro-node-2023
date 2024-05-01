<?php
function animate() {
$browser = get_user_browser();
$args=func_get_args();
$selector=array_shift($args);
$left="" . array_shift($args);	
if($left=="") {
	$left = 'Math.max((img_offset), slideShow.slideWidth + 1048)';
	}


if($browser == "ie"){
	echo "$('".$selector."').animate({left: ".$left."},900,'swing');";
	}else{
	echo "$('".$selector."').css('left', ".$left.");";	
	}
}

?>

<script type="text/javascript" >
slideShow={
counter: 0,
slideOffset: 0,
slideCount: 0,
slideWidth: -<?php echo round(get_slide_width(0)); ?>,
pause: false,
strong: false
}

function rewindSlider(){
if(slideShow.counter < slideShow.slideCount){
return true;
}else{
rewind();
return 0;
} 
}

function fixStart(){
if((slideShow.counter - 1) >= 0){
return true;
}else{
return false;

} 

}

function pauseSlide(strong){
	if (strong){
		slideShow.strong = true;
		//$('#footer').html("Strong " + strong  + " - " + slideShow.strong); 		
		}	
	slideShow.pause = true;
	}

function resumeSlide(strong){
	if (!slideShow.strong){
		slideShow.pause = false;
		//$('#footer').html("Normal Resume " + strong + " - " + slideShow.strong);
		}
	
	if(strong){
		slideShow.pause = false;
		slideShow.strong = false;
		//$('#footer').html("Remove Strong Resume " + strong + " - " + slideShow.strong); 
		}
	}

function showSlide(counter){
	$('#photo-frame #photo-slide span:eq('+(counter+1)+')').addClass('active');
	var img_offset = $('#photo-frame #photo-slide span:eq('+counter+') img').attr('offset');
//	$('').css('left', Math.max((img_offset), slideShow.slideWidth + 1048));
//	$('#photo-frame #photo-slide').animate({left: Math.max((img_offset), slideShow.slideWidth + 1048)},900,'swing');
	<?php animate('#photo-frame #photo-slide');?>
}


function nextSlide(m){
if (!slideShow.pause||m){
	$('#photo-frame #photo-slide span').removeClass('active');
	showSlide(slideShow.counter);
	slideShow.counter=rewindSlider()*(slideShow.counter+1);

	$('#slide-controls li.label').html("Image "+(slideShow.counter+1)+" of "+(slideShow.slideCount+1));

	}
}	
	
function prevSlide(m){
if (!slideShow.pause||m){
	$('#photo-frame #photo-slide span').removeClass('active');
	showSlide(slideShow.counter-2);
	slideShow.counter=fixStart()*(slideShow.counter-1);

	$('#slide-controls li.label').html("Image "+(slideShow.counter+1)+" of "+(slideShow.slideCount+1));
	}
}

function rewind(){
	$('#photo-frame #photo-slide span').removeClass('active');
//	$('#photo-frame #photo-slide').css('left',0);
	<?php animate('#photo-frame #photo-slide', 0);?>

	slideShow.counter=0;

	$('#slide-controls li.label').html("Image "+(slideShow.counter+1)+" of "+(slideShow.slideCount+1));

}	

function jump_to_end(){
	$('#photo-frame #photo-slide span').removeClass('active');
	showSlide(slideShow.slideCount-1);
	slideShow.counter=slideShow.slideCount;

	$('#slide-controls li.label').html("Image "+(slideShow.counter+1)+" of "+(slideShow.slideCount+1));
}	

function slideInit(){
rewind();
}

function setImageCount(img){
slideShow.slideCount = img.length-1;
}

$(document).ready(function(){
var img = $('#photo-frame #photo-slide img');
var img_width = setImageCount(img);

slideInit();
var timer = setInterval("nextSlide()", 7000)


$("a.contactbox").fancybox({
		'hideOnContentClick' : false,
		'onComplete' : function(){pauseSlide(true);},
		'onClosed': function(){resumeSlide(true);}
		});


$("a.fancy").fancybox({
		'hideOnContentClick' : true,
		'onComplete' : function(){pauseSlide(true);},
		'onClosed': function(){resumeSlide(true);}
		});

$('#next-slide, .slide-button.next').click(function(){
	nextSlide(1);	
	pauseSlide();	
	var slideT = setTimeout("resumeSlide()", 3000)	
	//alert(slideShow.slideOffset+" - " + slideShow.counter)	
	});

$('#first-slide').click(function(){
	rewind();	
	pauseSlide();	
	var slideT = setTimeout("resumeSlide()", 3000)	
	//alert(slideShow.slideOffset+" - " + slideShow.counter)	
	});

$('#last-slide').click(function(){
	jump_to_end();	
	pauseSlide();	
	var slideT = setTimeout("resumeSlide()", 8000)	
	//alert(slideShow.slideOffset+" - " + slideShow.counter)	
	});

$('#prev-slide, .slide-button.prev').click(function(){
	prevSlide(1);
	pauseSlide();	
	var slideT = setTimeout("resumeSlide()", 8000)
	//alert(slideShow.slideOffset+" - " + slideShow.counter)	
	});
		

$('span.post-image').hover( 
	function(){
	pauseSlide();
	},
	
	function(){
	resumeSlide()
	});

});

</script>
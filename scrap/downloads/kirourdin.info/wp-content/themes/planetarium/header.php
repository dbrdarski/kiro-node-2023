<?php 
$browser = get_user_browser();
?>
<html>
<head>
		<title><?php the_title();?></title>
		<?php get_img_title(get_the_title()); ?>
	
	<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" />
	
	<?php wp_head();?>
	<script src="https://apis.google.com/js/plusone.js"></script>		
		<script type="text/javascript">
			$(document).ready(function(){
				//Caption Sliding (Partially Hidden to Visible)
				$('.boxgrid.caption').hover(function(){
					$(".cover", this).stop().animate({top:'140px'},{queue:false,duration:160});
				}, function() {
					$(".cover", this).stop().animate({top:'185px'},{queue:false,duration:160});
				});
				
				$('.boxgrid.photo').hover(function(){
					$(".cover", this).stop().animate({top:'190px'},{queue:false,duration:160});
				}, function() {
					$(".cover", this).stop().animate({top:'220px'},{queue:false,duration:160});
				});
			});
		</script>
		<script type="text/javascript" src="<?php bloginfo('template_url'); ?>/js/jquery.fancybox-1.3.4.pack.js"></script>
		<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/js/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />
		<!--[if IE]><link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/ie.css" type="text/css" media="screen" /><![endif]-->
	</head>
	 <body <?php body_class($class); ?>> 
	 	<div id="wrapper">
		<div id="header">
		<a href="<?php bloginfo('url');?>" >
		<img src="<?php bloginfo('template_url');?>/images/logo.png" alt="Kiro Urdin" id="logo">
		</a>		
		<div class="topnav">
		<ul><li><a href="<?php bloginfo('url');?>/biography">biography</a></li><li><a href="<?php bloginfo('url');?>/artwork">artwork</a></li><li><a href="<?php bloginfo('url');?>/projects">projects</a></li><li><a href="<?php bloginfo('url');?>/literature">literature</a></li><li><a href="<?php bloginfo('url');?>/news">news</a></li><li><a href="<?php bloginfo('url');?>/press">press</a></li><li><a href="mailto:contact@kirourdin.info"> contact</a></li></ul>
		</div>		
		</div>
		<div id="content-area" class="clearfix">		

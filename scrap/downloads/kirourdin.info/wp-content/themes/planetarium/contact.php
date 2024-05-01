<?php /* Template Name: Contact Form */ 
if($_GET['form']) {
?>

<html><head>
<title><?php the_title(); ?></title>
<link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css" />
<link rel="stylesheet" href="<?php bloginfo('template_url'); ?>/js/jquery.fancybox-1.3.4.css" type="text/css" media="screen" />
<?php /* Template Name: Contact Form */
wp_head(); 
?>

</head>
<body>
<?php echo do_shortcode( '[gravityform id=1 name=Contact title=false description=false]' ); ?>
</body></html>

<?php } ?>
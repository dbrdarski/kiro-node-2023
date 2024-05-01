<?php
/*
Template Name: Video Page
*/

if($_GET["vid"]=="")
{?>

<script type="text/javascript">
<!--
window.location = "<?php bloginfo('url');?>/"
//-->
</script>
<?php 
}else{
?>



<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">  
<html xmlns="http://www.w3.org/1999/xhtml" <?php language_attributes() ?>>  
<head profile="http://gmpg.org/xfn/11">  
<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />  
<META NAME="ROBOTS" CONTENT="NOINDEX, NOFOLLOW">
</head>
<body>
<iframe width="560" height="345" src="http://www.youtube.com/embed/<?php echo $_GET["vid"]; ?>?autoplay=1&rel=0" frameborder="0" allowfullscreen></iframe>
</body>
</html>

<?php } ?>
<?php 
register_post_type('paintings', array(	'label' => 'Paintings','description' => '','public' => true,'show_ui' => true,'show_in_menu' => true,'capability_type' => 'post','hierarchical' => false,'rewrite' => array('slug' => ''),'query_var' => true,'supports' => array('title','editor','excerpt','trackbacks','custom-fields','comments','revisions','thumbnail','author','page-attributes',),'taxonomies' => array('category',),'labels' => array (
  'name' => 'Paintings',
  'singular_name' => 'Painting',
  'menu_name' => 'Paintings',
  'add_new' => 'Add Painting',
  'add_new_item' => 'Add New Painting',
  'edit' => 'Edit',
  'edit_item' => 'Edit Painting',
  'new_item' => 'New Painting',
  'view' => 'View Painting',
  'view_item' => 'View Painting',
  'search_items' => 'Search Paintings',
  'not_found' => 'No Paintings Found',
  'not_found_in_trash' => 'No Paintings Found in Trash',
  'parent' => 'Parent Painting',
),) );

/*
register_post_type('literature', array(	'label' => 'Poems','description' => '','public' => true,'show_ui' => true,'show_in_menu' => true,'capability_type' => 'post','hierarchical' => false,'rewrite' => array('slug' => ''),'query_var' => true,'supports' => array('title','editor','excerpt','trackbacks','custom-fields','comments','revisions','thumbnail','author','page-attributes',),'taxonomies' => array('category',),'labels' => array (
  'name' => 'Poems',
  'singular_name' => 'Poem',
  'menu_name' => 'Poems',
  'add_new' => 'Add Poem',
  'add_new_item' => 'Add New Poem',
  'edit' => 'Edit',
  'edit_item' => 'Edit Poem',
  'new_item' => 'New Poem',
  'view' => 'View Poem',
  'view_item' => 'View Poem',
  'search_items' => 'Search Poems',
  'not_found' => 'No Poems Found',
  'not_found_in_trash' => 'No Poems Found in Trash',
  'parent' => 'Parent Category',
),) );
*/

	// Add RSS links to <head> section
	automatic_feed_links();
	
	// Load jQuery
	if ( !is_admin() ) {
	   wp_deregister_script('jquery');
	   wp_register_script('jquery', ("http://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js"), false);
	   wp_enqueue_script('jquery');
	}


    if (function_exists('register_sidebar')) {
    	register_sidebar(array(
    		'name' => 'Sidebar Widgets',
    		'id'   => 'sidebar-widgets',
    		'description'   => 'These are widgets for the sidebar.',
    		'before_widget' => '<div id="%1$s" class="widget %2$s">',
    		'after_widget'  => '</div>',
    		'before_title'  => '<h2>',
    		'after_title'   => '</h2>'
    	));
    }

if ( function_exists( 'add_theme_support' ) ) {
	add_theme_support( 'post-thumbnails' );
   set_post_thumbnail_size(328, 240);
   add_image_size('video', 360, 9999);
}

function trim_video_url($vid_url){
return str_replace("http://www.youtube.com/watch?v=","",$vid_url);
}

function get_att_img($var, $size) {
static $count = 0;
$src = $var[0]; 
$ratio = $size / $var[2];
$width = floor($var[1] * $ratio); 
$height = $size;
$offset = get_slide_width($width);

//if ($count<>0)
//{
echo '<span class="post-image"><a href="'.$src.'" class="fancy"  rel="group1">';
echo '<img src="'.$src.'" height="'.$height.'" width="'.$width.'" class="slide" offset="'.($offset*(-1)).'" title="'.get_img_title().' _ '.$count. '"  alt="'.get_img_title().' _ ' . $count .'">';			  
echo '</a></span>';

 

//}
$count++;
}

function get_att_img_small($var, $size) {
static $count = 0;

$src = $var[0]; 
$x_ratio = $var[1] / $var[2];

//if ($count<>0)
//{
echo '<div class="attachment-image"><a href="'.$src.'" class="fancy"  rel="group1">';
if($x_ratio<1) {
echo '<img src="'.$src.'" width="'.$size.'" title="'.get_img_title().' _ '.$count. '"  alt="'.get_img_title().' _ ' . $count .'">';			  
}else {
echo '<img src="'.$src.'" height="'.$size.'" title="'.get_img_title().' _ '.$count. '"  alt="'.get_img_title().' _ ' . $count .'">';			  
}
echo '</a></div>';         
//}
$count++;
}

function get_slide_width($width) {
static $count = 0;
static $slide_width = 0;
//if ($count<>0)
//{
$slide_width = $slide_width + $width +16;
return $slide_width;
//}
$count++;
}

function get_img_title() {
static $the_title;
$args = func_get_args();
$title = array_shift($args);
if($title<>null){
$the_title = 'Kiro Urdin - '. $title;
}
return $the_title;
}

add_action( 'init', 'my_add_excerpts_to_pages' );
function my_add_excerpts_to_pages() {
add_post_type_support( 'page', 'excerpt' );
}

function get_user_browser()
{
    $u_agent = $_SERVER['HTTP_USER_AGENT'];
    $ub = '';
    if(preg_match('/MSIE/i',$u_agent))
    {
        $ub = "ie";
    }
    elseif(preg_match('/Firefox/i',$u_agent))
    {
        $ub = "firefox";
    }
    elseif(preg_match('/Safari/i',$u_agent))
    {
        $ub = "safari";
    }
    elseif(preg_match('/Chrome/i',$u_agent))
    {
        $ub = "chrome";
    }
    elseif(preg_match('/Flock/i',$u_agent))
    {
        $ub = "flock";
    }
    elseif(preg_match('/Opera/i',$u_agent))
    {
        $ub = "opera";
    }

    return $ub;
}
?>
<?php
/**
 * Template Name Posts: Custom Post Types
 */
?>

<?php 

if(get_post_meta($post->ID,'post_type',true)==null) {
$type = 'no_post';
}else {
$type = get_post_meta($post->ID,'post_type',true);
}

$args=array(
  'post_type' => $type,
  'post_status' => 'publish',
  'paged' => $paged,
  'posts_per_page' => 2,
  'caller_get_posts'=> 1
);
$temp = $wp_query;  // assign orginal query to temp variable for later use   
$wp_query = null;
$wp_query = new WP_Query($args); 
?>

		
		<?php get_header(); ?>
		
		<div id="superhead">				
		<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		
			<a href="<?php the_permalink(); ?>">
			<div class="boxgrid photo">
				<?php the_post_thumbnail(325,260);?>
			
				<div class="cover boxcaption">
					<h3><?php the_title();?></h3>
					<p>Artist<br/><span class="underline"> More Work</span></p>
				</div>		
			</div>
			</a>
			
		<?php endwhile; ?>

		<?php else : ?>

		<h2>Not1 Found</h2>

		<?php endif; ?>
		
		</div>
		<div id="content">
		<!-- 
		pg. 18 Oil on Canvas,
		pg 24. water colour,
		27. OK, 28, 
		100, 101, 111,
		-->

		<div id="copy"> 
		&copy; Kiro Urdin
		</div>
		
		</div>
		</div>
	<?php wp_footer();?>
	</body>
</html>

<script type="text/javascript" >
$(document).ready(function(){
	alert('dane');
});


</script>
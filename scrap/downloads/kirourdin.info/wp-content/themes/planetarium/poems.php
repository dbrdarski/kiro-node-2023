<?php /* Template Name: Poems Page */ ?>

<?php get_header(); ?>		
		
		<div id="content">
		<div id="poems">		
		<?php query_posts(array('post_type'=> 'page', 'post_parent' => $post->ID)); ?>
		<?php if (have_posts()) :?>				
		<?php while ( have_posts() ) : the_post(); ?>				
		
		<a href="<?php the_permalink();?>" class="poem">		
		<div class="clearfix titles">
		<h2 class="title poem"><?php the_title(); ?></h2>
		<h2 class="body poem"><?php echo str_replace(array('[qoute]','[double-1]','[double-2]'),array('’', '”','“'),(htmlentities(str_replace(array('’', '”','“'), array('[qoute]','[double-1]','[double-2]'), get_the_content())))); ?></h2>		
		<h3 class="description"><?php //echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>
		</a>
				
		<?php endwhile; ?>
		
		</div>
		<div style="clear:both"></div>
		</div>
		<?php endif; ?>
		<?php get_footer();?>
<?php /* Template Name: Poem Template */?>

<?php get_header(); ?>

		<div id="square" class="sidebar">
		
		</div>		
		<!-- div id="slide-controls" class="clearfix" onSelectStart="return false;">
		<ul style="float:left">
		<li id="first-slide">First Slide</li>
		<li id="prev-slide">Previous Slide</li>
		<li class="label"></li>		
		</ul>
		
		<ul style="float:right">		
		<li id="next-slide">Next Slide</li>
		<li id="last-slide">Last Slide</li>
		</ul>
		
		</div -->		
		
		
		<div id="content" class="poem">
		
		<?php if (have_posts()) :?>
		<?php $main_query = clone $wp_query; ?>
		
		<?php while ( $main_query->have_posts() ) : $main_query->the_post(); ?>
		<div id="titles" class="clearfix">
		<h2 class="title"><?php the_title(); ?></h2>
		<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>		
		<?php the_content();?>		
		<?php endwhile; ?>

		
		</div>		
		
		<div id="sidebar">
		<?php if (have_posts()) :?>
		<?php query_posts('post_type=page' ); ?>				
		<?php while (have_posts()) : the_post(); ?>
		<p><a href="<?php the_permalink();?>" >
		<?php the_title(); ?></a></p>
		
		<?php endwhile; ?>

		<?php else : ?>

		<h2>Not1 Found</h2>
		
		<?php endif; ?>				
		</div>
		
		
		<?php endif; ?>		
		<?php get_footer();?>
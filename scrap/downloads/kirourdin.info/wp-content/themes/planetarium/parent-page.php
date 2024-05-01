<?php /* Template Name: Parent Page */ ?>

<?php get_header(); ?>
		
		<div id="superhead" class="x4">				
		<?php //query_posts( $query_string . '&cat=3' ) ?>		
		<?php if (have_posts()) : ?>
		<?php $main_query = clone $wp_query; ?>		
		<?php global $post;
		$tmp_post = $post;
		$args = array( 'post_parent' => $post->ID, 'post_type' => 'page' );
		$myposts = get_posts( $args );
		foreach( $myposts as $post ) :	setup_postdata($post); ?>
		
		<a href="<?php the_permalink(); ?>">
			<div class="boxgrid caption">
				<?php the_post_thumbnail(array(328,9999));?>
			
				<div class="cover boxcaption">
					<h3><?php the_title();?></h3>
					<p><?php echo get_post_meta($post->ID, 'description', true); ?><br/><span class="underline">View More</span></p>
				</div>		
			</div>
		</a>
		<?php endforeach; ?>		 
		<?php $post = $tmp_post; ?>
		
		<?php endif; ?>
		<?php $query_string = $tmp_query; ?>
		<?php if(get_post_meta($post->ID, 'poster', true)<>null) {
		?>		
		<img src="<?php bloginfo('template_url');?>/images/<?php echo get_post_meta($post->ID, 'poster', true); ?>" alt="Kiro Urdin - <?php echo get_post_meta($post->ID, 'poster_alt', true); ?>" >
		<?php }	?>
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
		
		
		<div id="content" style="margin-top:16px;">
		
		<?php if (have_posts()) :?>
		
		<?php while ( $main_query->have_posts() ) : $main_query->the_post(); ?>
		<div id="titles" class="clearfix">
		<div id="breadcrumbs">
		<?php if(function_exists('bcn_display')){bcn_display();} ?>
		</div>		
		<h2 class="title">Kiro Urdin &ndash; <?php the_title(); ?></h2>
		<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>

		<?php if(get_post_meta($post->ID, 'one_column', true)) { ?>
		<span class="one-column">
		<?php echo get_post_meta($post->ID, 'one_column', true); ?>		
		</span>
		<?php }else{ ?>
		
		<div id="meta">
		<?php the_excerpt();?>
		<p class="excerpt-author">
		<?php echo get_post_meta($post->ID, 'excerpt_author', true); ?>
		</p>

		<?php if(get_post_meta($post->ID, 'meta', true)){ ?>
		<p class="excerpt-meta">
		<?php echo get_post_meta($post->ID, 'meta', true); ?>
		</p>
		<?php } ?>

		</div>		
		<div id="entry">		
		<?php the_content();?>		
		</div>
		<?php } ?>
		
		<?php endwhile; ?>

		
		
		<?php endif; ?>

		</div>

		<?php get_footer();?>
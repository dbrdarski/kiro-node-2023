<?php get_header(); ?>		
		
		
		<?php if (have_posts()) :?>
		
		<?php while (have_posts() ) : the_post(); ?>
		
		<div class="meta_social">
			<div class="the_date">
				<span class="month"><?php echo get_the_date('M'); ?></span>
				<span class="day"><?php echo get_the_date('d'); ?></span>
			</div>
			<div class="social"><?php echo get_jamie_social_code(); ?></div>
		</div>

		<div class="content">
			<div class="meta">
				<a href="<?php the_permalink(); ?>">
					<div class="boxgrid caption" style="height: 184px;">
						<?php the_post_thumbnail(array(328,9999));?>			
					</div>
				</a>

				<?php if(get_post_meta($post->ID, 'meta', true)){ ?>
				<p class="excerpt-meta" style="color: #777">
				<?php echo get_post_meta($post->ID, 'meta', true); ?>
				</p>
				<?php } ?>
			</div>		
		
			<div class="content-main">

			<a href="<?php the_permalink(); ?>" style="text-decoration: none;">
				<h2 class="title"><?php the_title(); ?></h2>
			</a>
			<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		

			<?php if (get_post_meta($post->ID,'original_source', true )) {	?>
			<span class="original_author"><strong>Source:</strong> <?php echo get_post_meta( $post->ID, 'original_source', true ); ?> - <a href="<?php echo get_post_meta( $post->ID, 'source_url', true ); ?>"><?php echo get_post_meta( $post->ID, 'source_url', true ); ?></a></span>
			<?php } ?>
			<?php the_excerpt();?>
			</div>
		</div>

		<?php endwhile; ?>

		<div style="clear:both;"></div>
		<?php endif; ?>
		<?php get_footer();?>
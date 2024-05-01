<?php get_header(); /* ?>
		
		<div id="superhead" class="x4" style="margin:-8px;">				
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

		</div>
				
		
		</div>
		
		Next inserted to quick normalize the blog category

		*/ ?>		
		
		<div id="content">
		
		<?php if (have_posts()) :?>
		
		<?php while (have_posts() ) : the_post(); ?>
		<div id="titles" class="clearfix">
		<div id="breadcrumbs">
		<?php if(function_exists('bcn_display')){bcn_display();} ?>
		</div>		
		<h2 class="title"><?php the_title(); ?></h2>
		<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>		
		<div id="meta">
		<a href="<?php the_permalink(); ?>">
			<div class="boxgrid caption" style="margin-bottom: 10px;">
				<?php the_post_thumbnail(array(328,9999));?>			
			</div>
		</a>
		<?php the_excerpt();?>
		<p class="excerpt-author" style="color: #777">
		<?php echo get_post_meta($post->ID, 'excerpt_author', true); ?>
		</p>

		<?php if(get_post_meta($post->ID, 'meta', true)){ ?>
		<p class="excerpt-meta" style="color: #777">
		<?php echo get_post_meta($post->ID, 'meta', true); ?>
		</p>
		<?php } ?>

		</div>		
		<div id="entry">
		<?php echo get_jamie_social_code(); ?>
		<?php if (get_post_meta($post->ID,'original_source', true )) {	?>
		<span class="original_author"><strong>Source:</strong> <?php echo get_post_meta( $post->ID, 'original_source', true ); ?> - <a href="<?php echo get_post_meta( $post->ID, 'source_url', true ); ?>"><?php echo get_post_meta( $post->ID, 'original_source', true ); ?></a></span>
		<?php } ?>
		<?php the_content();?>		
		<?php if (get_post_meta($post->ID,'original_article', true )) {	?>
			<span class="original_article"><strong>Original Article:</strong> <a href="<?php echo get_post_meta( $post->ID, 'article_url', true ); ?>"><?php echo get_post_meta( $post->ID, 'original_article', true ); ?></a> by <a href="<?php echo get_post_meta( $post->ID, 'source_url', true ); ?>"><?php echo get_post_meta( $post->ID, 'original_source', true ); ?></a></span>
			<?php } ?>
			</div>
		<?php endwhile; ?>

		<div style="clear:both;"></div>
		</div>
		<?php endif; ?>
		<?php get_footer();?>
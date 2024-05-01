<?php
//Template Name: Planetarism Animation
?>
<?php get_header(); ?>
		
		<div id="animation-frame" class="clearfix">		
		<?php include('animation.php')?>
		</div><!-- animation frame -->
				
		
		<!-- div id="slide-controls" class="clearfix">
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
		
		<div id="superhead" class="clearfix">				
		
		<a href="<?php bloginfo('url');?>/artwork">
			<div class="boxgrid caption">
				<img src="<?php bloginfo('template_url');?>/images/artwork.jpg" alt="" >				
				
				
				<div class="cover boxcaption">
					<h3>Artwork</h3>
					<p>Paintings, Watercolors, Drawings, Sculptures<br/><span class="underline">View More</span></p>
				</div>		
			</div>
		</a>
				
		<a href="<?php bloginfo('url');?>/projects">
			<div class="boxgrid caption">
				<img src="<?php bloginfo('template_url');?>/images/projects.jpg" alt="" >				
				
				
				<div class="cover boxcaption">
					<h3>Projects</h3>
					<p>Projects by Kiro Urdin<br/><span class="underline">View More</span></p>
				</div>		
			</div>
		</a>
				
		<a href="<?php bloginfo('url');?>/literature">
			<div class="boxgrid caption last-child">
				<img src="<?php bloginfo('template_url');?>/images/literature.jpg" alt="" >				
				
				
				<div class="cover boxcaption">
					<h3>Literature</h3>
					<p>Books, Poems, Aphorisms<br/><span class="underline">View More</span></p>
				</div>		
			</div>
		</a>
		</div>
		
		
		<div id="content" class="clearfix">
		
		<?php if (have_posts()) :?>
		
		<?php while (have_posts() ) : the_post(); ?>
		<div id="titles" class="clearfix">
		<h2 class="title"><?php the_title(); ?></h2>
		<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>		
		<div id="meta" class="about-us">
		<div class="square_img">
		<?php the_post_thumbnail(array(400, 9999));?>
		</div>		
		<?php //the_excerpt();?>
		<p class="excerpt-author">
		<?php echo get_post_meta($post->ID, 'excerpt_author', true); ?>
		</p>

		<?php if(get_post_meta($post->ID, 'meta', true)){ ?>
		<p class="excerpt-meta" style="text-align:center;">
		<?php echo get_post_meta($post->ID, 'meta', true); ?>
		</p>
		<?php } ?>
			
		<div id="attachments-small" class="clearfix">
		<?php 		
	$args = array(
   'post_type' => 'attachment',
   'numberposts' => -1,
   'post_status' => null,
   'post_parent' => $post->ID,
   'order' => 'ASC',
	'class'	=> "attachment-$size",
   'orderby'    => 'menu_order ID'	
  );

  $attachments = get_posts( $args );
     if ( $attachments ) {
        foreach ( $attachments as $attachment ) {
      	  	  get_att_img_small(wp_get_attachment_image_src($attachment->ID, 'full'),97);			  
			  }
     }
   ?>

		</div>
		

		</div>		
		<div id="entry">		
		<?php the_content();?>		
		</div>
		<?php endwhile; ?>

		<div style="clear:both"></div>
		</div>
		<?php endif; ?>
		<?php get_footer();?>
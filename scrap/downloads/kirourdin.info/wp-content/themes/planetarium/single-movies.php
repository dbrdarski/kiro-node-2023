<?php get_header(); ?>
		
		<div id="superhead">				
		<div id="photo-frame" class="" onSelectStart="return false;">
		<div id="photo-slide" class="clearfix" onSelectStart="return false;">		

		<?php if (have_posts()) :?>
		<?php $main_query = clone $wp_query; ?>
		<?php query_posts( $query_string . '&cat=3' ) ?>				
		<?php while (have_posts()) : the_post(); ?>
		
		
		<?php 
		$args = array(
   'post_type' => 'attachment',
   'numberposts' => -1,
   'post_status' => null,
   'post_parent' => $post->ID,
   'order' => 'ASC',
	'class'	=> "attachment-$size" 
  );

  $attachments = get_posts( $args );
     if ( $attachments ) {
        foreach ( $attachments as $attachment ) {
           get_att_img(wp_get_attachment_image_src($attachment->ID, 'full'),240);
			  }
     }

		?>
		<?php endwhile; ?>

		<?php else : ?>

		<h2>Not Found</h2>
		
		<?php endif; ?>
		
		</div><!-- photo slide -->
		<div class="slide-button prev"></div>		
		<div class="slide-button next"></div>		
		</div><!-- photo frame -->
				
		
		</div>

		
		<div id="slide-controls" class="clearfix" onSelectStart="return false;">
		<ul style="float:left">
		<li id="first-slide">First Slide</li>
		<li id="prev-slide">Previous Slide</li>
		<li class="label"></li>		
		</ul>
		
		<ul style="float:right">		
		<li id="next-slide">Next Slide</li>
		<li id="last-slide">Last Slide</li>
		</ul>
		
		</div>		
		
		
		<div id="content">
		
		<?php if (have_posts()) :?>
		
		<?php while ( $main_query->have_posts() ) : $main_query->the_post(); ?>
		<div id="titles" class="clearfix">
		<div id="breadcrumbs">
		<?php 
		if(function_exists('bcn_display'))
		{
    	//bcn_display();
		}
		?>
				
		<?php 
		$args = array(
    	'prefix' => '',
    	'suffix' => '',
 	   'title' => '', //__( 'You are here: ', 'breadcrumbs-plus' ),
 	  	'home' => '', //__( 'Home', 'breadcrumbs-plus' ),
  	   'sep' => '>',
  	   'front_page' => false,
  	   'bold' => false,
  	   'show_blog' => false,
  	   'echo' => true,
  	   'singular_post_taxonomy' => 'category',
	 	);		
		breadcrumbs_plus( $args ); 
		?> 
		</div>		
		<h2 class="title"><?php the_title(); ?></h2>
		<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>		
		<div id="meta">
		<div id="video-thumb">		
		<a href="<?php bloginfo('url');?>/video?vid=<?php echo trim_video_url(get_post_meta($post->ID, 'video', true));?>" class="fancy">
		<?php the_post_thumbnail('video');?>
		<div id="play-button"></div>
		</a>	
		</div>	
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
		<?php endwhile; ?>

		
		</div>
		<?php endif; ?>
		<?php get_footer();?>
<?php /* Template Name: Aphorisms */ ?>
<?php get_header(); ?>
		
		<div id="superhead">				
		<div id="animation-frame" class="aphorisms" onSelectStart="return false;">
		<div id="photo-slide" class="clearfix" onSelectStart="return false;">		

		<?php if (have_posts()) :?>
		<?php $main_query = clone $wp_query; ?>
		<?php //query_posts( $query_string . '&cat=3' ) ?>				
		<?php while (have_posts()) : the_post(); ?>
		
		<div id="attachments-sm">
		<?php 
		$args = array(
   'post_type' => 'attachment',
   'numberposts' => -1,
   'offset'=> -1,
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
		</div>		
		<?php endwhile; ?>

		<?php else : ?>

		<h2>Not Found</h2>
		
		<?php endif; ?>
		
		</div><!-- photo slide -->
		<div id="aphorisms" >
		<p class="aphorism">Success on success – blindness.</p>
		<p class="aphorism mid">The circle you belong to is the coop you’ll end up in.</p>
		<p class="aphorism big">Understand the solitude of those who live within you and you’ll be a human being.</p>
		<p class="aphorism" slide="2">I can’t be touched – least of all by those who can’t hurt me.</p>
		<p class="aphorism">There’s nowhere we can reach as long as we all want to be in the same place.</p>
		<p class="aphorism mid">Feel good in your own skin, under it the years decide.</p>
		<p class="aphorism">Don’t be forever shooting at me, some of your bullets are blanks.</p>
		<p class="aphorism">Everyone dreams their own life’s dream, reality is life beyond the grave.</p>
		<p class="aphorism">Tread somewhere else, the truth lies beneath your feet.</p>
		<p class="aphorism" slide="4">Step by step, foot by foot.</p>
		<p class="aphorism">Depending on myself, I depend on others.</p>
		<p class="aphorism">Men went to Mars. The Martians said, ‘What robots!’</p>
		<p class="aphorism">Men live penned in prison, animals at liberty in zoos.</p>
		<p class="aphorism">History repeats itself, its authors the victors.</p>
		<p class="aphorism">Work like a slave, think like a thinker – even if you’re a slave.</p>
		<p class="aphorism">Nothing at once, everything in the meantime.</p>
		<p class="aphorism" slide="3">Change your tense. Use the future if things don’t go right in the present.</p>
		<p class="aphorism big">You’re the same as your neighbour, but the converse could also be said.</p>
		<p class="aphorism">Humanise the success that means everything in life.</p>
		<p class="aphorism">To read that you know better than I do, I’d have to be literate.</p>
		<p class="aphorism mid">Advert: Wanted – a parasite that gives blood willingly.</p>
		<p class="aphorism">We’ll be equal before the law when the judges are too.</p>
		<p class="aphorism"slide="5">One page of love, several novels of life.</p>
		<p class="aphorism">We’ll become what we are.</p>
		<p class="aphorism">No one is last as long as love at first sight exists.</p>
		<p class="aphorism">As long as you’re pacific, you’re the greatest ocean.</p>
		<p class="aphorism">Of nine chances, we’re the tenth.</p>
		<p class="aphorism">Ruler, is the middle class content? The upper class will never be.</p>
		<p class="aphorism" slide="8">Man’s ecological error – overpopulation.</p>
		<p class="aphorism">Three kinds of slave: the slave to power, the wage slave and the credit slave.</p>
		<p class="aphorism mid left">Distance yourself from yourself, you’re close to evil.</p>
		<p class="aphorism">Sure of yourself, sovereign everywhere.</p>
		<p class="aphorism">I stand the way my affairs stand.</p>
		<p class="aphorism">The world’s become tragicomic, nobody laughs outright without a tragedy.</p>
		<p class="aphorism">You’re my first love; at the start I was the last to be first.</p>
		<p class="aphorism" slide="7">After the first comes the average.</p>
		<p class="aphorism big">As long as there was capitalism and communism there was the cold war; now the world’s in flames.</p>
		<p class="aphorism">Better days are coming, so man will be even worse.</p>
		<p class="aphorism big" slide="5">The nation and nationalities will be richer, everyone working on his own account.</p>
		<p class="aphorism">The tax we pay from birth is life, the interest our years.</p>
		<p class="aphorism">I’ve learned nothing from myself, all my life I’ve learned from life.</p>
		<p class="aphorism">Talk openly but in an open space – words eco.</p>
		<p class="aphorism big"  slide="6">The difference between profit and profiteers: profit is divided, profiteers multiply.</p>
		<p class="aphorism">Punishment is most often revenge, but when punishment errs it dreams of pardon.</p>
		<p class="aphorism big">I’ve a feeling I’ve seen you somewhere! Yes, don’t you have a feeling you need me for something?</p>
		<p class="aphorism ok">I stand the way my affairs stand.</p>
		<p class="aphorism ok">Everything depends on the election, who will pay for it?</p>
		<p class="aphorism big">The younger generation likes autumn, it sees the older as a deciduous forest.</p>
		<p class="aphorism mid">Don’t miss the moment if your future’s in it.</p>
		<p class="aphorism ok">Of all consequences, the first is the longest.</p>
		<p class="aphorism big">The actress understood too late, to be a fashionable success she should be naked.</p>
		<p class="aphorism ok" slide="10">Spring’s arrived, the flowers are in bloom, but no one’s taken a sniff at me.</p>
		<p class="aphorism ok">Of all womankind, the motherland weeps most honestly.</p>
		<p class="aphorism ok ok">Brief announcement: full stop.</p>
		<p class="aphorism ok">I say the same thing all the time, in this I differ from others.</p>
		<p class="aphorism ok">Be in touch with your soul, the body’s fickle.</p>
		<p class="aphorism ok"  slide="9">Judging from my instinct, they’re right to call me an animal.</p>
		<p class="aphorism ok mid">I’m always the first to do wrong, that’s why I’m so experienced.</p>
		<p class="aphorism question">Either be it, or stop going on about what you want to be.</p>
		<p class="aphorism big full">Why shouldn’t I gossip about my friends? My enemies know in advance what I’ll say about them. He who is born with everything he needs has no need of himself.</p>
		<p class="aphorism">Whoever wants to rule should be a realist, the female sphere is not amenable to that.</p>
		<p class="aphorism ok">I’ve no need of a visa, my friendship has no frontiers.</p>
		<p class="aphorism ok">Think freely about freedom of thought.</p>
		<p class="aphorism mid">The glass in your hand is fragile, the water in it heavy.</p>
		<p class="aphorism big">Why so many smiling politicians when they persuade us we’re living in difficult times?</p>
		<p class="aphorism big">I was sacked, I’d no electricity, my child had neither bread nor milk. The first snow fell! I went out for a walk boiling inside.</p>
		<p class="aphorism big">The wise man counsels the foolish as long as he doesn’t trust him – then he laughs at him.</p>
		<p class="aphorism mid">As long as your chances are sinking, you swim well.</p>
		<p class="aphorism q">Between the frontier and the marriage bed there’s a foreigner.</p>
		<p class="aphorism big"  slide="1">According to the statistics, crime has decreased – but just wait till the next election.</p>
		<p class="aphorism big">Wise plus wise, wiser; foolish plus foolish, more foolish.</p>
		<p class="aphorism"  slide="2">In childhood death is an illusion, in middle age a reality, and in old age an everyday occurrence.</p>
		<p class="aphorism">The easiest woman is the inquisitive one, she’ll give herself to convince herself.</p>
		<p class="aphorism">In life we either weep or laugh – the rest is the daily round.</p>
		<p class="aphorism">When everything’s in motion, it’s hard to escape being trodden on.</p>
		<p class="aphorism">The bad novel became a drama, all the characters started to ham it up.</p>
		<p class="aphorism ok q">Be civilised, abstain.</p>
		<p class="aphorism ok">Where there’s punishment there’s fear, where there’s fear there’s deceit.</p>
		<p class="aphorism ok mid"  slide="5">After the good times comes reality.</p>
		<p class="aphorism ok mid">When a rich man swims in a sea of cash, he thinks it’s an ocean.</p>
		<p class="aphorism big">The difference between the unfaithful man and the unfaithful woman - she has the greater choice.</p>
		<p class="aphorism ok">If you’ve decided to go all the way, distance yourself.</p>
		<p class="aphorism long">Enough! - so that it doesn’t get boring.</p>
		<p class="aphorism ok q">When it’s certain the force that’s heading for you will win, face another way.</p>
		<p class="aphorism mid">To live healthily, you should eat well - to live longer, eat less.</p>
		<p class="aphorism ok">Judge the sublime, the rest is error-free.</p>
		<p class="aphorism big" slide="3">Be in the middle; don’t underestimate the one below you, or overestimate the one above you.</p>
		<p class="aphorism long mid">If somebody serves you as a model, don’t undress in front of them.</p>
		<p class="aphorism big">Fill the mouth that constantly criticizes you, and the same mouth will shower you with praise.</p>
		<p class="aphorism mid sm">Swim in the sea of love; later you’ll start to drown in it.</p>
		<p class="aphorism big">What would Tutankhamen’s attitude to silence be, when nowadays every ‘pharaoh’ has his own spokesman?</p>
		<p class="aphorism mid">How to prevent the inevitable, when it’s a part of what’s to follow?</p>
		<p class="aphorism short">Line up in order, I want to set you right.</p>
		<p class="aphorism long" slide="4">I’m in form, my wallet’s shaking. </p>
		<p class="aphorism ok">I am the avantgarde, I trample all before me.</p>
		<p class="aphorism ok">The price goes up when we are paying, and falls when others do so for us.</p>
		<p class="aphorism big">Who’s more in the right: he who usurps another’s right, or he who wants to keep the right for himself?</p>
		<p class="aphorism ok">Don’t limit the movement of those who follow you.</p>
		<p class="aphorism mid">Write down what you said, but use fewer words.</p>
		<p class="aphorism big">Seize the moment when you’re in fashion, for fashion’s moment doesn’t last long.</p>
		<p class="aphorism ok">Don’t irritate the mouth whose tongue expresses itself crudely.</p>
		<p class="aphorism big" slide="6">Have we ever asked ourselves what happens behind the man who always wants to be in the foreground?</p>
		<p class="aphorism ok">What do cows think of silicone breasts?</p>
		<p class="aphorism big top">Finally the tastes of artists and consumers have coincided - paint and consume a Big Mac, Coca Cola or spaghetti.</p>
		<p class="aphorism ok">I’m in a fix: should I take the queen, or checkmate the king?</p>
		<p class="aphorism ok">Why shouldn’t I sell myself, if someone’s prepared to pay more than I’m worth?</p>
		<p class="aphorism long mid">There’s a philosopher with universal wisdom - he’s called Old Age.</p>
		<p class="aphorism big ok">No one is as young as his years, or as old as the years life has given him.</p>
		<p class="aphorism big ">What is the evolution of the line of least resistance when the whistle blows for an outsider, and when it blows for the favourite?</p>
		<p class="aphorism mid">We say that there’s nothing in space - that means there’s no space.</p>
		<p class="aphorism big ok">A king’s crowning success is his queen, the queen’s when both crowns are united on her head.</p>
		<p class="aphorism ok">Today a person no longer knows whether the world has become civilised or militarised.</p>
		<p class="aphorism long">The end of all illusions - I’ve hit reality by mistake.</p>
		<p class="aphorism big">What should one’s attitude be when someone has done something for someone else and the benefit is mutual?</p>
		<p class="aphorism mid">What would a novel look like with the first and the last pages blank?</p>
		<p class="aphorism mid">Is there an ordinal number for the consequences of a wrong decision?</p>
		<p class="aphorism vcenter">I’ve reached the peak of the pyramid, what’s the next point?</p>
		<p class="aphorism big ok">When you’re on the list of undesirables, the only consolation is that if they scored you out they might mark your name with a cross.</p>
		<p class="aphorism left">It’s a full moon tonight, should I think of sex or my wages?</p>
		<p class="aphorism ok">Producers of the world, distribute yourselves!</p>
		<p class="aphorism long">Decide what your future route will be - the path you follow every day, or the road you should set out on?</p>
		<p class="aphorism mid" slide="7">Write down what you said, but use fewer words.</p>
		<p class="aphorism ok">After Mt. Everest the next peak is Mars.</p>
		<p class="aphorism ok mid q">Does anyone know where the epicentre of a shaky marriage bed lies?</p>
		<p class="aphorism mid">Money is a trial - spending deliveres the verdict.</p>
		<p class="aphorism ok">Everything happens quickly - except in sex.</p>
		<p class="aphorism ok q long left">A kind od depresion - uncertainty.</p>
		</div><!-- aphorisms -->		
		</div><!-- photo frame -->
				
		
		</div>		
		
		<div id="content">
		
		<?php if (have_posts()) :?>
		
		<?php while ( $main_query->have_posts() ) : $main_query->the_post(); ?>
		<div id="titles" class="clearfix">
		<div id="breadcrumbs">
		<?php if(function_exists('bcn_display')){bcn_display();} ?>
		</div>		
		<h2 class="title">Kiro Urdin &ndash; <?php the_title(); ?></h2>
		<h3 class="description"><?php echo get_post_meta($post->ID, 'description', true); ?></h3>		
		</div>		
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
		<?php the_content(); ?>	
		</div>
		<?php endwhile; ?>

		<div style="clear:both"></div>
		</div>
		<?php endif; ?>
		<?php get_footer();?>
		
		
<script type="text/javascript" >

var select = '#animation-frame p.aphorism';
var slides = $(select).length;
var count = slides;

function play_slide(){
//var select = '#video .slide';


var s = $(select+':eq('+(count%slides+1) +')').attr('slide');
if(s!=null){
	$('#animation-frame .post-image:eq('+s+')').fadeIn(2000); 
	$('#animation-frame .post-image:not(:eq('+s+'))').delay(2000).fadeOut(50); 	
	}

$(select).fadeOut(30);	
$(select+':eq('+(count%slides+1) +')').fadeIn(1200);


/*
$(select+':eq('+(count%slides+1) +')').fadeIn(1200).attr('slide', function(i, val) {
	this
  
});
*/

count++;
//alert(select+':eq('+(count%slides+1) +')');
}
	
function slide_init(){
setInterval("play_slide()", 8000);
}



$(document).ready(function() {
//$("a#small").fancybox({
//		'hideOnContentClick' : true
//		});
//$("a#product-video").fancybox();
//$("div.add-to-cart.button a").fancybox();
//$('#breadcrumbs a[href=""]').attr('href','http://swimmingarmbands.com');
slide_init();
//alert(count);

});
</script>
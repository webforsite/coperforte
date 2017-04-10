jQuery(document).ready(function() {
	// PHP vars
	// home_url
	// template_directory_uri
	// retina_logo_url
	// menu_style
	// is_front_page
	
	// Testimonials carousel speed control
	jQuery('#testimonialsCarousel').carousel({
		interval: 4000
	});
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		var animated = jQuery('.wpb_appear');
		jQuery('html').find(animated).each(function () { 
			jQuery(this).removeClass('wpb_animate_when_almost_visible').removeClass('wpb_appear').removeClass('wpb_start_animation').removeClass('wpb_left-to-right').removeClass('wpb_right-to-left');
		});
	}
	
	// retina logo or regular?
	if (window.devicePixelRatio > 1 && typeof retina_logo_url != "undefined" ) {
		jQuery(".logo").attr("src", retina_logo_url);
	}
	
	// floating menu or static?
	if( menu_style == 1 && is_front_page==='true' ) {
		jQuery(window).bind('scroll', function() {
				if (jQuery(window).scrollTop() > jQuery(window).height()) {
					jQuery('.bkaTopmenu').slideDown(200);
					jQuery(".bkaTopmenu").removeClass('hidden').addClass('displayed');
				}
				if (jQuery(window).scrollTop() < jQuery(window).height()) {
					jQuery('.bkaTopmenu').slideUp(200, function() {
						jQuery(".bkaTopmenu").removeClass('displayed').addClass('hidden');
					});
				}
			});
	}
	
	// Onepage navigation, front page or blog section
	if(is_front_page==='true') {
		jQuery('#mainNavUl a[href*=#]').click(function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'')
			&& location.hostname == this.hostname) {
			  var $target = jQuery(this.hash);
			  $target = $target.length && $target
			  || jQuery('[name=' + this.hash.slice(1) +']');
			  
			  if ($target.length) {
				var targetOffset = $target.offset().top - 58;
				jQuery('html,body')
				.animate({scrollTop: targetOffset}, 1000);
			   return false;
			  }
			  
			}
		  });
	} else {
		jQuery("#mainNavUl li a, .blog_widget .page_item_has_children .children li.page_item a").live("click",function(){
			var currentItem = jQuery(this).attr('href');

			if(currentItem.charAt(0) === '#') {
			var target =  home_url + currentItem;
			}
			else {
			var target =  currentItem;
			}
			window.location = target;
			return false;
		});
	}
	
	var windowWidth = jQuery(window).width(); //retrieve current window width
	var windowHeight = jQuery(window).height(); //retrieve current window height
	
	jQuery('.hgrHeaderImage img').width(windowWidth).height(windowHeight);
	jQuery('.blogPosts').css("min-height",windowHeight);
	
	jQuery("#pagesContent").css("margin-top", windowHeight);
		
	jQuery(window).resize(function() {
		windowWidth = jQuery(window).width(); //retrieve current window width
		windowHeight = jQuery(window).height(); //retrieve current window height
		jQuery('.hgrHeaderImage img').width(windowWidth).height(windowHeight);
		jQuery('.blogPosts').css("min-height",windowHeight);
	});
	
	jQuery(".iconeffect").mouseenter(function(){
		jQuery(this).find(".icon").addClass("hoveredIcon");
	}).mouseleave(function(){
		jQuery(this).find(".icon").removeClass("hoveredIcon");
	})
	
	
	
	jQuery(".readTheBlogBtn").click(function() {
		jQuery('html, body').animate({
			scrollTop: jQuery("#blogPosts").offset().top
		}, 1000);
	});

	
	// Back to top button
		jQuery(window).bind("scroll", function() {
			if (jQuery(window).scrollTop() > jQuery(window).height()) { 
				jQuery('.back-to-top').fadeIn(500);
			}
			if (jQuery(window).scrollTop() < jQuery(window).height()) {
				jQuery('.back-to-top').fadeOut(500);
			}
		});
		jQuery('.back-to-top').click(function(event) {
			event.preventDefault();
			jQuery('html, body').animate({scrollTop: 0}, 1000);
			return false;
    	});
	
	// Portfolio Isotope
	var container = jQuery('#da-thumbs');
	container.isotope({
		animationEngine : 'jquery',
		filter:"*",
	  	animationOptions: {
	     	duration: 500,
	     	queue: false
	   	},
		layoutMode: 'fitRows'
	});	
	jQuery('#filters a').click(function(){
		jQuery('#filters li').removeClass('active');
		jQuery(this).parent().addClass('active');
		var selector = jQuery(this).attr('data-filter');
	  	container.isotope({ filter: selector });
        setProjects();		
	  	return false;
	});
	function splitColumns() {
		var winWidth = jQuery(window).width(), 
			columnNumb = 1;			
		if (winWidth > 1024) {
			columnNumb = 4;
		} else if (winWidth > 900) {
			columnNumb = 3;
		} else if (winWidth > 479) {
			columnNumb = 2;
		} else if (winWidth < 479) {
			columnNumb = 1;
		}
		return columnNumb;
	}
	function setColumns() { 
	var container = jQuery('#da-thumbs');
		var winWidth = jQuery(window).width(), 
			columnNumb = splitColumns(), 
			postWidth = Math.floor(winWidth / columnNumb);
		
		container.find('.portfolio-item').each(function () { 
			jQuery(this).css( { 
				width : postWidth + 'px' 
			});
		});
	}
	function setProjects() { 
		setColumns();
		container.isotope('layout');
	}
	container.imagesLoaded(function () { 
		setProjects();	
	});
	jQuery(window).bind('resize', function () { 
		setProjects();			
	});
	setProjects();	
		
		jQuery('#da-thumbs > li').each( function() { jQuery(this).hoverdir(); } );
		
		// open portfolio item
		jQuery(".portfolio-item a").live("click",function(){
			jQuery('.back-to-top').fadeOut(500);
			var postID = jQuery(this).attr('data-id');
			jQuery("body").css("overflow", "hidden");
			jQuery('.bkaTopmenu').slideUp(200, function() {
					jQuery(".bkaTopmenu").removeClass('displayed').addClass('hidden');
				});
			jQuery("#item-container").removeClass("hidden").removeClass("slideOutLeft").addClass("fadeIn");
			jQuery("#item-container").height(windowHeight);
			jQuery("#item-container").html('<div class="loading"><img src="'+template_directory_uri+'/highgrade/images/preloader.svg" class="preloader"></div>');
			
			jQuery("#item-container").load( home_url+"?p="+postID, function() {
				//console.log(home_url+"?p="+postID);	
			});
			return false;
		});
		
		// closes opened portfolio item
		jQuery("#itemcontainer-controller").live("click",function(){
			jQuery('.back-to-top').fadeIn(500);
			jQuery("body").css("overflow", "scroll");
			jQuery("#item-container").removeClass("fadeIn").addClass("slideOutLeft");
			jQuery("#item-container").html('');
			jQuery('.bkaTopmenu').slideDown(200);
			jQuery(".bkaTopmenu").removeClass('hidden').addClass('displayed');
			jQuery("#item-container").removeClass("slideOutLeft").addClass("hidden");
		});
	
	jQuery(window).resize(function() {
		jQuery('.parallax').each(function(){
			jQuery(this).css('background-position','center');
		});
	});
	
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		hgr_forMobile();
	}
	
	function hgr_forMobile(){
		jQuery('.parallax').each(function(){
					jQuery(this).css({"background-attachment":"scroll"});
				});
	}
});
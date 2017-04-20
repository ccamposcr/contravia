////ATTENTION!/////
//componets.js is a generated file. To edit the source go to /js/components/index.js

(function($){
    'use strict';

    var APP = window.APP = window.APP || {};
    var UTIL = window.UTIL = window.UTIL || {};
    var SERVICE = window.SERVICE = window.SERVICE || {};

    var APP = window.APP || {};
    var $window = $(window);
	var $document = $(document);
	var $body = $('body');

	APP.navigation = (function(){
	  var _init = function(context){
	      $('.navigation', context)
	      .each(function(i, section){
	          new Nav($(section));
	      });
	  };
	
	  return {
	      init: _init
	  };
	})();
	
	function Nav($el){
		this.$el = $el;
		this.$mainNav = $el.find('.main_nav');
		this.menuItems = [];
		this.moveToTopOnScroll();
		this.updateMenuItems();
		this.detectBreadcrumbsOnScroll();
		return this;
	}
	
	Nav.prototype.updateMenuItems = function(){
		var THIS = this;
	
		THIS.$mainNav.find('a').each(function(){
			THIS.menuItems.push( $(this).attr('href') );
		});
	
		return THIS;
	};
	
	Nav.prototype.detectBreadcrumbsOnScroll = function(){
		var THIS = this;
	
		$document.on('scroll', function() {
	
			var scrollTop = $(this).scrollTop(),
				top = 0,
				sectionHeight = 0,
				flagOnScrollBack = 500;
	
			for( var i = 0; i < THIS.menuItems.length; i++){
				top = $(THIS.menuItems[i]).position().top,
				sectionHeight = $(THIS.menuItems[i]).height();
	
				if( scrollTop >= top && scrollTop < (top + sectionHeight + flagOnScrollBack) ){
					THIS.$mainNav.find('a').removeClass('active');
					$('[href="' + THIS.menuItems[i] + '"]').addClass('active');
				}
			}
		});
	
		return THIS;
	}
	
	Nav.prototype.moveToTopOnScroll = function(){
		var THIS = this,
			scrollTop,
			scrollLimit = 60;
	
		$window.scroll(function(){
			scrollTop = $body.scrollTop();
			
			if( scrollTop >  scrollLimit){
				THIS.$el.addClass('top');
			}else{
				THIS.$el.removeClass('top');
			}
		});
	
		return THIS;
	};
	
	APP.navigation.init($body);
	APP.hero = (function(){
	  var _init = function(context){
	      $('.hero', context)
	      .each(function(i, section){
	          new Hero($(section));
	      });
	  };
	
	  return {
	      init: _init
	  };
	})();
	
	function Hero($el){
		this.$el = $el;
	  this.$video = this.$el.find('video');
	  this.$videoWrapper = this.$el.find('.element-with-video-bg');
		this.setSlowMotion();
	  this.bindResizeEvents();
		return this;
	}
	
	Hero.prototype.bindResizeEvents = function(){
	  var THIS = this;
	
	  var windowHeight = 0;
	
	  UTIL.media.on('xs_only', function() {
	    windowHeight = $window.height();
	    THIS.$videoWrapper.height(windowHeight);
	  });
	
	  UTIL.media.on('sm_only', function() {
	    windowHeight = $window.height();
	    THIS.$videoWrapper.height(windowHeight);
	  });
	
	  UTIL.media.on('md', function() {
	    windowHeight = $window.height();
	    THIS.$videoWrapper.height(windowHeight);
	  });
	
	
	  return THIS;
	}; 
	
	Hero.prototype.setSlowMotion = function(){
		var THIS = this;
	
	  var video = THIS.$video[0];
	    video.defaultPlaybackRate = 0.5;
	    video.playbackRate = 0.5;
	
		return THIS;
	};
	
	APP.hero.init($body);
    var iframeElement   = document.querySelector('iframe');
    var widget1         = SC.Widget(iframeElement);

})(jQuery);
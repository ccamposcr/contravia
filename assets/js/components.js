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
		this.moveToTopOnScroll();
		return this;
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
	      $('video', context)
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
	  this.$videoContainer = $el.parents('.video');
		this.setSlowMotion();
	  this.bindResizeEvents();
		return this;
	}
	
	Hero.bindResizeEvents = function(){
	  var THIS = this;
	  if( THIS.$videoContainer.hasClass('autoHeight') ){
	    var documentHeight = 0;
	
	    UTIL.media.on('xs_only', function() {
	      documentHeight = $document.height();
	      THIS.$videoContainer.height(documentHeight);
	    });
	
	    UTIL.media.on('sm_only', function() {
	      documentHeight = $document.height();
	      THIS.$videoContainer.height(documentHeight);
	    });
	
	    UTIL.media.on('md', function() {
	      documentHeight = $document.height();
	      THIS.$videoContainer.height(documentHeight);
	    });
	  }
	
	
	  return THIS;
	}; 
	
	Hero.prototype.setSlowMotion = function(){
		var THIS = this;
	
		var video = THIS.$el[0];
		video.defaultPlaybackRate = 0.5;
		video.playbackRate = 0.5;
	
		return THIS;
	};
	
	APP.hero.init($body);

})(jQuery);
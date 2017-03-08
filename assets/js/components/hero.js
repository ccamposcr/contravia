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
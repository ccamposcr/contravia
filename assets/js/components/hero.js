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
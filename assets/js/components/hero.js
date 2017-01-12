APP.hero = (function(){
  var _init = function(context){
      $('video', context)
      .each(function(i, section){
          new Video($(section));
      });
  };

  return {
      init: _init
  };
})();

function Video($el){
	this.$el = $el;
	this.setSlowMotion();
	return this;
}

Video.prototype.setSlowMotion = function(){
	var THIS = this;

	var video = THIS.$el[0];
	video.defaultPlaybackRate = 0.5;
	video.playbackRate = 0.5;

	return THIS;
};

APP.hero.init($body);
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
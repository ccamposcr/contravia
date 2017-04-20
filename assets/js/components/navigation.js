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
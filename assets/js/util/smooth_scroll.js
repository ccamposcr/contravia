UTIL.smoothScroll = (function(){

    $('body').on('click', '.scroll-to', function(e) {
        e.preventDefault();
        var scrollToURL = $(this).attr('href');
        UTIL.smoothScroll.scrollTo($(scrollToURL));
    });

    return{
        scrollTo: function scrollTo($target) {
            if ($target.length) {
                var offset = $target.offset().top;

                $('html, body').stop().animate({
                    scrollTop: offset
                }, 1000);
            }
        }
    }
})();
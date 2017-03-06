//Define the breakpoints you need
Object.defineProperty(UTIL, 'BREAKPOINTS', {
    value: {
        xs_min: 320,
        sm_min: 768,
        md_min: 992,
        lg_min: 1025,
        xlg_min: 1200
    },
    writable: false,
    enumerable: true,
    configurable: false
});

//Match media will be available in UTIL.media
UTIL.media = (function util_match() {

    var THIS = {},

        //This object contains all the posible media queries
        media_queries = {
            xs: "(min-width: "+ UTIL.BREAKPOINTS.xs_min +"px)",
            sm: "(min-width: "+ UTIL.BREAKPOINTS.sm_min +"px)",
            md: "(min-width: "+ UTIL.BREAKPOINTS.md_min +"px)",
            lg: "(min-width: "+ UTIL.BREAKPOINTS.lg_min +"px)",
            xl: "(min-width: "+ UTIL.BREAKPOINTS.xlg_min +"px)",
            xs_only: "(max-width: "+ (UTIL.BREAKPOINTS.sm_min-1) + "px)",
            sm_only: "(min-width: "+ UTIL.BREAKPOINTS.sm_min +"px) and (max-width: "+ (UTIL.BREAKPOINTS.md_min-1) + "px)",
            md_only: "(min-width: "+ UTIL.BREAKPOINTS.md_min +"px) and (max-width: "+ (UTIL.BREAKPOINTS.lg_min-1) + "px)",
            landscape: "(orientation: landscape)",
            portrait: "(orientation: portrait)"
        };

    var handleQuery = function handle_query(mediaQuery, matchesCallback, doesntMatchCallback){

        if ( mediaQuery.matches ) {
            if(matchesCallback)
                matchesCallback();
        } else {
            if(doesntMatchCallback)
                doesntMatchCallback();
        }

    };

    var setUpQuery = function set_up_query(screen_size, matchesCallback, doesntMatchCallback, orientation){

        orientation = orientation || '';

        var size_query = media_queries[screen_size] || '',
            orientation_query = media_queries[orientation] || '',
            query = size_query,
            mediaQuery;

        if(query == ''){

            throw "The screen size provided is not defined";

        } else if(orientation_query != ''){

            query += ' and ' + orientation_query;

        }

        mediaQuery = window.matchMedia(query);

        return mediaQuery;
    };

   /*
    *  This executes the match media as soon as the function is called and adds a listener for future changes.
    *  @params
    *     screen_size:          string | Any of the values defined in the media_queries object
    *     matchesCallback:      function | to be executed when the media query is matched.
    *                           null | if you don't want to execute anything when the media query is matched
    *     doesntMatchCallback:  function | to be executed when the media query is not matched
    *                           null | if you don't want to execute anything when the media query is not matched
    *     orientation:          string [optional] | portrait or landscape  
    *       
    */
    THIS.on = function match_on(screen_size, matchesCallback, doesntMatchCallback, orientation){
        //get the match media object
        var mediaQuery = THIS.once(screen_size, matchesCallback, doesntMatchCallback, orientation);

        //listen for future changes
        mediaQuery.addListener( function(){
            handleQuery(mediaQuery, matchesCallback, doesntMatchCallback);
        });
    };

    /*
    *  This executes the match media as soon as the function is called  but doesn't listen for future changes
    *  @params
    *     screen_size:          string | Any of the values defined in the media_queries object
    *     matchesCallback:      function | to be executed when the media query is matched.
    *                           null | if you don't want to execute anything when the media query is matched
    *     doesntMatchCallback:  function | to be executed when the media query is not matched
    *                           null | if you don't want to execute anything when the media query is not matched
    *     orientation:          string [optional] | portrait or landscape  
    *       
    */
    THIS.once = function match_once(screen_size, matchesCallback, doesntMatchCallback, orientation){
        //get the match media object
        var mediaQuery = setUpQuery(screen_size, matchesCallback, doesntMatchCallback, orientation);
        //execute the query handler
        handleQuery(mediaQuery, matchesCallback, doesntMatchCallback);

        return mediaQuery;
    }

    return THIS;
})();


/*
Example:

function matchesCondition(){
    console.log('media query match!');
}

function doesntMatchCondition(){
    console.log('media query doesnt match :( ');   
}

//Execute the matchesCondition function anytime we pass from xs to sm (also does the check when this line of code is executed)
UTIL.media.on('sm', matchesCondition, doesntMatchCondition);


//Execute the matchesCondition function only once to detect if we're on 'sm' or not, and don't do anything if we're not on 'sm'
UTIL.media.on('sm', matchesCondition );

*/
/**
 * @summary     init for different stages
 * @version     1.0.0
 * @file        app.init.js
 * @author      Bhaskar Mangal ( mangalbhaskar@gmail.com )
 * @contact     www.bhaskarmangal.com
 * @reference    https://github.com/mangalbhaskar/bMloader
 */
(function( window, factory ){
  if (typeof(window.bMloader) == 'undefined') { window.bMloader = {}; }
  var root = window.bMloader;
  factory( root );
})(
window
,function( root ) {
  var s1 = {
    onload:function( root, next ) {
      console.log("loaderConfig: onload: 1.0");
      console.log("1.0----ends");
      if( next ) {
        next();
      }
    }
  };
  
  var s2 = {
    onload:function( root, next ) {
      console.log("loaderConfig: onload: 2.0");
      
      //application launch
      root.launch("graph");
      
      console.log("2.0----ends");
      if( next ) {
        next();
      }
    }
  };
  
  var s3 = {
    onload:function( root, next ) {
      console.log("loaderConfig: onload: 3.0");
      console.log("3.0----ends");
      if( next ) {
        next();
      }
    }
  };
  
  var s4 = {
    onload:function( root, next ) {
      console.log("loaderConfig: onload: 4.0");
      console.log("4.0----ends");
      if( next ) {
        next();
      }
    }
  };
  
  //application Name  
  root.register( "app1", {
   init: { 
     "0": s1
    ,"1": s2
    ,"2": s3
    ,"3": s4
    ,"4": s5
   }
  });
  
  //application 2
  var graph = {
    init: {
      "0": {
        onload:function( root, next ) {
          console.log("loaderConfig: onload: graph 1.0");
          console.log("1.0----ends");
          if( next ) {
            next();
          }
        }
      }
      ,"1": {
        onload:function( root, next ) {
          console.log("loaderConfig: evaluate: 2.0");
          console.log("2.0----ends");
        }
      }
    }
  };
  
  root.register( "graph", {
    init: graph.init
  });
  
});

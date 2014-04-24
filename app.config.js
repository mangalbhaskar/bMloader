/**
 * @summary     config for different stages
 * @version     1.0.0
 * @file        app.config.js
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
    'require':[
       {'m':'jQuery','is':'js/jquery','as':'jQuery','v':"-1.8.3",'b':1,'c':"typeof(jQuery.noConflict}=='function'"}
      ,{'m':'JSON','is':'js/json2','as':'Json','b':1}
    ]
    ,isReady: 0//false
    ,parallel: 1//true
    ,build: 0
    ,onload: null
  };
  
  var s2 = {
    'require':[
       {'m':'layout','is':'js/jquery.layout','b':1} //layout plugin //,after:['jQuery']
      ,{'m':'easing','is':'js/jquery.easing','v':".1.3",'b':1,'d':'1'}//easinganimation
    ]
    ,isReady: 0//false
    ,parallel: 1//true
    ,build: 1
    ,onload: null
  };
  
  var s3 = {
    'require':[
       {'m':'jQueryUI','is':'js/jquery-ui','v':'-1.9.2.custom','b':1,'d':'1'}//,after:['jQuery']
    ]
    ,isReady: 0//false
    ,parallel: 1//true
    ,build: 1
    ,onload: null
  };
  
  var s4 = {
    'require':[
      {'m':'dataTables','is':'js/jquery.dataTables','b':1,'d':'1'}//,after:['jQuery']
    ]
    ,isReady: 0//false
    ,parallel: 1//true
    ,onload:null
  };
  
  var s5 = {
    'require':[
      {'m':'intro','is':'js/intro','as':'intro','b':3} //introduction plugin
    ]
    ,isReady: 0//false
    ,parallel: 1//true
    ,onload: null
   };
    
  
  var config = [s1,s2,s3,s4,s5];
  var css = ['css/jquery-ui.custom','css/jquery.dataTables','css/jquery.layout.default','css/introjs']
  
  root.register( "app1", {
   loadconfig: config
   ,css: css 
  });
  
  var graph = {
    config:[
      {
        'require':[
           {'m':'Raphael','is':'js/raphael-min','as':'Raphael','b':1}
        ]
        ,isReady: 0//false
        ,parallel: 1//true
        ,build: 1
        ,onload:null
      }
      ,{
        'require':[
           {'m':'gRaphael','is':'js/g.raphael-min','where': 'Raphael','b':1} //,after:['Raphael']
          ,{'m':'gPie','is':'js/g.pie-min','where': 'Raphael','b':1} //,after:['Raphael']
        ]
        ,isReady: 0//false
        ,parallel: 1//true
        ,build: 1
        ,onload:null
      }
    ]
  };
  
  root.register( "graph", {
    loadconfig: graph.config
  });
  
  root.launch('app1');
});

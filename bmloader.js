/**
 * @summary     Javascript Loader for JS, CSS.
 * @version     1.0.0
 * @file        bMloader.js
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
  root.Loaded = {};
  root.loader = {
    errorTimeout: 1e4
    ,config: {}
  };
   
  var addScriptListeners = function(node, func) {
    if (node.addEventListener) {
      node.addEventListener('error', func, true);
      node.addEventListener('load', func, true);
    } else if (node.attachEvent) {
      node.attachEvent('onerror', func, true);
      node.attachEvent('onload', func, true);
      node.attachEvent('onreadystatechange', function() {
        if (node.readyState == 'complete' || node.readyState == 'loaded') {
          func();
        }
      });
    } else {
      throw Error('Failed to attach listeners to script.');
    }
  };
  
  var injectJs = function( parent, o ) {
    //console.log('injectJs: ');
    var bM = o.bM
    ,Rr = o.Rr
    ,delay = o.delay
    ,cb = o.cb
    ,host = o.host || this._serverHostUrl
    ,rStr = o.rStr || this._rStr
    ,src= bM.src
    ,scriptUrl = host+src+'.js?r='+rStr
    ,type = 'text/javascript'
    //,bs = (new Date()).getTime()
    ,where = bM.where? bM.where : window
    ,as = bM.as
    ,m = bM.m
    ,id = bM.id
    ;
    parent = parent || 'head';
    delay = typeof delay !== 'undefined'? delay : 0;
    setTimeout(function() {
      //if( !where[ as ] ) {//&& !root.Loaded[ id ]
      if( !root.Loaded[ id ] ) {
        var node = document.createElement('script');
        node.src = scriptUrl;
        node.type = type;
        node.id = id;
        var el_parent = document.getElementsByTagName(parent);
        el_parent[0].appendChild(node);
        var done = 0;
        var count = 0;
        var exec = function() {
          if ( !done ) {
              //console.log('on script load called: exec: ');
              //console.log(bM.is);
              done = 1;
              //console.log('id: ');console.log(this.id);
              if ( Rr ) {
                //var shifted = Rr.shift();
                //console.log("shifted 'is':");console.log(shifted);
                root.Loaded[ id ] = m;
                count++;
              }
              if( cb ) {
                cb( (Rr.length - count + 1) );
              }
              if( bM.a_cb ) {
                bM.a_cb( Rr, this.id );
              }
              node.onload = node.onreadystatechange = null;
          }
        };
        addScriptListeners( node, exec );
      }
    },delay);
  };
  
  var injectCss = function( o ) {
    var host = o.host || this._serverHostUrl
    ,r = o.r || this._rStr
    ,is = o.is
    ,cssUrl = host+is+'.css?r='+r
    ,parent = 'head'
    ,node = document.createElement('link')
    ;
    
    node.href = cssUrl;
    node.rel = 'stylesheet';
    node.type = 'text/css';
    var el_parent = document.getElementsByTagName(parent);
    el_parent[0].appendChild(node);
  };
  
  var getModule = function( name, R ) {
    var module = R.m
    ,is = R.is
    ,as = R.as
    ,version = R.v
    ,build = typeof R.b !=='undefined'? R.b : 0
    ,minify = R.minify || 'min/?f='
    ,id = (function() {
      if( as ) {
        var id = 'bM-'+as//+'-'+bs;
      }else {
        var s = is.split(/\//)
        ,i = (s.length - 1)
        ,id = 'bM-'+s[i]
        ;
      }
      return id;
    })()
    ,o = {
      src:(function() {
        if( version ) {
          var src = is+version;
        }else {
          var src = is;
        }
        return src;
      })()
      ,minify: minify
      ,b: build
      ,id: id
    }
    ;
    for( var p in R ) {
      o[p] = R[p];
    }
    
    return o;
  };
  
  var how = {
    require:function( name, R, dStack ) {
      var eStack = [];
      for( var i=0; i<R.length; i++ ) {
        var o = R[i] //object
        ,oo = getModule.call( this, name, o )
        ;
        if( dStack && i==0 ) {
          oo.dStack = dStack;
        }
        eStack.push( oo );
      }
      return eStack;
    }
  };
  
  var _exeCallback = function( total, cb, next, options ) {
    var count = 0;
    return function() {
      var total = arguments[0];
      count++;
      if(count < total) {
        return;
      }
      if( cb ) {
        cb( root, next, options );
      }
    };
  };
  
  var _exeStage = function( i, cb ) {
    return function() {
      cb( i );
    };
  };
  
  var _triggerLoad = function( name, Rr, onload, i, next ) {
    var nextStage = _exeCallback( Rr.length, onload, next );
    var a = 'after';
    for( var delay=0; delay<Rr.length; delay++ ) {
      (function( delay ) {
        Rr[delay].isLoading = 1;
        root.load( 'js', {
          bM: Rr[delay]
          ,Rr: Rr
          ,delay: delay
          ,cb: nextStage
        });
      })( delay );
    }
  };
  
  root.register = function( name, component ) {
    name = name || "bM";
    if( !this[ name ] ) {
      this[ name ] = {};
    }
    
    var app = this[ name ];
    if( component ) {
      for( var c in component ) {
        var o = component[c];
        if( !app[ c ] ) {
          app[ c ] = o;
        }
      }
    }
    //console.log('loader:register:debug stop');
  };
  
  root.launch = function( name ) {
    if( !name || !this[ name ] ) {
      return false;
    }
    var app = this[ name ]
    ,config = app.loadconfig
    ,l = config.length
    ,init = app.init
    ,css = app.css
    ;
    //init for stages is less than or equal to stages in config
    //i.e. every stage need not have init
    //whereas ever stage in init must have stage in config
    for( var i=0;i<l;i++) {
      if( init[i] ) {
        var o = init[i];
        for( var p in o ) {
          config[i][p] = o[p];
        }   
      }
    }    
    //console.log('loader:launch:debug stop');
    if( css ) {
      config.css = css;
      for( var i=0; i<css.length; i++ ) {
        injectCss.call( this, {
         'is': css[i]
        });  
      }
    }
    var r ='require'
    ,d='defer'
    ,a='after'
    ;
    
    l = config.length;
    for( var i=0; i<l; i++ ) {
      (function(i) {
        config[i].build = 0;
        config[i].isLoading = 0;
        if( config[i][r] ) {
          config[i][r] = how[r].call( root, name, config[i][r] );
        }
        if( config[i][d] ) {
          config[i][d] = how[d].call( root, name, config[i][d] );
        }
        var next;
        var _exec = function( i ) {
          _triggerLoad( name, config[i].require, config[i].onload, i, config[i].next );
        };
        if( i+1 < l ) {
          next = config[i].next = _exeStage( (i+1), _exec );
        }
        if( i===0 ) {
          _exec( i );
        }
      }(i));
    }
  };
  
  root.load = function( type, o ) {
    var parent = 'head';
    if( type === 'css' ) {
      injectCss.call( this, o );  
    }
    if( type === 'js' ) {
      injectJs.call( this, parent, o );
    }
  }; 
});

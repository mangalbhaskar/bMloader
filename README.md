bMloader
========

Javascript Loader for JS, CSS. AMD or Non-AMD doesn't matter, it will take care of JS dependencies.

Steps:

1. Identify different stages for a web applications such that for a single stage it can load Javascripts which do not have interdependency within that stage. The next stage may have dependency on the previous stage.

2. Create two different js based on app.init.js and app.config.js.
a) app.config.js:
  i. It provides the Javascript configuration like path, version, name etc as different stages.
  ii. It provide the css configuration too
  iii. It tiggers the main application
  
b) app.init.js: It identifies the Javascript code that needs to be executed for each stage.

3. Load bmloader.js first

4. Register application( loadconfig, css, init ), with some name.

5. Launch registered application with the previously registered name.

Additional Comments
1. Concept
Javascript web application can be broken down into different smaller and nimbler logical stages for faster execution of the logic.

2. You can have more than one application and nest them in any stage other application
 
3. app.config.js and app.init.js are provided as example

TBD:
1. introduce 'after' dependency that will take care of its dependent and load it.

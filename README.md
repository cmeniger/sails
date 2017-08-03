# Sails 
## &nbsp; Installation
#

##### &nbsp; Local Installation
[1] &nbsp; Install sails (require Node Js to be installed):
> npm install sails -g

[2] &nbsp; From local terminal :
>git clone https://github.com/cmeniger/sails.git
<br>cd sails
<br>npm install
<br>bower install --allow-root
<br>sails lift

[3] &nbsp; From host terminal :
> sudo nano /etc/hosts
127.0.0.1 sails.local
      
[4] &nbsp; From web browser - Chrome :
> http://sails.local

#### Get started
###### In addition, you can use FOREVER (a simple CLI tool for ensuring that a given script runs continuously)
#
>https://github.com/foreverjs/forever

[1] &nbsp; Services and Crud :
###### all services and cruds code are stored in phoenix/api
        
        - sails
             - api
                 - controllers : Front and back controller (as service or by rendering view pages)
                 - models : (definitions of all modules entities with +/- schema)
                 - policies : (to define which policies to handle when pages requested ex: security firewall) 
                 - services : (to define routine services)
             assets
                 - fonts 
                 - images
                 - js
                 - styles
                 - favicon.ico
             config
                 - ...
                 - connections : (database connexion)
                 - local : (to define default and local parameter)  
                 - routes: (all routes modules )
                 - menus : (all menus modules)
                 - polities : (all policies modules)
                 - views : 
                 - permissions : (for custom permission management)
             views
                 - _integration : (integration files)
                 - _layout : (front and back layout)
                 - _partials : (to render partial html code)
                 - _templates
                          
   ###### To create new module we can use two generator commands:
[2] &nbsp; sails generate command:
  
      sails generate api [ModuleName] : 
    // this commande generate : 
       - sails
           - api
              - controller
                  - moduleNameController.js
              - models
                  - ModuleName.js
   
[3] &nbsp; crud generate command:
  
      sails generate crud [module name]
    // this commande generate : 
      - sails
          - api
              - controller
                   - moduleNameController.js
              - models
                   - ModuleName.js
          - config
              - routes
                  - ModulesName.js
              - menus
                  - ModuleName.json
              - policies
                  - ModuleName.js
          - view
              - admin
              - front
   
[4] &nbsp; Front and intégration :
      
      # take a look to [sails.local:1337/integration] to see first integration page
      # All integration files must be put in this folder
      # to test them from browser user [sails.local:1337/integration/filename]
      

### Documentation

[![Screenshot from the original Sails video](http://i.imgur.com/Ii88jlhl.png)](https://www.youtube.com/watch?v=GK-tFvpIR7c)

- [Website](http://sailsjs.com/)
- [Official Documentation](http://sailsjs.com/documentation)
- [Blog](http://blog.sailsjs.com)
- [Twitter](https://twitter.com/sailsjs)
- [Roadmap](http://sailsjs.com/roadmap)
- [Google Group](https://groups.google.com/forum/#!forum/sailsjs)
- [Facebook](https://www.facebook.com/sailsjs)




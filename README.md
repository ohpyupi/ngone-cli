# ngone-cli
ngone-cli is a CLI tool to enhance angular.js developers' performance, reducing tedious and repeated works.
ngone-cli assumes developers build angular app on top of es6. 
Webpack is used to transpile es6 version angular to stable javascript one, utilizing babel core.

This module is now at baby state and I welcome any contributes and feedback to the module.

## Installation
`npm install ngone-cli -g`

## Initializing Angular.js application
`ngone init` will initialize the application, and it will create app.module.js and app.config.js in ./app directory.
By default, in app.module.js, import statement for [angular](https://www.npmjs.com/package/angular) and [angular-ui-router](https://www.npmjs.com/package/angular-ui-router) have been declared.

## Generate a component
`ngone component [name] -g` will create basic component template in ./app/components/[name]. Once the component is created,
importing the component in the main modules and injecting to the angular app will be automatically followed.

## Author
[ohpyupi](https://github.com/ohpyupi)

## License
Released under the terms of MIT License.

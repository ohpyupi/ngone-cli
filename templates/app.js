const app = {
	module: 
`import angular from 'angular';
/* DO NOT DELETE
** external dependencies
*/
import uirouter from 'angular-ui-router';
/* DO NOT DELETE
** internal dependencies
*/
import {app_routing} from './app.config';
angular.module('app', [
uirouter,
/* DO NOT DELETE
** injected dependencies
*/
])
.config(app_routing)`,
	config: 
`export function app_routing ($urlRouterProvider, $locationProvider) {
	'ngInject';
	$urlRouterProvider.otherwise('/');
}`,
};

module.exports = app;

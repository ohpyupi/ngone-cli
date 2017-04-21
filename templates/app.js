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
import {routing} from './app.config';
app.module('app', [
uirouter,
/* DO NOT DELETE
** injected dependencies
*/
])
.config(app_routing)`,
	config: 
`export function routing ($urlRouterProvider, $locationProvider) {
	'ngInject';
	$urlRouterProvider.otherwise('/');
}`,
};

module.exports = app;

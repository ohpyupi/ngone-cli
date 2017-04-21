const app = {
	module: 
`import angular from 'angular';
// external dependencies
import uirouter from 'angular-ui-router';
// internal dependencies
import {routing} from './app.config';
app.module('app', [
uirouter,
// dependencies
])
.config(app_routing)`,
	config: 
`export function routing ($urlRouterProvider, $locationProvider) {
	'ngInject';
	$urlRouterProvider.otherwise('/');
}`,
};

module.exports = app;

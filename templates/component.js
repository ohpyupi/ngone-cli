const component = {
	index:
`import angular from 'angular';
/* DO NOT DELETE
** components
*/
export default angular.module('app.component', [])
/* DO NOT DELETE
** registered components
*/
.name;`,
	js: 
`export default {
	bindings: {
	},
	template: require('./index.html'),
	controller: class ComponentCtrl {
		constructor() {
			'ngInject';
		}
		$onInit() {
		}
	}
}`,
	html: `<!-- Component HTML -->`,
};

module.exports = component;

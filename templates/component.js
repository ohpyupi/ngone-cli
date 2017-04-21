const component = {
	index:
`import angular from 'angular';
// import components
export default angular.module('app.component', [])
// register components
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

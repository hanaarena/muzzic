var angular = require('angular');

var testModule = angular.module('testModule', []);
testModule.controller('TestCtrl', [
	'$location',
	function($location) {
		console.log($location.path() + 1);
	}
]);

module.exports = testModule;
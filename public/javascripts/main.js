require(['angular'], function(angular) {
	var mz = angular.module('mz', ['ngCookies']);

	mz.controller('musicCtrl', function ($scope, $http) {
		$scope.testJson = function() {
			$http.get('http://ip.jsontest.com/').then(function (data) {
				document.write(data);
			}, function(error) {
				console.log(error);
			});
		};
	});
});

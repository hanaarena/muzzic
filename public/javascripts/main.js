require(['angular'], function(angular) {
	var mz = angular.module('mz', ['ngCookies']);

	mz.controller('ctrl', function ($http) {
		$http.get('http://ip.jsontest.com/').then(function (data) {
			document.write(data);
		}, function(error) {
			console.log(error);
		});
	});
});

var angular = require("angular");
var testModule = require("./lib/test");
var mainModule = require("./lib/music");

var controllersModule = angular.module("MUZIC.ctrl", [
	testModule.name,
	mainModule.name
]);
controllersModule.controller('MainCtrls', MainCtrls);

function MainCtrls($scope) {
}
MainCtrls.$inject = ['$scope'];

module.exports = controllersModule;

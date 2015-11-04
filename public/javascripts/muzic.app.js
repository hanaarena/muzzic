var angular = require("angular");
var controllersModule = require("./controllers");

var mainApp = angular.module("MUZIC", [
	controllersModule.name
]);

module.exports = mainApp;

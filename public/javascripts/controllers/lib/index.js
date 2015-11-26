var angular = require('angular');
var indexModule = angular.module('indexModule', []);

indexModule.controller('IndexCtrl', [
  '$scope',
  function($scope) {
    $scope.isActive = false;

    $scope.musicList = [
      {isActive: false, value: 'aaa'},
      {isActive: false, value: 'bbb'}
    ];

    $scope.activeItem = function(index, list){
      if (list[index].isActive) {
        list[index].isActive = false;
      } else {
        list[index].isActive = true;
        console.log('else condition');
      }
    };
  }
]);

module.exports = indexModule;

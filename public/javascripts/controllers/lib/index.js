var angular = require('angular');
var user = require('../../services/api/user');
var indexModule = angular.module('indexModule', [
  user.name
]);

indexModule.controller('IndexCtrl', [
  '$scope',
  '$http',
  'User',
  function($scope, $http, User) {
    $scope.result = [];
    $scope.userName = '';
    $scope.isActive = false;

    var queryMusicList = function() {
      User.queryMusicList().then(function(response) {
        $scope.musicList = response.content.musiclist;
      }, function(response) {
        console.error(response);
      });
    };
    queryMusicList();

    $scope.activeItem = function(index, list){
      if (list[index].isActive) {
        list[index].isActive = false;
        if ($scope.result.indexOf(list[index].value) != -1) {
          var idx = $scope.result.indexOf(list[index].value);
          $scope.result.splice(idx, 1);
        }
      } else {
        list[index].isActive = true;
        if ($scope.result.indexOf(list[index].value) == -1) {
          $scope.result.push(list[index].value);
        } else {
          console.log('else condition');
        }
      }
    };

    $scope.submitUser = function() {
      User.createAccount({
        name: $scope.userName,
        favorSong: $scope.result,
        avatar: false
      }).then(function(response) {
        if (response.content.redirect) {
          location.href = response.content.redirect;
        }
      }, function(response) {
        console.error(response);
        if (response.msg) {
          alert(response.msg);
        }
      })
    };
  }
]);

module.exports = indexModule;

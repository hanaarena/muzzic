var angular = require('angular');
var indexModule = angular.module('indexModule', []);

indexModule.controller('IndexCtrl', [
  '$scope',
  '$http',
  function($scope, $http) {
    $scope.result = [];
    $scope.userName = '';
    $scope.isActive = false;

    var queryMusicList = function() {
      $http.get('/musicList').then(function(response) {
        console.log(response);
        $scope.musicList = response.data.result;
      }, function(err) {
        console.error(err);
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
      console.log($scope.result + ' , ' + $scope.userName);
      $http.post('/user/create', {
        name: $scope.userName,
        favorSong: $scope.result
      }).then(function(response) {
        if (response.data.redirect) {
          location.href = response.data.redirect;
        }
      }, function(err) {
        console.error(err.data.exist);
        if (err.data.exist) {
          alert(err.data.exist);
        }
      })
    };
  }
]);

module.exports = indexModule;

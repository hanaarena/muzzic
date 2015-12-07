/**
 * Created by Lanz on 2015/12/6.
 */
var angular = require('angular');
var request = require('../request');

var user = angular.module('MOZIC.api.user', [
  request.name
]);

user.factory('User', [
  'Request',
  function(Request) {
    var User = {};

    User.queryMusicList = function() {
      return Request.get('/musicList');
    };

    User.createAccount = function(params) {
      return Request.post('/user/create', params);
    };

    return User;
  }]
);

module.exports = user;

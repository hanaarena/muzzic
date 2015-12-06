var angular = require('angular');

var request = angular.module('MUZIC.request', []);

request.factory('Request', [
  '$http',
  '$q',
  function($http, $q) {
    var Request = {};

    Request.emit = function(config) {
      var $q = $q;
      return $http(config).then(function(response) {
        var data = response.data;
        if (data && data.result == 'success') {
          return data;
        } else {
          return $q.reject(data);
        }
      }, function(response) {
        return $q.reject(response.data);
      });
    };

    Request.get = function(url, params, config) {
      var _config = angular.extend({
        method: 'GET',
        url: url,
        params: params
      }, config);

      return this.emit(_config);
    };

    Request.post = function(url, params, config) {
      //var data;
      //
      //if (params) {
      //  data = $.param(params);
      //}

      console.info(params);

      var _config = angular.extend({
        method: 'POST',
        url: url,
        data: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }, config);

      return this.emit(_config);
    };

    return Request;
  }]
);

module.exports = request;

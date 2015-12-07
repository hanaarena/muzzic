var angular = require('angular');

var request = angular.module('MUZIC.request', []);

request.factory('Request', [
  '$http',
  '$q',
  function($http, $q) {
    var Request = {};
    var serialize = function(obj) {
      var str = [];
      for(var p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
      return str.join("&");
    };

    Request.emit = function(config) {
      return $http(config).then(function(response) {
        var data = response.data;
        if (data && data.result == 'success') {
          return data;
        } else {
          return $q.reject(response.data);
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
      var _config = angular.extend({
        method: 'POST',
        url: url,
        data: serialize(params),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }, config);

      return this.emit(_config);
    };

    return Request;
  }]
);

module.exports = request;

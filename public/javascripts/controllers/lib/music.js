var angular = require('angular');
var mainModule = angular.module('mainModule', []);

mainModule.controller('mainCtrl', [
  '$scope',
  '$http',
  '$location',
  function ($scope, $http, $location) {
    var playAudio = document.getElementById('player');
    var cd = $('#cd');
    var ins = $('#in');
    var album = $('#album');
    var cover = $('#in');
    var play = $('#play');
    var music_name = $('#music_name');
    var artist = $('#artist');
    var music_lrc = $('#music_lrc');

    $("#player").bind("ended", function () {
      $scope.nextMusic();
    });

    $scope.musicPlay = function () {
      if (cover.css('opacity') === '0') {
        cover.css('opacity', '1');
        $('.action').css('opacity', '1');
        album.css({
          'background-color': 'white',
          'border': '1px solid #9ad2fe',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'background-position': '50% 50%'
        });

        $scope.nextMusic();
      }

      if (playAudio.paused) {
        console.log('playing');
        playAudio.play();
        play.attr('src', '/build/images/pause.png');
        album.addClass('roll');
        cover.addClass('roll');
      } else {
        playAudio.pause();
        console.log('pause');
        play.attr('src', '/build/images/play.png');
        album.removeClass('roll');
        cover.removeClass('roll');
      }
    };

    $scope.nextMusic = function () {
      console.log('next music');
      playAudio.pause();
      album.removeClass('roll');
      cover.removeClass('roll');

      loadMusic();
      play.attr('src', '/build/images/pause.png');
    };

    function loadMusic() {
      var url = $location.absUrl();
      var username = url.slice(url.lastIndexOf('/')+1);

      $http.get('/user/' + username + '/list').then(function(response) {
        var data = response.data.content;

        if (data.albumList != '') {
          // TODO: handle when user have album data
        }

        if (data.songList) {
          var length = data.songList.length;
          var songID = data.songList[Math.round(Math.random(0, length - 1))];
          $http.get('/song/' + songID).then(function(response) {
            var result = response.data;

            var cdCover = result['songs'][0]['album']['picUrl'];
            var musicName = result['songs'][0]['name'];
            var artistName = result['songs'][0]['artists'][0]['name'];
            var mp3 = result['songs'][0]['mp3Url'];

            $('#player').attr('src', mp3);

            album.css({
              'background-image': 'url( "' + cdCover + '")',
              'opacity': 0
            }).animate({opacity: 1}, 1000);

            music_name.html(musicName);
            artist.html(artistName);
            playAudio.play();
            album.addClass('roll');
            cover.addClass('roll');
          }, function(response) {
            if (response.data.result == 'error') {
              console.error(esponse.data.result);
            }
          });
        }
      }, function(response) {
        if (response.data.result == 'error') {
          console.error(esponse.data.result);
        }
      })['finally'](function() {
        console.log('finally here')
      });
    }

    $scope.volume = function (vol) {
      playAudio.volume = vol / 10;
    };

    $scope.$watch('volumes', function (newValue, oldValue) {
      if (newValue && oldValue) {
        if (newValue != oldValue) {
          $scope.volume(newValue);
        }
      }
    }, true);

    $(document).ready(function () {
      $(document).keypress(function (e) {
        if ((e.which && e.which == 32) || (e.keyCode && e.keyCode == 32)) {
          $scope.musicPlay();
          return false;
        } else {
          return true;
        }
      });
    });
  }]);

module.exports = mainModule;

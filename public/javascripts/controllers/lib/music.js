var angular = require('angular');

var mainModule = angular.module('mainModule', []);

mainModule.controller('mainCtrl', [
  '$scope',
  function ($scope) {
    var playAudio = document.getElementById('player');
    var cd = $('#cd');
    var ins = $('#in');
    var album = $('#album');
    var cover = $('#in');
    var cover_out = $('.out');
    var play = $('#play');
    var music_name = $('#music_name');
    var artist = $('#artist');
    var music_lrc = $('#music_lrc');

    $(window).resize(function () {
      cdResize();
    });

    $("#player").bind("ended", function () {
      $scope.nextMusic();
    });

    ins.one('click', function () {
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
      }

      $scope.nextMusic();
    });

    $scope.initPlay = function () {
      console.log('click2');
      if (cover.css('opacity') === '0') {
        cover.css('opacity', '1');
        $('.action').css('opacity', '1');
        album.css({
          'opacity': '1',
          'background-color': 'white',
          'border': '1px solid #9ad2fe',
          'background-repeat': 'no-repeat',
          'background-size': 'cover',
          'background-position': '50% 50%'
        });
      }

      $scope.nextMusic();
    };

    $scope.musicPlay = function () {
      console.log('music play');
      if (playAudio.paused) {
        playAudio.play();
        play.attr('src', '/build/images/pause.png');
        album.addClass('roll');
        cover.addClass('roll');
      } else {
        playAudio.pause();
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
      $.ajax({
        type: 'GET',
        url: '/song/24603571/'
      }).done(function (data) {
        var result = data;

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
      });
    }

    $scope.volume = function (vol) {
      playAudio.volume = vol / 10;
    };

    function cdResize() {
      cdHeight = cd.height();
      cd.css("width", cdHeight);
    }

    $scope.$watch('volumes', function (newValue, oldValue) {
      if (newValue && oldValue) {
        if (newValue != oldValue) {
          $scope.volume(newValue);
          console.log(newValue);
        }
      }
    }, true);

    $(document).ready(function () {
      cdResize();
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

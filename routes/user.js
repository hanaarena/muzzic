/**
 * Created by Lanz on 2015/11/14.
 */
var express = require('express');
var jade = require('jade');
var router = express.Router();
var request = require('request');
var User = require('../models/User');

router.get('/', function(req, res, next) {
  next();
});

router.get('/:userName', function(req, res, next) {
  //- TODO: handle query string
  var userName = req.params.userName;
  var baseUri = req.protocol + '://' + req.hostname + ':3001';

  if (userName) {
    console.log(userName);
    User.findOne({name: userName})
      .exec(function (err, user) {
        if (!user) {
          next(err);
        } else {
          //- Get user favor play list length
          var playlistCount = user.favorPlaylist.length;
          //- Get random play list number from list
          var playlist = user.favorPlaylist[Math.round(Math.random(0, playlistCount - 1))];

          request({
            method: 'GET',
            uri: baseUri + '/playlist/' + playlist
          }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var result = JSON.parse(body);
              console.log(result.result.tracks[0].mp3Url);
            }
          });

          res.render('user', {title: 'User play list'});
        }
      });
  } else if (!userName) {
    console.log('OOPs');
    User.find({})
      .exec(function (err, users) {
        if (err) {
          next(err);
        } else {
          res.render('user', {title: 'User play list - un username', users: users});
        }
      });
  } else {
    next();
  }
});

router.post('/create', function(req, res, next) {
  User.findOne({name: req.body.name}, function(err, user) {
    if (user) {
      res.status(500).send({exist: 'User exist.'});
    } else {
      var newUser = new User({
        name: req.body.name,
        avatar: '/path/to/avatar',//- default
        favorSong: req.body.favorSong,
        favorPlaylist: [] //- default
      });
      newUser.save(function (err, user) {
        if (err) {
          return next(err);
        } else {
          return res.send({redirect: '/user/'+req.body.name});
        }
      });
    }
  });
});

module.exports = router;

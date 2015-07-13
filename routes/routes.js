/**
 * Created by Lanz on 2015/7/5.
 */
var express = require('express');
var jade = require('jade');
var router = express.Router();
var request = require('request');
var User = require('../models/User');

router.get('/', function(req, res, next) {
	//- TODO: handle string
	var userName = req.query.q;

	if (userName) {
		User.findOne({ name: userName })
			.exec(function(err, user){
				if (err) {
					next(err);
				} else {
					var playlistCount = user.favorPlaylist.length;
					console.log(playlistCount);
					var playlist = user.favorPlaylist[Math.round(Math.random(0, playlistCount - 1))];
					console.log(playlist);
					res.render('index', { title: 'User play list' });
				}
			});
	} else if (!userName) {
		User.find({})
			.exec(function (err, users){
				if (err) {
					next(err);
				} else {
					res.render('index', { title: 'MuzicZZZZ', users: users });
				}
			});
	} else {
		next();
	}
});

// Song detail
/**
 * @param id - song id
 * @param ids - same as song id
 */
router.get('/song/:id', function (req, res, next) {
	var id = req.params.id;
	var result;
	var uri = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';

	var options = {
		url: uri,
		headers: {
			'User-Agent': 'request'
		}
	};

	function callback(error, response, body) {
		if (response) {
			//console.log(JSON.parse(body));
			result = JSON.parse(body);
			return res.json(result);
		} else {
			next();
		}
	}

	//request.cookie('appver=1.5.0.75771;');

	request(options, callback);
});

// Singer detail
/**
 * @param id - singer id
 */
router.get('/singer/:id', function (req, res, next) {
	var id = req.params.id;
	//- Default only show 5 albums
	var uri = 'http://music.163.com/api/artist/albums/' + id + '?id=' + id + '&offset=0&total=true&limit=5';

	var options = {
		url: uri,
		headers: {
			//- 假装我是浏览器
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Referer': 'http://music.163.com/'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body));
		} else {
			next();
		}
	}

	request(options, callback);
});

// Album detail
/**
 * @param id - album id
 */
router.get('/album/:id', function (req, res, next) {
	var id = req.params.id;
	//- Default only show 10 albums
	var uri = 'http://music.163.com/api/album/' + id +'?ext=true&id=' + id + '&offset=0&total=true&limit=10';

	var options = {
		url: uri,
		headers: {
			//- 假装我是浏览器
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Referer': 'http://music.163.com/'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body));
		} else {
			next();
		}
	}

	request(options, callback);
});

// playlist detail
/**
 * @param id - playlist id
 */
router.get('/playlist/:id', function (req, res, next) {
	var id = req.params.id;
	var uri = 'http://music.163.com/api/playlist/detail?id=' + id + '&updateTime=-1';

	var options = {
		url: uri,
		headers: {
			'User-Agent': 'request'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			//console.log(JSON.parse(body));
			result = JSON.parse(body);
			return res.json(result);
		} else {
			next();
		}
	}

	request(options, callback);
});

// lyric detail
/**
 * @param id - song id
 */
router.get('/lyric/:id', function (req, res, next) {
	var id = req.params.id;
	var uri = 'http://music.163.com/api/song/lyric?os=pc&id=' + id + '&lv=-1&kv=-1&tv=-1';

	var options = {
		url: uri,
		headers: {
			//- 假装我是浏览器
			'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.76 Safari/537.36',
			'Content-Type': 'application/x-www-form-urlencoded',
			'Referer': 'http://music.163.com/'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body));
		} else {
			next();
		}
	}

	request(options, callback);
});

//- Test: init default user automatic
router.get('/auto', function(req, res, next) {
	User.findOne({name: 'admin'}, function(err, user) {
		if (user) {
			req.flash('errors', 'admin user already exists');
		} else {
			var newUser = new User({
				name: 'admin', //- default
				avatar: '/path/to/avatar',
				favorSong: ['185982'], //- default
				favorPlaylist: ['88497708'] //- default
			});
			newUser.save(function(err, user) {
				if (err) {
					return next(err);
				} else {
					return res.redirect('/');
				}
			});
		}
	});
});

router.get('*', function(req, res){
	res.status(404);

	res.render('error');
});

module.exports = router;

/**
 * Created by Lanz on 2015/7/5.
 */
var express = require('express');
var jade = require('jade');
var router = express.Router();
var request = require('request');

router.get('/', function(req, res, next) {
	if (res) {
		res.render('index', { title: 'MuzicZZZZ'});
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
	var uri = 'http://music.163.com/api/song/detail/?id=' + id + '&ids=%5B' + id + '%5D';

	var options = {
		url: uri,
		headers: {
			'User-Agent': 'request'
		}
	};

	function callback(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log(JSON.parse(body));
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

	//request.cookie('appver=1.5.0.75771;');

	request(options, callback);
});

// Album detail
/**
 * @param id - album id
 */
router.get('/album/:id', function (req, res, next) {
	var id = req.params.id;
	//- Default only show 10 albums
	var uri = 'http://music.163.com/api/album/2457012?ext=true&id=2457012&offset=0&total=true&limit=10';

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
			var result = JSON.parse(body);
			console.log(result.album.songs);
		} else {
			next();
		}
	}

	//request.cookie('appver=1.5.0.75771;');

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
			console.log(JSON.parse(body));
		} else {
			next();
		}
	}

	//request.cookie('appver=1.5.0.75771;');

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

	//request.cookie('appver=1.5.0.75771;');

	request(options, callback);
});

router.get('*', function(req, res){
	res.status(404);

	res.render('error');
});

module.exports = router;

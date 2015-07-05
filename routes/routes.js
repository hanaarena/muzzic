/**
 * Created by Lanz on 2015/7/5.
 */
var express = require('express');
var jade = require('jade');
var router = express.Router();

router.get('/', function(req, res, next) {
	if (res) {
		res.render('index', { title: 'MuzicZZZZ'});
	} else {
		next();
	}
});

module.exports = router;

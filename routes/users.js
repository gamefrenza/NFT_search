var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var input = req.query.inputurl;
/*
	var contract = '';
	var tokenId = '';
	var etherscanURL = 'https://etherscan.io/token/' + contract + '?a=' + tokenId;
*/
	res.send('/: in users.js: GET with inputurl=' + input);
});

router.get('/users', function(req, res, next) {
	var input = req.query.inputurl;
	res.send('/users: GET with inputurl=' + input);
});

module.exports = router;

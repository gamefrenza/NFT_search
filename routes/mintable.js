var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	var contract = req.query.contract;
	var tokenId = req.query.tokenid;
	var etherscanURL = 'https://etherscan.io/token/' + contract + '?a=' + tokenId;
	//res.send('/: in mintable.js: GET with contract=' + contract + '; tokenid=' + tokenId + '; Etherscan URL=' + etherscanURL);
	console.log('LOG: Etherscan URL = ' + etherscanURL);
	res.redirect(etherscanURL);
});

module.exports = router;

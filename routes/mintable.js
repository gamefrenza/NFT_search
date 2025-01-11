var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	const contract = req.query.contract;
	const tokenId = req.query.tokenid;
	
	// Validate contract address format
	if (!/^0x[a-fA-F0-9]{40}$/.test(contract)) {
		return res.render('result', {
			title: 'Error',
			varContent: 'Invalid contract address format'
		});
	}
	
	// Validate token ID format
	if (!/^\d+$/.test(tokenId)) {
		return res.render('result', {
			title: 'Error',
			varContent: 'Invalid token ID format'
		});
	}

	const etherscanURL = `https://etherscan.io/token/${contract}?a=${tokenId}`;
	res.redirect(etherscanURL);
});

module.exports = router;

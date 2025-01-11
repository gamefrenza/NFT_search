var express = require('express');
var router = express.Router();
const { URL } = require('url');

// Add URL validation helper
function isValidUrl(string) {
	try {
		new URL(string);
		return true;
	} catch (_) {
		return false;
	}
}

router.get('/', function(req, res, next) {
	const input = req.query.inputurl;
	
	if (!input || !isValidUrl(input)) {
		return res.render('result', { 
			title: 'NFT Simple Search: Error', 
			varContent: 'Please provide a valid URL'
		});
	}

	// Sanitize and validate input URL
	try {
		const url = new URL(input.trim().toLowerCase());
		// Only allow specific domains
		const allowedDomains = ['opensea.io', 'rarible.com', 'superrare.co', 'zora.co', 'mintable.app'];
		if (!allowedDomains.some(domain => url.hostname.endsWith(domain))) {
			throw new Error('Domain not supported');
		}
		// Continue with sanitizedInput = url.toString()
		// ...
	} catch (error) {
		return res.render('result', {
			title: 'NFT Simple Search: Error',
			varContent: 'Invalid or unsupported URL'
		});
	}

	var varContent = '';
	var contract = '';
	var tokenId = '';
	var tmp = null;
	var tmp1 = null;
	var urlEtherscan = 'https://etherscan.io/token/<contract>?a=<token Id>';
	console.log('LOG: Input URL = ' +sanitizedInput);
	
	if(sanitizedInput.includes('mintable.app')){
		varContent = 'Mintable has all blockchain information on the web page.';
		//res.render('result', { title: 'NFT Simple Search: Result', varContent: varContent});
		res.render('mintable', { title: 'NFT Simple Search: Mintable'});
		return;
	}
	
	if(sanitizedInput.includes('thehashmasks')){
		varContent = 'Hashmasks is not supported.';
		res.render('result', { title: 'NFT Simple Search: Result', varContent: varContent});
		return;
	}
	
	if(sanitizedInput.includes('zora')){
		console.log('LOG: URL is from zora.co');
		//Zora URL pattern: https://zora.co/<user id>/<token id>
		contract = '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7';
		tmp = sanitizedInput.split('zora.co/');
		tmp1 = tmp[1];
		tmp = tmp1.split('/');
		tokenId = tmp[1];
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else if(sanitizedInput.includes('opensea')){
		console.log('LOG: URL is from OpenSea');
		tmp = sanitizedInput.split('assets/');
		tmp1 = tmp[1];
		tmp = tmp1.split('/');
		contract = tmp[0];
		tokenId = tmp[1];
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else if(sanitizedInput.includes('rarible.com')){
		console.log('LOG: URL is from rarible.com');
		//Rarible URL pattern: https://rarible.com/token/<contract Id>:<token Id>
		tmp = sanitizedInput.split('token/');
		tmp1 = tmp[1];
		tmp = tmp1.split(':');
		contract = tmp[0];
		tokenId = tmp[1];
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else if(sanitizedInput.includes('superrare.co')){
		console.log('LOG: URL is from superrare.co');
		//SuperRare URL pattern: https://superrare.co/artwork-v2/<item name>-<token Id>
		tmp = sanitizedInput.split('-');
		var size = tmp.length;
		tokenId = tmp[size-1];
		contract = '0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0';
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else{
		varContent = 'This site is not supported.';
		res.render('result', { title: 'NFT Simple Search: Result', varContent: varContent});
		return;
	}
	
	urlEtherscan = 'https://etherscan.io/token/' + contract + '?a=' + tokenId;
	console.log('LOG: Etherscan URL = ' + urlEtherscan);
	res.redirect(urlEtherscan);
});

module.exports = router;

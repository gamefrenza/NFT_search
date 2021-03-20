var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	var input = req.query.inputurl;
	var varContent = '';
	var contract = '';
	var tokenId = '';
	var tmp = null;
	var tmp1 = null;
	var urlEtherscan = 'https://etherscan.io/token/<contract>?a=<token Id>';
	console.log('LOG: Input URL = ' +input);
	
	if(input.includes('mintable.app')){
		varContent = 'Mintable has all blockchain information on the web page.';
		res.render('result', { title: 'NFT Simple Search: Result', varContent: varContent});
		return;
	}
	
	if(input.includes('thehashmasks')){
		varContent = 'Hashmasks is not supported.';
		res.render('result', { title: 'NFT Simple Search: Result', varContent: varContent});
		return;
	}
	
	if(input.includes('zora')){
		console.log('LOG: URL is from zora.co');
		//Zora URL pattern: https://zora.co/<user id>/<token id>
		contract = '0xabefbc9fd2f806065b4f3c237d4b59d9a97bcac7';
		tmp = input.split('zora.co/');
		tmp1 = tmp[1];
		tmp = tmp1.split('/');
		tokenId = tmp[1];
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else if(input.includes('opensea')){
		console.log('LOG: URL is from OpenSea');
		tmp = input.split('assets/');
		tmp1 = tmp[1];
		tmp = tmp1.split('/');
		contract = tmp[0];
		tokenId = tmp[1];
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else if(input.includes('rarible.com')){
		console.log('LOG: URL is from rarible.com');
		//Rarible URL pattern: https://rarible.com/token/<contract Id>:<token Id>
		tmp = input.split('token/');
		tmp1 = tmp[1];
		tmp = tmp1.split(':');
		contract = tmp[0];
		tokenId = tmp[1];
		varContent = 'contract='+contract+';  tokenId='+tokenId;
		console.log('LOG: ' + varContent);
	}else if(input.includes('superrare.co')){
		console.log('LOG: URL is from superrare.co');
		//SuperRare URL pattern: https://superrare.co/artwork-v2/<item name>-<token Id>
		tmp = input.split('-');
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

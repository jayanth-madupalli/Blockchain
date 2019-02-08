var Web3 = require('web3');
var web3 = new Web3("http://127.0.0.1:7545");

var express = require('express');
var app = express();

app.get('/', function(req, res) {
    res.send(web3.eth.accounts.sign(web3.utils.soliditySha3({ t: 'string', v: req.query.aadh }, '|', { t: 'uint', v: req.query.cand }), "0x4fc33365c64665ed5285addae241c747b857bf952255e931080d615d65e021e6"));
});

app.listen(3507, 'localhost');




//console.log(web3.eth.accounts.sign("Hello!", "0x4fc33365c64665ed5285addae241c747b857bf952255e931080d615d65e021e6"));


/*{ message:
   '0xfef666cdf552cd13ece2e90e333a17011775038d7e8242197bf3aa606510c34c',
  messageHash:
   '0x0ea19c05e912b3275d89127212da387186b85b047e8cdfc11526c1063a5b042b',
  v: '0x1c',
  r:
   '0xdd5f0870f67ef8316307488631406a80f0f1d11a212fb748942738f974b100e0',
  s:
   '0x67607111beb847adaabe95fbb622e96e7587f46d067d64dd9d948cbf18efeb7b',
  signature:
   '0xdd5f0870f67ef8316307488631406a80f0f1d11a212fb748942738f974b100e067607111beb847adaabe95fbb622e96e7587f46d067d64dd9d948cbf18efeb7b1c' }

//console.log(web3.eth.accounts.sign('2347237498237947|', '4fc33365c64665ed5285addae241c747b857bf952255e931080d615d65e021e6'));
//console.log(web3.eth.abi.encodeParameters(['string', 'uint'], ['2347237498237947|', '22']));

console.log(web3.utils.soliditySha3({ t: 'string', v: '2347237498237947' }, '|', '22'));

app.verify('2347237498237947', '22', '0x0ea19c05e912b3275d89127212da387186b85b047e8cdfc11526c1063a5b042b', '0x1c', '0xdd5f0870f67ef8316307488631406a80f0f1d11a212fb748942738f974b100e0', '0x67607111beb847adaabe95fbb622e96e7587f46d067d64dd9d948cbf18efeb7b')

//Elections.deployed().then(function(instance){ app = instance }) */

//app.verify1("2347237498237947", '22', '0x0ea19c05e912b3275d89127212da387186b85b047e8cdfc11526c1063a5b042b', '0x1c', '0xdd5f0870f67ef8316307488631406a80f0f1d11a212fb748942738f974b100e0', '0x67607111beb847adaabe95fbb622e96e7587f46d067d64dd9d948cbf18efeb7b')
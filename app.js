const express = require('express');
const app = express();
const bitcoin = require('bitcoinjs-lib');

let testnet = bitcoin.networks.testnet;
let keypair = bitcoin.ECPair.makeRandom({network:testnet});
let addr = keypair.getAddress();
let pk = keypair.toWIF();
console.log(addr, pk)
// mpkDafecHVYKwUeCuyVw8vdhyfu9c9vLEi
// cPg6Ru6Cn77tVF4Tz2NuujX5FQLRE7dhyMrUWWra2ec1zL6K5nFP
let txb = new bitcoin.TransactionBuilder(testnet);
let txid = "ddd547eb5396b9e0223390f2ef0128720001ee5be4be7ccf73c322b719f7eefb";
let outn = 0;

//input
txb.addInput(txid, outn);
//output
txb.addOutput("2N5r2UivFggDbAGxuJAbYVqa9m1dWfJFEXa", 64000000);
txb.addOutput("2NA3HgSX3YR451ph8rB8PocKaVPjdUkHbjV", 20000);

let WIF = "cPg6Ru6Cn77tVF4Tz2NuujX5FQLRE7dhyMrUWWra2ec1zL6K5nFP"
let keypairSpend = bitcoin.ECPair.fromWIF(WIF, testnet);
txb.sign(0, keypairSpend);

let tx = txb.build();
let txhex = tx.toHex();
console.log(txhex)

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('home');
})

app.listen(3000, function(req, res) {
	console.log('Bitcoin is running')
})
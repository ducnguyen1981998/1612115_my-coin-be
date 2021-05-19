const express = require('express');
var secureRandom = require('secure-random');
const bip39 = require('bip39');
const { hdkey } = require('ethereumjs-wallet');
var Wallet = require('ethereumjs-wallet');
var EthUtil = require('ethereumjs-util');
const MongoClient = require('mongodb').MongoClient;




//Router
const router = express.Router();


const Blockchain = require('./blockChain'); 
const { v1: uuid } = require('uuid');//for keys
const sha256 = require('sha256');//Hash

///////////////////////////////////////////////////////////////////////////////////////////////
/*  -Initialize blockchain first time & create a master user-  */
///////////////////////////////////////////////////////////////////////////////////////////////
//Create Master Acc
const backup = new Blockchain();

// const mnemonic = bip39.generateMnemonic();
// var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
// console.log("HdWallet: ", hdwallet);
// var path = "m/44'/60'/0'/0/0";    // Most commont path
// var wallet = hdwallet.derivePath(path).getWallet();
// console.log("Wallet: ", wallet);
// var address = "0x" + wallet.getAddress().toString("hex");
// console.log("adress: ", address);
// // const public_key = sha256(privateKey); //publicKey
// const master = backup.createNewTransaction(1000000, "system-reward", public_key);
// backup.chain[0].transactions.push(master);
// console.log(backup);

///////////////////////////////////////////////////////////////////////////
// Model
///////////////////////////////////////////////////////////////////////////
// const MnemonicModel = require('../Models/Mnemonic.js');


///////////////////////////////////////////////////////////////////////////////////////////////
/*  -Create a database named "invitationsDB" on first time-  */
///////////////////////////////////////////////////////////////////////////////////////////////
var url = "mongodb://localhost:27017/invitationsDB";
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db("invitationsDB");
    dbo.collection("users").find().toArray(function (err, result) {//check if user collection already exist
        if (err) throw err;
        if (result.length !== 0)
            console.log('Collection already exist');
        else {
            console.log("Database created!");
            dbo.createCollection("users", function (err, res) {
                if (err) throw err;
                console.log("Collection created!");

                let user = {//master user
                    key: public_key,
                    inv: 1000000,
                    availableInvitations: []
                };
                //init first user in db - the master.
                dbo.collection("users").insertOne(user, function (err, res) {
                    if (err) throw err;
                    console.log("master inserted");
                    // console.log(db.db("invitationsDB").listCollections());
                    db.close();
                });
            });
        }
    });
});


// Create mnemonic words
router.get('/mnemonic', async(req, res) => {
    var bytes = secureRandom(16) //return an Array of 16 bytes
    var entropy = bytes.map((b)=>{
        return ("00"+ b.toString(16)).slice(-2)
    }).join("");
    // Tao Mnemonic, address, publicKey, privKey
    const mnemonic = bip39.entropyToMnemonic(entropy);
    //Return Array
    const mnemonicArray = mnemonic.split(" "); 

    //Get HdWallet
    var hdwallet = hdkey.fromMasterSeed(bip39.mnemonicToSeedSync(mnemonic));
    var path = "m/44'/60'/0'/0/0"; // Most commont path

    var wallet = hdwallet.derivePath(path).getWallet();

    var address = "0x" + wallet.getAddress().toString("hex");
    console.log("adress: ", address);

    var PriKey = "0x" + wallet.getPrivateKeyString();
    console.log("PriKey: ", PriKey);
    var PublicKey = "0x" + wallet.getPublicKeyString();
    console.log("PublicKey: ", PublicKey);

    res.json({
        mnemonic : mnemonicArray,
        address: address,
        PriKey: PriKey,
        PublicKey: PublicKey
    });
});

router.post('/confirmRegister', async(req, res) => {
    let payload = req.body;
    // payload ={
    //      address
    //      privateKey
    //      publicKey
    //      mnemonicWords
    // }
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("invitationsDB");
        dbo.collection("account").find().toArray(function (err, result) {
            if (err) throw err;
            if (result.length !== 0)
            {
                let account = payload;
                dbo.collection("account").insertOne(account, function (err, res) {
                    if (err) throw err;
                    db.close();
                });
            }    
            else {
                dbo.createCollection("account", function (err, res) {
                    if (err) throw err;   
                    let account = payload;
                    dbo.collection("account").insertOne(account, function (err, res) {
                        if (err) throw err;
                        db.close();
                    });
                });
            }
        });
    });

    res.json({
        message: "Success"
    });
});

// Check mnemonic words with database
router.post('/loginMnemonic', async(req, res) => {
    let payload=req.body.Address;
    // let payload={
    //      Mnemonic,
    //      Address
    // };
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        let dbo = db.db("invitationsDB");
        dbo.collection("account").find({Address: payload}).toArray(function (err, result) {
            if (err) throw err;
            //
            if (result.length == 0)
            {
                res.json({
                    message: "Login Failed"
                })
            }
        }); 
    });
                    
    res.json({
        message: "Success",
    })
});



module.exports = router;
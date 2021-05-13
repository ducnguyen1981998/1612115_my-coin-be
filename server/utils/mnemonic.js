// # -------------------
// # 1. Generate Entropy 
// # -------------------

const express = require('express');
var secureRandom = require('secure-random');
const bip39 = require('bip39');

//Router
const router = express.Router();


router.get('/mnemonic', async(req, res) => {
    var bytes = secureRandom(16) //return an Array of 16 bytes
    var entropy = bytes.map((b)=>{
        return ("00"+ b.toString(16)).slice(-2)
    }).join("");
    // console.log(entropy);
    const mnemonic = bip39.entropyToMnemonic(entropy).split(" ");
    console.log(mnemonic);
    res.json({
        mnemonic : mnemonic
    });
});



module.exports = router;
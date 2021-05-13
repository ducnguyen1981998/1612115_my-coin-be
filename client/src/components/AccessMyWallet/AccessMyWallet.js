import React from 'react';
import '../../App.css';

const CreateWallet = () => {

    return (
    <div>
        {/* Intro for login */}
        <div className="d-flex flex-column justify-content-center align-items-center bt-">
            <h2> Get a New Wallet</h2>
            <p >Already have a wallet? <a href="">Access My Wallet</a></p>
        </div>

        <div class="row mt-5">
            <div class="btn-group w-100">
                <button type="button" class=" btn btn-secondary border w-100 p-3">New Wallet</button>
                <button type="button" class=" btn btn-secondary border w-100 p-3">By Keystore Key</button>
                <button type="button" class=" btn btn-secondary border w-100 p-3">By Mnemonic Phrase</button>
            </div> 
        </div>
    </div>
    );
}

export default CreateWallet;

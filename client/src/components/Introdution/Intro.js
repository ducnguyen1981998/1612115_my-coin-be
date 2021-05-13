import React from 'react';
import '../../App.css';
import bigspaceman from '../../img/big-spaceman.png';

const Intro = () => {
    return (
    <div>
        <div className="row d-flex justify-content-center mt-5">
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 d-flex flex-column justify-content-center">
                <h1 className="mb-2 p-0 font-weight-bolder text-info display-5">Ethereum's
                    Original Wallet
                </h1>
                <p className="text-secondary">MyEtherWallet (our friends call us MEW) is a free, client-side interface helping you interact with the Ethereum blockchain. Our easy-to-use, open-source platform allows you to generate wallets, interact with smart contracts, and so much more.</p>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <img src={bigspaceman} alt=""/>
            </div>
        </div>
        
        <div className="row d-flex justify-content-center mt-4">
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 bg-info d-flex flex-row mr-5 rounded">
                <img src={bigspaceman} alt="" className="col-lg-3 mt-auto mb-auto mr-2"/>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 p-3">
                    <h3>Create A New Wallet</h3>
                    <p> Generate your own unique Ethereum wallet. Receive 1 a public address (0x...) and choose a method for access and recovery.  </p>
                    <h5 className="mt-5">Get Started</h5>
                </div>
            </div>
            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5 bg-info d-flex flex-row rounded">
                <img src={bigspaceman} alt="" className="col-lg-3 mt-auto mb-auto mr-2"/>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9 p-3">
                    <h3>Access My Wallet</h3>
                    <p>Connect to the  blockchain using the wallet of your choice.</p>
                    <ul>
                        <li className="small">Send and Swap ETH & Tokens</li>
                        <li className="small">Sign & Verify Messages</li>
                        <li className="small">Interact with Contracts, ENS, Dapps, and more!</li>
                    </ul>
                    <h5>Get Started</h5>
                </div>
            </div>
        </div>        
    </div>
    );
}

export default Intro;

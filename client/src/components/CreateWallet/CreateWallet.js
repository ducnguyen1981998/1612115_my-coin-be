import React, { useState, useRef, useEffect } from 'react';
import '../../App.css';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import { json } from 'body-parser';



const CreateWallet = () => {
    const [data, setData] = useState({});
    const [mnemonicWords, setMnemonicWords] = useState([]);
    const [isToggleRandom, setIsToggleRandom] = useState(false);
    const [show, setShow] = useState(false);
    const [showNoti, setShowNoti] = useState(false);
    const [mnemonicWordsStr, setMnemonicWordsStr] = useState([]);
    const [verifyMnemonic, setVerifyMnemonic] = useState(false);
    //  Goi API tra ve mnemonic
    useEffect(() => {
        fetch('http://localhost:3001/api/login/mnemonic')
          .then(results => results.json())
          .then(data => {
            setData(data);
            setMnemonicWords(data.mnemonic)
            setIsToggleRandom(false)
            // console.log("useEffect", isToggleRandom);
          });
      }, [isToggleRandom]);

    // confirm Register
    useEffect(() => {
        if(verifyMnemonic){
        fetch('http://localhost:3001/api/login/confirmRegister',{
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({"address": data.address, "privateKey": data.PriKey, "publicKey": data.PublicKey, "mnemonicWords": data.mnemonic})
        })
          .then(results => results.json())
          .then(data => {
            // console.log("running")
            setMnemonicWords(data.mnemonic)
            setIsToggleRandom(false)
            // console.log("useEffect", isToggleRandom);
          });
        }
      }, [verifyMnemonic]);  
    

    const handleClose = () => setShow(false);
    const handleCloseNoti = () => setShowNoti(false);
    const handleShow = () => {
        setShow(true);
        let newArr = [1,1,1,1,1,1,1,1,1,1,1,1];
        mnemonicWords.map((word, index) => {
            if(word.includes("a"))
            {
                
            }
            else{
                console.log("index: ",index);
                console.log(mnemonicWordsStr.length);
                newArr[index] = word;
                setMnemonicWordsStr(newArr);
            }
        });

    }
    const handleVerify = () => {
        setVerifyMnemonic(JSON.stringify(mnemonicWords) == JSON.stringify(mnemonicWordsStr));
        setShow(false);
        setShowNoti(true);
        return verifyMnemonic;
    };
    const handleChange = (e, index) => {
        // setMnemonicWordsStr(mnemonicWordsStr + e.target.value);
        // console.log(e.target.value + index);
        const newArr = [...mnemonicWordsStr];
        newArr[index] = e.target.value;
        setMnemonicWordsStr(newArr);
        console.log(mnemonicWordsStr);
    }

    let getRandomMnemonicWords = (listWords) =>{
        listWords.map((word, index) => {
            return(
            // <li className="list-item col-3 border-bottom mx-3 py-2" >{word}</li>
            <p key={word}>{word}</p>
        )});
    }


    
    // Thay doi isToggleRandom de goi lai useEffect --> Call API
    const changeMnemonicWords = () =>{
        
        setIsToggleRandom(true)
        // console.log("changeMnemonicWords", isToggleRandom)
    }
    

    return (
    <div className="row justify-content-center text-center ">    
        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4 rounded">
            {/* Intro Register */}
            <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                <h2> Get a New Wallet</h2>
                <p >Already have a wallet? <a href="">Access My Wallet</a></p>
            </div>
            {/* Button group */}
            <div className="row mt-3">
                <div className="btn-group w-100">
                    <button type="button" className=" btn btn-secondary border w-100 p-3">New Wallet</button>
                    <button type="button" className=" btn btn-secondary border w-100 p-3">By Keystore Key</button>
                    <button type="button" className=" btn btn-secondary border w-100 p-3">By Mnemonic Phrase</button>
                </div> 
            </div>

            {/* <div class="row">
                <div class="w-100 bg-white">
                    <h5>Recommended Method</h5>
                    <h5>Download the MEW wallet app</h5>
                    <p>It’s simple, fast, and secure.</p>
                </div>
            </div> */}

            {/* By Keystore File */}
            {/* <div className="row d-flex flex-column pt-5 bg-white align-items-center">
                <h5 className="mb-5">Your Password</h5>
                <div className="form-group mb-5 w-100 d-flex justify-content-center">
                    <input type="text" className="form-control bg-light w-75" id="usr" placeholder="Please input at least 9 character" />
                </div>
                <button type="button" className="btn btn-secondary p-2 mb-5 w-50">
                    Next
                </button>
                <span>
                    <b className="text-danger text-uppercase">Do not forget </b> to save your password. You will need this <br/>
                    <span className="text-danger">Password + Keystore</span> File to unlock your wallet.
                </span>
            </div> */}

            {/* By Mnemonic Phrase */}

            <div className="row d-flex flex-column pt-5 bg-white align-items-center">
                    <h5 className="mb-5">Your Mnemonic Phrase</h5>
                    <div className="form-group mb-0 w-100 d-flex justify-content-between px-3">
                        <div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline1" name="customRadioInline1" className="custom-control-input"/>
                                <label className="custom-control-label" >12</label>
                            </div>
                            <div className="custom-control custom-radio custom-control-inline">
                                <input type="radio" id="customRadioInline2" name="customRadioInline1" className="custom-control-input"/>
                                <label className="custom-control-label" >24</label>
                            </div>
                        </div>
                        <button type="button" className="btn btn-outline-light text-success" onClick={changeMnemonicWords}>
                            Random
                        </button>
                    </div>
                    <div>
                        <ul className="list-unstyled row d-flex justify-content-around px-3">
                            { mnemonicWords &&
                            mnemonicWords.map((word,index) =>{
                                return(
                                <li className="list-item col-3 border-bottom mx-3 py-2" key={index}>{index+1}. {word}</li>
                                )
                            }) 
                            
                            }
                        </ul>
                    </div>
                    <button type="button" className="btn btn-secondary p-3 mb-5 w-75" data-toggle="modal" onClick={handleShow }>
                        I Wrote Down My Mnemonic Phrase
                    </button>

                    {/* MyMnemonic */}
                    <Modal show={show} onHide={handleClose} justify-content-center >
                        <Modal.Header closeButton>
                        <Modal.Title className="justify-content-center">Verification</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ul className="list-unstyled row d-flex justify-content-around px-5">
                                { 
                                    mnemonicWords &&
                                    mnemonicWords.map((word,index) =>{
                                        if(word.includes("a")){
                                            return(
                                                <input id={index} type="text" key={index} className="col-3 border-bottom mx-3" onChange={(e) => handleChange(e,index)} />
                                            )
                                        }
                                        else{
                                        {/* const newArr = [...mnemonicWordsStr];
                                            newArr[index] = word;
                                            setMnemonicWordsStr(newArr); */}
                                        return(
                                            <li id={index} className="list-item col-3 border-bottom mx-3" key={index}>{index+1}. {word}</li>
                                        )}
                                    }) 
                                
                                }
                            </ul>
                            <p></p>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleVerify}>
                            Verify
                        </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Notifacation */}
                    <Modal show={showNoti} onHide={handleCloseNoti} justify-content-center >
                        <Modal.Header closeButton>
                        <Modal.Title>{verifyMnemonic? "Success": "Error" }</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                             <h2>{verifyMnemonic? "You have created account success!": "Mnemonic doesn't match! Please write it down correctly!" }</h2>   
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseNoti} to="/login">
                            Go to Login 
                        </Button>
                        </Modal.Footer>
                    </Modal>


                    {/* End of register */}
                    <span>
                        <b className="text-danger text-uppercase">Do not forget </b> to save your password. You will need this <br/>
                        <span className="text-danger">Password + Keystore</span> File to unlock your wallet.
                    </span>
                </div>

        </div>
    </div>    
    );
}

export default CreateWallet;

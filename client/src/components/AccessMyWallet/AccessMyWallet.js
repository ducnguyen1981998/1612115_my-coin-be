import React, { useState, useRef, useEffect } from 'react';

// Css
import '../../App.css';

//Img
import key from '../../img/key.png';
import document from '../../img/document.png';
import code from '../../img/code.png';

// Bootstrap
import { Button, Modal } from 'react-bootstrap';

const AccessMyWallet = () => {

    const [mnemonicWords, setMnemonicWords] = useState([]);
    const [isToggleRandom, setIsToggleRandom] = useState(false);
    const [show, setShow] = useState(false);  

    // const mnemonicWords = 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let getMnemenicWordsFromClient = () =>{
        var indents = [];
        for(var i = 0; i<12; i++){
        
        indents.push(<input  type="text" 
                    class="form-control" 
                    placeholder={i+1}
                    key={i} 
                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 m-1"/>);   
        }
        return indents;
    }
    
    // Thay doi isToggleRandom de goi lai useEffect --> Call API
    const changeMnemonicWords = () =>{
        
        setIsToggleRandom(true)
        // console.log("changeMnemonicWords", isToggleRandom)
    }
    return (
    <div className="row justify-content-center text-center" style={{ backgroundColor: "#F9f9f9"}}>   
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            {/* Intro for login */}
            <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                <h2> Access My Wallet</h2>
                <p >Do not have a wallet? <a href="">Create A New Wallet</a></p>
            </div>

            <div class="row mt-5 d-flex flex-row justify-content-center align-items-center">
                <div class="btn-group col-xs-8 col-sm-8 col-md-8 col-lg-8">
                    <button type="button" class=" btn btn-success rounded w-100 px-3 py-5 mx-2">
                        <img src={code} />
                        <h3 class="mt-3">Keystore File</h3>
                    </button>
                    <button type="button" class=" btn btn-success rounded w-100 px-3 py-5 mx-2">
                        <img src={document} />
                        <h3 class="mt-3">Private Key</h3>
                    </button>
                    <button type="button" 
                            class=" btn btn-success rounded w-100 px-3 py-5 mx-2"
                            onClick={ handleShow }
                    >
                        <img src={key} />
                        <h3 class="mt-3">Mnemonic Words</h3>
                    </button>
                </div> 
            </div>

            {/* Hien thi khi click vao mnemonic words */}
            <Modal show={show} onHide={handleClose} centered>
                        <Modal.Header closeButton>
                        <Modal.Title>Access by Mnemonic Phrase</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h6 class="d-flex justify-content-center">Please type in your mnemonic phrase.</h6>
                            <ul className="list-unstyled row d-flex justify-content-around px-5">
                                { 
                                    mnemonicWords &&
                                    mnemonicWords.map((word,index) =>{
                                        return(
                                            <li className="list-item col-3 border-bottom mx-3 py-3 w-100" key={index}>{index+1}. {word}</li>
                                        )
                                    }) 

                                
                                }
                            </ul>
                            <div class="d-flex row justify-content-around">
                                {
                                    getMnemenicWordsFromClient()
                                }
                                {/* <input  type="text" 
                                        class="form-control" 
                                        placeholder="1" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="2" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="3" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="4" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="5" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="6" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="7" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="8" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="9" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="10" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="11" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/>
                                <input  type="text" 
                                        class="form-control" 
                                        placeholder="12" 
                                        class="col-xs-3 col-sm-3 col-md-3 col-lg-3 mx-1"/> */}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="success" onClick={handleClose} class="w-100">
                            Continue
                        </Button>
                        {/* <Button variant="primary" onClick={handleClose}>
                            Verify
                        </Button> */}
                        </Modal.Footer>
                    </Modal>

        </div>
    </div>
    );
}

export default AccessMyWallet;

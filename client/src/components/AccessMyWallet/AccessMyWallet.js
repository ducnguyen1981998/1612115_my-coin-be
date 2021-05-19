import React, { useState, useRef, useEffect } from 'react';

// Css
import '../../App.css';

//Img
import key from '../../img/key.png';
import document from '../../img/document.png';
import code from '../../img/code.png';

// Bootstrap
import { Button, Modal, Table } from 'react-bootstrap';

const AccessMyWallet = () => {
    const [data, setData] = useState({});
    const [message, setMessage] = useState("");
    const [address, setAddress] = useState([]);
    const [mnemonicWords, setMnemonicWords] = useState([]);
    const [mnemonicWordsStr, setMnemonicWordsStr] = useState([]);
    const [isToggleRandom, setIsToggleRandom] = useState(false);
    const [show, setShow] = useState(false);
    const [showNetWork, setshowNetWork] = useState(false);
    const [checkLogin, setCheckLogin] = useState(false);  
    const [selectedRow, setSelectedRow] = useState();
    

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

    //  Goi API tra ve mnemonic
    useEffect(() => {
        if(checkLogin){
            fetch('http://localhost:3001/api/login/loginMnemonic',{
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "mnemonicWords": mnemonicWordsStr
                })
            })
            .then(results => results.json())
            .then(data => {
            console.log("data: ", data);
            setMessage(data.message);
            setAddress(data.address);
            setCheckLogin(false);
            });
        }
        }, [checkLogin]); 
         

    // const mnemonicWords = 
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e, i) => {
        console.log(i)
        const newArr = [...mnemonicWordsStr];
        newArr[i] = e.target.value;
        setMnemonicWordsStr(newArr);
        console.log(mnemonicWordsStr);
    };
    const handleCheck = () => {
        setCheckLogin(true);
        setShow(false); //Close mnemonic
        setshowNetWork(true);
    }
    const handleShowNetWork = () => {
        setShow(false); //Close mnemonic
        setshowNetWork(true);
    }
    const handleCloseNetWork = () => {
        // setShow(false); //Close mnemonic
        setshowNetWork(false);
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
                                            <input  type="text" 
                                                    class="form-control" 
                                                    placeholder={index+1}
                                                    key={index} 
                                                    class="col-xs-3 col-sm-3 col-md-3 col-lg-3 m-1"
                                                    onChange={ (e) => {
                                                        handleChange(e, index)
                                                    }}    
                                                    />
                                        )
                                    }) 
                                }
                            </ul>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="success" onClick={handleCheck} class="w-100">
                            Continue
                        </Button>
                        {/* <Button variant="primary" onClick={handleClose}>
                            Verify
                        </Button> */}
                        </Modal.Footer>
                    </Modal>

                    {/* Hien thi address */}
                     <Modal show={showNetWork} onHide={handleCloseNetWork} centered size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title>Network And Address</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Address</th>
                                    <th>Balance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    address && address.map((address, idx) => {
                                        return(
                                        <tr key={idx} style={ selectedRow === idx ? {backgroundColor: "lightblue"}:{}} onClick={() =>{ setSelectedRow(idx) }}>
                                        <td>1</td>
                                        <td>{address}</td>
                                        <td>0.00</td>
                                        </tr>
                                        )
                                    })
                                }
                                </tbody>
                            </Table>
                        </Modal.Body>
                        <Modal.Footer>
                        <Button variant="success" onClick={handleCheck} class="w-100">
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

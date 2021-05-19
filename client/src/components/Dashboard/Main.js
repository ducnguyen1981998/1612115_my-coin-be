import React, { useState, useRef, useEffect } from 'react';

// Css
import '../../App.css';

//Img
import user from '../../img/user.png';
import wallet from '../../img/wallet.png';
import network from '../../img/network.png';
import scan from '../../img/scan.png';
import print from '../../img/print.png';
import copy from '../../img/copy.png';
import refresh from '../../img/refresh.png';
import more from '../../img/more.png';

// Bootstrap
import { InputGroup, FormControl, Button } from 'react-bootstrap';

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
    <div className="row text-center" style={{ backgroundColor: "#F9f9f9"}}>  
        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 bg-primary">

        </div> 
        <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
            <div class="row mt-2 d-flex w-100">
                <div class="btn-group col-xs-12 col-sm-12 col-md-12 col-lg-12 ">
                    <div class=" btn btn-success rounded w-100 px-1 py-4 mx-2 bg-secondary">
                        <div className="row">
                            <img src={user} className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{ width:"100px", height:"100px"}} />
                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                <h4 className="row">Address</h4>
                                <p className="row">0x0c1e5d154DF5F9089</p>
                                <div className="row">
                                <button>Switch</button>
                                <img src ={scan} style={{ width:"25px", height:"25px"}} className="mx-2"></img>
                                <img src ={print} style={{ width:"25px", height:"25px"}} className="mx-2"></img>
                                <img src ={copy} style={{ width:"25px", height:"25px"}} className="mx-2"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" btn btn-success rounded w-100 px-1 py-4 mx-2 bg-info">
                        <div className="row">
                            <img src={wallet} className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{ width:"100px", height:"100px"}} />
                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                <h4 className="row ml-1">Balance</h4>
                                <span className="row ml-1"><h3 className="mr-2">0</h3> ETH</span>
                                <div className="row ml-1">
                                <img src ={more} style={{ width:"25px", height:"25px"}} className="mx-2"></img>
                                <img src ={refresh} style={{ width:"25px", height:"25px"}} className="mx-2"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=" btn btn-success rounded w-100 px-1 py-4 mx-2 bg-success">
                        <div className="row">
                            <img src={network} className="col-xs-3 col-sm-3 col-md-3 col-lg-3" style={{ width:"100px", height:"100px"}} />
                            <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                                <h4 className="row">Network</h4>
                                <p className="row">Last block# : 12464980</p>
                                <div className="row">
                                <img src ={network} style={{ width:"25px", height:"25px"}} className="mx-2"></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div class="row mt-5 d-flex w-100">
                <div class="btn-group col-xs-12 col-sm-12 col-md-12 col-lg-12">
                    <div className="rounded w-100 px-1 py-4 mx-2 bg-warning">
                        <h4 className="row ml-3">Send Transaction</h4>
                        <div className="border"></div>
                        <InputGroup className="mt-3 mr-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Type</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="Type"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                            />
                        </InputGroup>
                        <InputGroup className="mt-3 mr-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon2">Amount</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="0"
                            aria-label="Username"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                        <InputGroup className="mt-3 mr-2">
                            <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon2">To Address</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl
                            placeholder="0x..."
                            aria-label="Username"
                            aria-describedby="basic-addon2"
                            />
                        </InputGroup>
                    </div>
                    <Button variant="outline-primary">Send Transaction</Button>
                </div>
            </div>  
        </div>
    </div>
    );
}

export default AccessMyWallet;

import React from 'react';
import '../../App.css';
import vn from '../../img/vn.png';
import logo from '../../img/logo.jpg';

const Header = () => {
    return (
        <div>
        <nav className="navbar navbar-expand-sm bg-light p-1 d-flex justify-content-around">
            <a className="navbar-brand" href="#">
                <img src={logo} className="logo rounded"></img>
            </a>
            <ul className="navbar-nav">
                <li className="nav-item mx-2">
                    <a className="nav-link" href="#">Buy ETH</a>
                </li>
                <li className="nav-item mx-2">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    Info
                    </a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">About</a>
                        <a className="dropdown-item" href="#">FAQs</a>
                    </div>
                </li>
                <li className="nav-item mx-2">
                    <a className="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                    <img src={vn} alt="HTML tutorial" className="iconflag rounded"></img>
                     English
                    </a>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">English</a>
                        <a className="dropdown-item" href="#">Vietnamese</a>
                    </div>
                </li>
            </ul>
        </nav>
    </div>
    );
}

export default Header;

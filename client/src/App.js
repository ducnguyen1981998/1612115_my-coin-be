import './App.css';
import Header from './components/SubComponents/Header';
import CreateWallet from './components/CreateWallet/CreateWallet';
import AccessMyWallet from './components/AccessMyWallet/AccessMyWallet';
import Intro from './components/Introdution/Intro';





function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Intro/> */}
      {/* <CreateWallet/> */}
      <AccessMyWallet/>
    </div>
  );
}

export default App;

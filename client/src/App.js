import './App.css';
import Header from './components/SubComponents/Header';
import CreateWallet from './components/CreateWallet/CreateWallet';
import Intro from './components/Introdution/Intro';




function App() {
  return (
    <div className="App">
      <Header/>
      {/* <Intro/> */}
      <CreateWallet/>
    </div>
  );
}

export default App;

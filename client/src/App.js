import React, { useEffect, useState } from "react";
import web3 from 'web3';
import './App.css';
import Migrationabi from './contracts/Migrations.json';
import { Navbar, Container } from 'react-bootstrap';

function App() {

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

  const [Currentaccount,setCurrentaccount] = useState("");

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new web3(window.ethereum);;
      await window.ethereum.enable();
    } else if(window.web3) {
      window.web3 = new web3(window.web3.currentProvider);
    }else{
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    };
  
  const loadBlockchainData = async ()=>{
    const web3 = window.web3;
  
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    setCurrentaccount(account);
  
    const networkId = await web3.eth.net.getId();
  
    const networkData = Migrationabi.networks[networkId];
  
    if(networkData){
      const migration = new web3.eth.Contract(Migrationabi.abi, networkData.address);
        console.log(migration);
    }
    else{
      window.alert("Error");
    }
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark">
    <Container>
      <h1 className="text-white">DAPP APLIKASI</h1>
    </Container>
  </Navbar>

  <h1 className="text-center">Hello World</h1>
  <h5 className="text-center">My Address Account : {Currentaccount}</h5>
    </div>
  );
}

export default App;

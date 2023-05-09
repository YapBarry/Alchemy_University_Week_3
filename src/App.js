import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

import LatestBlocks from './LatestBlocks';
import Home from './Home';
import NFT from './NFT';


import './App.css';

import Web3 from 'web3';

const web3 = new Web3();

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState(); 
  const [latestBlockNumber, setLatestBlockNumber] = useState();
  const [selectedItem, setSelectedItem] = useState(null);

  function handleItemClick(item) {

    const transaction = {
      ...item,
      gasLimit: item.gasLimit ? web3.utils.toBN(item.gasLimit).toString() : "undefined", 
      gasPrice: item.gasPrice ? web3.utils.toBN(item.gasPrice).toString()/(10**9) : "undefined",
      maxFeePerGas: item.maxFeePerGas? web3.utils.toBN(item.maxFeePerGas).toString()/(10**9) : "undefined",
      maxPriorityFeePerGas: item.maxPriorityFeePerGas? web3.utils.toBN(item.maxPriorityFeePerGas).toString() : "undefined",
      value: item.value? web3.utils.toBN(item.value).toString() : "undefined",
    };
    setSelectedItem(transaction);
  }

  function changeNewBlock(block) {
    setLatestBlockNumber(block);
  }

  useEffect(() => {
    async function getBlockNumber() {
      try {
        const blockNumber = await alchemy.core.getBlockNumber();
        setBlockNumber(blockNumber);
      } catch (error) {
        console.error("Error getting block number:", error);
      }
    }
    const interval = setInterval(() => {
      getBlockNumber();
    }, 10000);
    return () => clearInterval(interval);

  },[]);

  return (
    <Router>
      <nav>
      <Link to="/">
          <h2>Home</h2>
        </Link> 
        <Link to="/latest-blocks">
          <h2>Latest Blocks</h2>
        </Link>  
        <Link to="/NFT">
          <h2>NFT</h2>
        </Link>  
      </nav>
      <Routes>
        <Route path="/" element={<Home handleItemClick={handleItemClick} blockNumber={blockNumber} latestBlockNumber={latestBlockNumber} selectedItem={selectedItem} changeNewBlock={changeNewBlock}/>} />
        <Route path="/latest-blocks" element={<LatestBlocks />} />
        <Route path="/NFT" element={<NFT />} />
      </Routes>
    </Router>
  );
}

export default App;

// TODO: Make an accounts page where a user can look up their balance or someone else's balance (right column 4th)
// TODO: Given a contract address and token id, can you get the NFT's metadata?
// TODO: Did a pending transaction get mined?
// TODO: What transfers did an address receive this year
// TODO: Learn all the flex, useState value, key value etc
// Good guide: https://medium.com/@simply_stef/building-a-multi-page-website-with-react-99111ba69a68

// import React, { useState } from 'react';
// import { fetchLatestBlocks, fetchBlockDetails } from './utils.js';

// // TODO: work on the functionality here next

// function LatestBlocks() {
//   const [blocks, setBlocks] = useState([]);
//   const [selectedBlock, setSelectedBlock] = useState([]);

//   async function handleFetchLatestBlocks() {
//     const latestBlocks = await fetchLatestBlocks();
//     setBlocks(latestBlocks);
//   }

//   return (
//     <div>
//       <h2>Latest Blocks</h2>
//       <ul>
//         {blocks.map((block) => (
//           <li key={block.number} onClick={() => fetchBlockDetails(block.number)}>{block.number}</li>
//         ))}
//       </ul>
//       <button onClick={handleFetchLatestBlocks}>Fetch latest blocks</button>
//     </div>
//   );
// }

// export default LatestBlocks;

import React, { useState, useEffect } from 'react';
import { fetchLatestBlocks, fetchBlockDetails } from './utils.js';
import './LatestBlocks.css';

import Web3 from 'web3';
const web3 = new Web3();

function LatestBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState(null);

  async function handleFetchLatestBlocks() {
    const latestBlocks = await fetchLatestBlocks();
    setBlocks(latestBlocks);
  }

  useEffect(() => {
    handleFetchLatestBlocks();
  }, []);

  async function handleBlockClick(blockNumber) {
    let blockDetails = await fetchBlockDetails(blockNumber);
    console.log("blockDetails.difficulty is",blockDetails.difficulty)
    // Convert _bignumber values to regular JavaScript numbers
    blockDetails = {
      ...blockDetails,
      baseFeePerGas: web3.utils.toBN(blockDetails.baseFeePerGas._hex).toString(),
      gasLimit: web3.utils.toBN(blockDetails.gasLimit._hex).toString(),
      gasUsed: web3.utils.toBN(blockDetails.gasUsed._hex).toString(),
    };
    setSelectedBlock(blockDetails);
  }

  return (
    <div className="container2">
      <div className="left-column2">
        <h2>Latest Blocks</h2>
        {blocks.length ? (
          <ul>
            {blocks.map((block) => (
              <p key={block.number}>
                <a
                  href="#"
                  onClick={() => handleBlockClick(block.number)}
                  style={{ cursor: 'pointer' }}
                >
                  {block.number}
                </a>
              </p>
            ))}
          </ul>
        ) : (<p>Loading Latest Blocks...</p>)
        }
      </div>
      <div className="right-column2">
        {selectedBlock && (
        <div>
          <h2>Block Details:</h2>
          <p><b>Number: </b>{selectedBlock.number}</p>
          <p><b>Timestamp: </b>{selectedBlock.timestamp}</p>
          <p><b>Base Fee per gas: </b>{selectedBlock.baseFeePerGas}</p>
          <p><b>Difficulty: </b>{selectedBlock.difficulty}</p>
          <p><b>Extra Data: </b>{selectedBlock.extraData}</p>
          <p><b>Gas Limit: </b>{selectedBlock.gasLimit}</p>
          <p><b>Gas Used: </b>{selectedBlock.gasUsed}</p>
          <p><b>Hash: </b>{selectedBlock.hash}</p>
          <p><b>Miner: </b>{selectedBlock.miner}</p>
          <p><b>Hash: </b>{selectedBlock.nonce}</p>
          <p><b>Parent Hash: </b>{selectedBlock.parentHash}</p>
          <p><b>Timestamp: </b>{selectedBlock.timestamp}</p>
          <p><b>Difficulty: </b>{selectedBlock.difficulty}</p>
          <div>
            <p><b>Transactions:</b></p>
              {selectedBlock.transactions.map((transaction) => (
                <p>{transaction}</p>
              ))}
          </div>
        </div>

  
        )}
      </div>

    


    </div>
  );
}

export default LatestBlocks;

  

import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


function TotalTransactionCount(blockNumber) {
    const [transactionCount, setTransactionCount] = useState();
    // console.log("1 - transaction count console log" ,blockNumber);

    useEffect(() => {
    //   console.log("2 -transaction count consolelog" ,blockNumber);
      async function getTransactionCount() {
        const blockData = await alchemy.core.getBlockWithTransactions(blockNumber.blockNumber);
        setTransactionCount(blockData.transactions.length);
      }
  
      getTransactionCount();
    },[blockNumber]);

    return (<div className="TotalTransactionCount">Total Transaction Count This Block: {transactionCount} transactions</div>)

}

export default TotalTransactionCount;
import React, { useState, useEffect } from "react";
import { Alchemy, Network } from 'alchemy-sdk';

// Configures the Alchemy SDK
const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);
console.log("Test1");
function Transaction(props) {
    const [transactions, setTransactions] = useState([]); // TODO: Find out how adding initial state works to prevent error
    const [selectedTransaction, setSelectedTransaction] = useState(null); // TODO: Why cannot be "" instead of null?

    // const getAllTransactions = async () => {
    //     let response = await alchemy.core.getBlockWithTransactions(parseInt(blockNumber.blockNumber)).then(block => {
    //         const transactions2 = block.transactions;
    //         console.log("inside then loop",transactions2);
    //         setTransactions(transactions2);
    //     }).catch(err => console.error(err));
        
    // }
    // getAllTransactions();

    // TODO: FIND OUT HOW THIS IS BETTER THAN THE PREVIOUS ONE ABOVE
    useEffect(() => {
        const getAllTransactions = async () => {
          try {
            const block = await alchemy.core.getBlockWithTransactions(parseInt(props.blockNumber));
            const transactions2 = block.transactions;
            setTransactions(transactions2);
          } catch (error) {
            console.error(error);
          }
        };
        getAllTransactions();

    }, [props.blockNumber]);

    function handleItemClick(item) {
        props.onItemClick(item);
    }
    
    return (
        <div>
            <h1>Transactions in block {props.blockNumber}</h1>
            {transactions.map(transaction => (
            <div key={transaction.hash} onClick={() => handleItemClick(transaction)}>
                <p><b>Hash: </b>{transaction.hash}</p>
                <hr />
            </div>
            ))}

        </div>
    );
}
    
export default Transaction;
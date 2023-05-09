import React, { useState } from "react";
import { Alchemy, Network } from 'alchemy-sdk';


// Configures the Alchemy SDK
const config = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY, // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);


function TransactionsInBlock(props) {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState("");
    const [blockInfo,setBlockInfo] = useState("");

    const getBlockInfo = async () => {
        // Work on this later
        //Assign the hash to a variable
        let txHash = inputValue;

        //Response would return the block for provided hash
        let response = await alchemy.core.getBlockWithTransactions(parseInt(txHash));

        //Logging the response to the console
        setBlockInfo(response.transactions);
    };


    function handleInputChange(event) {
        setInputValue(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        // process the input value and set the result
        setResult(`You entered: ${inputValue}`);
        props.changeNewBlock(inputValue);
        getBlockInfo();
        setInputValue(""); // Clear the input field
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label> 
                <input type="text" placeholder="Enter an Ethereum block number" value={inputValue} onChange={handleInputChange} style={{ width: "100%" }}/>
            </label>
            <button type="submit">Submit</button>
            </form>
            {result && <div>{result}</div>}
        </div>
    );
}

export default TransactionsInBlock;
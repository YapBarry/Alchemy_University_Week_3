// TODO: Need to convert gas units properly - check what getBlockWithTransaction returns..
import React, { useState } from "react";


function DisplaySelected(props) {

  const selectedItem = props.selectedItem;

  return (
    <div>
      {selectedItem && (
        <div>
          <h1>Selected Transaction Details</h1>
          <p>Transaction Index: {selectedItem.transactionIndex}</p>
          <p>To: {selectedItem.to}</p>
          <p>From: {selectedItem.from}</p>
          <p>Value: {selectedItem.value}</p>
          <p>Gas Limit: {selectedItem.gasLimit}</p>
          <p>Gas Price: {selectedItem.gasPrice} gwei</p>
          <p>Max Priority Fee Per Gas: {selectedItem.maxPriorityFeePerGas} gwei</p>
          <p>Transaction Hash: {selectedItem.hash}</p>
          <p>Max Fee Per Gas: {selectedItem.maxFeePerGas}</p>
          <p>Nonce: {selectedItem.nonce}</p>          
        </div>
      )}
    </div>
  );
}

export default DisplaySelected;


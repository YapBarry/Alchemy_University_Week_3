import React, { useState } from "react";

import Transaction from './Transaction.js';
import TransactionsInBlock from './TransactionsInBlock.js';
import CurrentBlockInfo from './CurrentBlockInfo.js';
import DisplaySelected from './DisplaySelected.js';

import './Home.css'; // import the CSS file


function Home(props) {
  console.log("props passed into home are", props)

  return (
    <div className="container">
      <div className="top-center">
        <TransactionsInBlock changeNewBlock={props.changeNewBlock}/>
      </div>
      <div className="bottom-row">
        <div className="bottom-left">
          Latest Block Number: {props.blockNumber} <br/>
          Searched Block Number: {props.latestBlockNumber}
          <Transaction blockNumber={props.latestBlockNumber} onItemClick={props.handleItemClick}/>
        </div>
        <div className="bottom-right">
          <CurrentBlockInfo blockNumber={props.latestBlockNumber} />
          <DisplaySelected selectedItem={props.selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default Home;

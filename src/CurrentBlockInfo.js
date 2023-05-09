import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function CurrentBlockInfo(props) {
  console.log("props passed into CurrentBlockInfo are", props.blockNumber)
  const [blockData, setBlockData] = useState(null);

  async function fetchBlockData() {
    const data = await alchemy.core.getBlock(parseInt(props.blockNumber));

    setBlockData(data);
  }

  useEffect(() => {
    fetchBlockData();
  }, [props.blockNumber]);

  if (!blockData) {
    return <div>Loading block data...</div>;
  }

  return (
    <div>
        <h1><b>Information for block {props.blockNumber}</b></h1>        
        {Object.entries(blockData).map(([key, value]) => (
          <p key={key} style={{ textAlign: 'left' }}> 
            <b>{key}</b>: {value.toString()}
          </p>
        ))}
        
    </div>
  );
}

export default CurrentBlockInfo;

import { Alchemy, Network } from 'alchemy-sdk';

// Configures the Alchemy SDK
const config = {
    apiKey: "alchemy-replit", // Replace with your API key
    network: Network.ETH_MAINNET, // Replace with your network
};

// Creates an Alchemy object instance with the config to use for making requests
const alchemy = new Alchemy(config);

async function fetchLatestBlockNumber() {
  const blockNumber = await alchemy.core.getBlockNumber();
  return blockNumber;
}

async function fetchLatestBlocks() {
  const latestBlockNumber = await alchemy.core.getBlockNumber();
  const latestBlocks = [];

  for (let i = 0; i < 20; i++) {
    const block = await alchemy.core.getBlock(latestBlockNumber - i);
    latestBlocks.push(block);
  }

  return latestBlocks;
}

async function fetchBlockDetails(blockNumber) {
  const response = await alchemy.core.getBlock(blockNumber);
  // console.log("Block details response:", response);
  return response;
}

async function getNFTFloor(props) {
    // define the contract address
    console.log("props is", props)
    const address = props;

    //Call the method to return the refresh result response object
    const response = await alchemy.nft.getFloorPrice(address)

    //Logging the response to the console
    console.log("response is",response)
    return {
      floorPrice: response.openSea.floorPrice,
      collectionUrl: response.openSea.collectionUrl
    }
}

export { fetchLatestBlockNumber, fetchLatestBlocks, fetchBlockDetails, getNFTFloor };

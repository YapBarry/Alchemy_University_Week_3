import React, { useState, useEffect, useRef } from "react";
import { getNFTFloor } from "./utils.js";


function NFT() {
    const [inputValue, setInputValue] = useState("");
    const [result, setResult] = useState(null);
    const [floorPrice, setFloorPrice] = useState(null);
    const [collectionUrl, setCollectionUrl] = useState(null);
    const [formattedCollectionName, setFormattedCollectionName] = useState(null);
    const abortControllerRef = useRef(null);
  
    useEffect(() => {
      return () => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      };
    }, []);
  
    async function fetchData() {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;
  
      try {
        const response = await getNFTFloor(inputValue, abortController.signal);
  
        if (!abortController.signal.aborted) {
          setFloorPrice(response.floorPrice);
          setCollectionUrl(response.collectionUrl);
        }
      } catch (error) {
        console.error(error);
      } finally {
        abortControllerRef.current = null;
      }
    }
  
    useEffect(() => {
      if (collectionUrl) {
        const url = new URL(collectionUrl);
        const collectionName = url.pathname.split("/").pop();
        const formattedCollectionName = collectionName.replace(/-/g, " ").toUpperCase();
        setFormattedCollectionName(formattedCollectionName);
      }
    }, [collectionUrl]);
  
    function handleInputChange(event) {
      setInputValue(event.target.value);
    }
  
    function handleSubmit(event) {
      event.preventDefault();
      // process the input value and set the result
      setResult(`Contract address that you entered: ${inputValue}`);
      fetchData();
      setInputValue(""); // Clear the input field
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            NFT Collection Floor Price Tracker:
            <input
              type="text"
              placeholder="Please input an NFT contract address"
              value={inputValue}
              onChange={handleInputChange}
              style={{ width: "100%" }}
            />
          </label>
          <button type="submit">Get Floor Price</button>
        </form>
        {result && <div>{result}</div>}
        {floorPrice && formattedCollectionName && (
          <div>
            Current Floor Price of {formattedCollectionName} on OpenSea is {floorPrice} Eth
          </div>
        )}
      </div>
    );
}
  

export default NFT;

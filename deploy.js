import getWeb3 from "./getWeb3";
import contractAbi from "./contractABI.js";

const myContract = async () => {
  try {
    const web3 = await getWeb3(); // Assuming getWeb3 is an async function

    // Request account access if needed
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const accounts = await web3.eth.getAccounts();
    const defaultAccount = accounts[0];

    // Replace with the actual contract address
    const contractAddress = '0xYourContractAddress';

    // Create a contract instance
    const contractInstance = new web3.eth.Contract(contractAbi, defaultAccount);
    contractInstance.handleRevert = true;

    return contractInstance; // Return instance if needed
  } catch (error) {
    console.error("Failed to initialize Web3", error);
    throw error;
  }
};

export default myContract;

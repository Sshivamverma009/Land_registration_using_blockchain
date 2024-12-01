import Web3 from "web3";
import dotenv from "dotenv";
dotenv.config();

const getWeb3 = async () => {
  try {
    if (typeof window !== "undefined" && window.ethereum) {
      // Browser environment with MetaMask
      const web3 = new Web3(window.ethereum);
      await window.ethereum.request({ method: "eth_requestAccounts" });
      console.log("MetaMask enabled and accounts accessed");
      return web3;
    } else if (typeof window !== "undefined" && window.web3) {
      // Fallback for older dApps with injected web3
      const web3 = new Web3(window.web3.currentProvider);
      console.log("Injected web3 detected.");
      return web3;
    } else {
      // Server-side or no MetaMask/web3 detected, use HTTP provider
      const rpcServer = import.meta.env.VITE_RPC_SERVER;
      if (!rpcServer) {
        throw new Error("VITE_RPC_SERVER is not defined in the environment variables.");
      }
      const provider = new Web3.providers.HttpProvider(rpcServer);
      const web3 = new Web3(provider);
      console.log("No web3 instance injected, using Local web3.");
      return web3;
    }
  } catch (error) {
    console.error("Failed to initialize Web3:", error);
    throw error; // Re-throw the error for further handling
  }
};

export default getWeb3;

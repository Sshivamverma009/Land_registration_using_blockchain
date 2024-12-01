const config = {
    rpcServer: String(import.meta.env.VITE_RPC_SERVER),
    portNumber:String(import.meta.env.VITE_PORT_NUMBER),
    networkId:String(import.meta.env.VITE_NETWORK_ID),
    contractAddress:String(import.meta.env.VITE_CONTRACT_ADDRES),
    contractAbi:String(import.meta.env.VITE_CONTRACT_ABI)
}

export default config;
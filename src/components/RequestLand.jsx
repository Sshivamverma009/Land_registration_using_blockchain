import React from "react";
import web3Service from "../Web3/web3Service";
import Button from "./Button";

const requestland = async (_id, _seller) => {
    try {
        const response = await web3Service.sendLandRequest(_id, _seller);
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export default function RequestLand(){
    return(
        <div className="reqland">
            <Button className="font-bold px-3 py-2 w-32 bg-blue-500 text-white rounded-md hover:text-yellow-400 hover:shadow-xl" onClick={requestland}>Request Land</Button>
        </div>
    )
}
import React from "react";
import web3Service from "../Web3/web3Service";
import {useForm} from 'react-hook-form'
import Input from './Input'
import Button from "./Button";

const updateprice = async (data) => {
   try {
     const response = await web3Service
     .updateLandPrice(data);
     console.log(response);
     console.log("Land Price Updated Succussfully");
   } catch (error) {
    console.log(error);
   }
}

export default function UpdatePrice(){
    const { register, handleSubmit } = useForm();
    return(
        <div className="landreg">
            <form onSubmit={handleSubmit(updateprice)}>
                <Input label="Land ID: " type="text" placeholder="Enter Land ID" className="px-3 py-2 my-1 rounded" {...register( "_id")} />
                <Input label="Price: " type="number" placeholder="Enter Price of Land" className="px-3 py-2 my-1 rounded" {...register("_price")} />
                
                <Button type="submit" className="px-3 py-2 my-2 font-bold hover:bg-violet-800 hover:text-yellow-400 bg-violet-600 rounded-md text-white">Submit</Button>
            </form>
        </div>
    )
}
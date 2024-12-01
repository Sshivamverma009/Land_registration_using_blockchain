import React from "react";
import web3Service from "../Web3/web3Service";
import {useForm} from 'react-hook-form'
import Input from './Input'
import Button from "./Button";

const updateland = async (data) => {
   try {
     const response = await web3Service
     .updateLand(data);
     console.log(response);
     console.log("Land Updated Succussfully");
   } catch (error) {
    console.log(error);
   }
}

export default function UpdateLand(){
    const { register, handleSubmit } = useForm();
    return(
        <div className="landreg">
            <form onSubmit={handleSubmit(updateland)}>
                <Input label="Land ID: " type="text" placeholder="Enter Land ID" className="px-3 py-2 my-1 rounded" {...register( "_id")} />
                <Input label="Owner Address: " type="text" placeholder="Enter Owner Address" className="px-3 py-2 my-1 rounded" {...register( "_owner")} />
                <Input label="Area: " type="text" placeholder="Enter Area of Land" className="px-3 py-2 my-1 rounded" {...register("_area")} />
                <Input label="Address: " type="text" placeholder="Enter Local Address of Land" className="px-3 py-2 my-1 rounded" {...register("_location")} />
                <Input label="City: " type="text" placeholder="Enter City" className="px-3 py-2 my-1 rounded" {...register("_city")} />
                <Input label="State: " type="text" placeholder="Enter State" className="px-3 py-2 my-1 rounded" {...register("_state")} />
                <Input label="Price: " type="number" placeholder="Enter Price of Land" className="px-3 py-2 my-1 rounded" {...register("_price")} />
                <Input label="Property ID: " type="number" placeholder="Property ID" className="px-3 py-2 my-1 rounded"{...register("_pid")}  />
                <Input label="Physical Survey No:" type="number" placeholder="Physical Survey No" className="px-3 py-2 my-1 rounded"{...register("_phySurNo")}  />
                <Input label="Image: " type="text" placeholder="Upload Image" className="px-3 py-2 my-1 rounded" {...register("_image")} />
                <Input label="Document" type="text" placeholder="Upload Document" className="px-3 py-2 my-1 rounded" {...register("_document")} />
                <Button type="submit" className="px-3 py-2 my-2 font-bold hover:bg-violet-800 hover:text-yellow-400 bg-violet-600 rounded-md text-white">Submit</Button>
            </form>
        </div>
    )
}
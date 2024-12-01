import React from "react";
import web3Service from "../Web3/web3Service";
import { useForm } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";

const landregistration = async (data) => {
  try {
    const response = await web3Service.registerLand(data);
    console.log(response);
    console.log("Land registered successfully");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export default function LandReg() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(landregistration)}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Land Registration
        </h2>

        <div className="space-y-4">
          <Input
            label="Area: "
            type="text"
            placeholder="Enter Area of Land"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_area")}
          />
          <Input
            label="Address: "
            type="text"
            placeholder="Enter Local Address of Land"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_location")}
          />
          <Input
            label="City: "
            type="text"
            placeholder="Enter City"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_city")}
          />
          <Input
            label="State: "
            type="text"
            placeholder="Enter State"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_state")}
          />
          <Input
            label="Price: "
            type="number"
            placeholder="Enter Price of Land"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_price")}
          />
          <Input
            label="Property ID: "
            type="number"
            placeholder="Property ID"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_pid")}
          />
          <Input
            label="Physical Survey No:"
            type="number"
            placeholder="Physical Survey No"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_phySurNo")}
          />
          <Input
            label="Image: "
            type="text"
            placeholder="Upload Image"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_image")}
          />
          <Input
            label="Document: "
            type="text"
            placeholder="Upload Document"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_document")}
          />
        </div>

        <Button
          type="submit"
          className="w-full mt-4 px-4 py-2 bg-violet-600 text-white font-bold rounded-md hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

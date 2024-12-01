import React from "react";
import web3Service from "../Web3/web3Service";
import Input from "./Input";
import Button from "./Button";
import { useForm } from "react-hook-form";

const registeruser = async (data) => {
  try {
    const response = await web3Service.registerUser(data);
    console.log(response);
    console.log("User registered successfully");
  } catch (error) {
    console.log(error);
  }
};

export default function UserReg() {
  const { register, handleSubmit } = useForm();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit(registeruser)}
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register User
        </h2>

        <div className="space-y-4">
          <Input
            label="Name: "
            type="text"
            placeholder="Enter Your Name"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_name")}
          />
          <Input
            label="Age: "
            type="number"
            placeholder="Enter Your Age"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_age")}
          />
          <Input
            label="Email: "
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_email")}
          />
          <Input
            label="Address: "
            type="text"
            placeholder="Enter Your Local Address"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_location")}
          />
          <Input
            label="Mobile No.: "
            type="text"
            placeholder="Mobile No."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_mobileNo")}
          />
          <Input
            label="Aadhar No.: "
            type="text"
            placeholder="Aadhar No."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-violet-500 focus:outline-none"
            {...register("_aadharNo")}
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

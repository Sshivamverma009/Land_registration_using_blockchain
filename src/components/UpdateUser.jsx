import React from "react";
import web3Service from "../Web3/web3Service";
import { useForm } from "react-hook-form";
import Input from "./Input";

const updateuser = async (data) => {
  try {
    const response = await web3Service.updateUser(data);
    console.log(response);
    console.log("User Updated Successfully");
  } catch (error) {
    console.log(error);
  }
};

export default function UpdateUser() {
  const { register, handleSubmit } = useForm();
  return (
    <div className="updateuser">
      <form onSubmit={handleSubmit(updateuser)}>
        <Input
          label="Name: "
          type="text"
          placeholder="Enter Your Name"
          className="px-3 py-2 my-1 hover:bg-slate-50"
          {...register("_name")}
        />
        <Input
          label="Age: "
          type="number"
          placeholder="Enter Your Age"
          className="px-3 py-2 my-1 hover:bg-slate-50"
          {...register("_age")}
        />
        <Input
          label="Email: "
          type="text"
          placeholder="Enter Your Email"
          className="px-3 py-2 my-1 hover:bg-slate-50"
          {...register("_email")}
        />
        <Input
          label="Address: "
          type="text"
          placeholder="Enter Your Local Address"
          className="px-3 py-2 my-1 hover:bg-slate-50"
          {...register("_location")}
        />
        <Input
          label="Mobile No.: "
          type="text"
          placeholder="Mobile No."
          className="px-3 py-2 my-1 hover:bg-slate-50"
          {...register("_mobileNo")}
        />
        <Input
          label="Aadhar No.: "
          type="text"
          placeholder="Aadhar No."
          className="px-3 py-2 my-1 hover:bg-slate-50"
          {...register("_aadharNo")}
        />
        <Button
          type="submit"
          className="px-3 py-2 my-2 font-bold hover:bg-violet-800 hover:text-yellow-400 bg-violet-600 rounded-md text-white"
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

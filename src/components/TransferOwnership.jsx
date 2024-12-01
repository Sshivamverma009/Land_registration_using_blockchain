import React, { useEffect, useState } from "react";
import web3Service from "../Web3/web3Service";
import Button from "./Button"; // Uncommented
import Card from "./Card"

export default function TransferOwnership() {
  const [request, setRequest] = useState([]);

  const transfer = async (_newOwner, _landId) => {
    try {
      console.log("the function is called!");
      const response = await web3Service.transferwonership(_newOwner, _landId);
      if (response) {
        console.log("Transfer Land Successfully!", response);
        return response;
      } else {
        console.log("Something went wrong!");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await web3Service.getrequestList();
        if (response && response.length > 0) {
          // Resolve all promises from getRequestDetail
          const resolvedDetails = await Promise.all(
            response.map((id) => web3Service.getRequestDetail(id))
          );
  
          console.log("Resolved Request Details:", resolvedDetails);
          setRequest(resolvedDetails); // Set resolved request details in state
        } else {
          console.log("No Requests found!");
        }
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
  
    fetchRequests();
  }, []);
  

  return (
    <div className="comp">
      {request &&
        request.map(({ id, buyerId, landId }) => (
          <li key={id}>
            <Card {...request} />
            <Button
              onClick={() => {
                // console.log("id:",id);
                // console.log("landId: ",landId);
                // console.log("buyerId: ",buyerId);
                transfer(buyerId, landId);
                web3Service.removeRequest(id);
              }}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg text-white"
            >
              Transfer Ownership
            </Button>
          </li>
        ))}
    </div>
  );
}

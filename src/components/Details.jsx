import React, { useEffect, useState } from "react";
import web3Service from "../Web3/web3Service";
import Card from "./Card";

export default function Details({ _landId }) {
  const [landRequests, setLandRequests] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLandRequests = async () => {
      try {
        const response = await web3Service.getLandRequests(_landId);

        if (!response || !Array.isArray(response)) {
          console.log("Invalid response received from getLandRequests.");
          return;
        }

        if (response.length > 0) {
          const userDetails = await Promise.all(
            response.map(async (request) => {
              console.log(request.id);
              const details = await web3Service.getRequestDetail(request);
              return { ...request, ...details }; // Combine both data sources
            })
          );
          console.log("userDetails: ", userDetails);
          setLandRequests(userDetails);
        } else {
          console.log("No land requests found.");
        }
      } catch (err) {
        console.error("Error fetching land requests:", err);
        setError(err);
      }
    };

    fetchLandRequests();
  }, [_landId]);

  const approve = async (requestId) => {
    try {
      console.log(requestId);
  
      // Await the approval request
      await web3Service.approveLandRequest(requestId);
  
      // Once approved, add the request
      await web3Service.addApprovedRequest(requestId);
  
      console.log("Request Approved Successfully!");
    } catch (error) {
      console.log("Some Error Occurred: ", error);
      setError(error); // Optionally, set error state to show feedback to the user
    }
  };
  

  if (error) {
    return (
      <div className="error-message">
        Error: {error?.message || "An unexpected error occurred."}
      </div>
    );
  }

  return (
    <div>
      {landRequests.length > 0 ? (
        <ul className="land-requests">
          {landRequests.map((request, index) => (
            <li key={request.id || index} className="land-request-item">
              <Card
                id={request.id}
                {...request}
                approveRequest={() => approve(request.id)}
                className="max-w-80 contain-content"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No land requests found.</p>
      )}
    </div>
  );
}

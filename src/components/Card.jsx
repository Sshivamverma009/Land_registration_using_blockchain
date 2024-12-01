import React from "react";
import Button from "./Button";

export default function Card({
  id,
  image,
  price,
  address,
  owner,
  area,
  location,
  city,
  name,
  age,
  email,
  state,
  PID,
  physicalSurveyNo,
  isVerified,
  mobileNo,
  aadharNo,
  className = "",
  verifyland,
  sellerId,
  buyerId,
  verifyuser,
  requestland,
  isRequested,
  approveRequest,
  ...props
}) {
  return (
    <div
      className={`card min-w-[12rem] m-4 p-6 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ${className}`}
      {...props}
    >
      {image && (
        <img
          src={image || "defaultImage.png"}
          alt="Card image"
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />
      )}

      <div className="info">
        <ul className="list-none space-y-4 text-left font-semibold">
          {id && (
            <li className="text-lg">
              ID: <span className="font-bold">{id}</span>
            </li>
          )}
          {name && (
            <li className="text-lg">
              Name: <span className="font-bold">{name}</span>
            </li>
          )}
          {sellerId && (
            <li className="text-lg break-words">
              Seller ID: <span className="font-bold">{sellerId}</span>
            </li>
          )}
          {buyerId && (
            <li className="text-lg break-words">
              Buyer ID: <span className="font-bold">{buyerId}</span>
            </li>
          )}
          {age && (
            <li className="text-lg">
              Age: <span className="font-bold">{age}</span>
            </li>
          )}
          {email && (
            <li className="text-lg">
              Email: <span className="font-bold">{email}</span>
            </li>
          )}
          {price && (
            <li className="text-lg">
              Price: <span className="font-bold">${price}</span>
            </li>
          )}
          {address && (
            <li className="text-lg">
              Address: <span className="font-bold">{address}</span>
            </li>
          )}
          {owner && (
            <li className="text-lg break-words">
              Owner: <span className="font-bold">{owner}</span>
            </li>
          )}
          {area && (
            <li className="text-lg">
              Area: <span className="font-bold">{area} sq ft</span>
            </li>
          )}
          {location && (
            <li className="text-lg">
              Location: <span className="font-bold">{location}</span>
            </li>
          )}
          {city && (
            <li className="text-lg">
              City: <span className="font-bold">{city}</span>
            </li>
          )}
          {state && (
            <li className="text-lg">
              State: <span className="font-bold">{state}</span>
            </li>
          )}
          {PID && (
            <li className="text-lg">
              PID: <span className="font-bold">{PID}</span>
            </li>
          )}
          {physicalSurveyNo && (
            <li className="text-lg">
              Physical Survey No:{" "}
              <span className="font-bold">{physicalSurveyNo}</span>
            </li>
          )}
          {mobileNo && (
            <li className="text-lg">
              Mobile No: <span className="font-bold">{mobileNo}</span>
            </li>
          )}
          {isVerified !== undefined && (
            <li className="text-lg">
              Verified:{" "}
              <span className="font-bold">{isVerified ? "Yes" : "No"}</span>
            </li>
          )}
        </ul>

        {/* Action buttons */}
        <div className="mt-6 space-y-4">
          {verifyland && (
            <Button
              onClick={verifyland}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 hover:text-yellow-400 transition-colors duration-300 font-semibold cursor-pointer shadow-md"
            >
              Verify Land
            </Button>
          )}
          {verifyuser && (
            <Button
              onClick={verifyuser}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 hover:text-yellow-400 transition-colors duration-300 font-semibold cursor-pointer shadow-md"
            >
              Verify User
            </Button>
          )}
          {requestland && (
            <Button
              onClick={requestland}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 hover:text-yellow-400 transition-colors duration-300 font-semibold cursor-pointer shadow-md"
            >
              Request Land
            </Button>
          )}
          {isRequested && (
            <Button
              onClick={isRequested}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 hover:text-yellow-400 transition-colors duration-300 font-semibold cursor-pointer shadow-md"
            >
              Request List
            </Button>
          )}
          {approveRequest && (
            <Button
              onClick={approveRequest}
              className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 hover:text-yellow-400 transition-colors duration-300 font-semibold cursor-pointer shadow-md"
            >
              Approve
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

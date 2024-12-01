import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import web3Service from "../Web3/web3Service.js";

const verifyland = async (_id) => {
  try {
    const response = await web3Service.verifyLand(_id);
    console.log(response);
    return response;
    // console.log("this is function call from ID: ",_id);
  } catch (error) {
    console.log(error);
    console.log("something went wrong");
  }
};

export default function VerifyLand() {
  const [lands, setLands] = useState([]);
  useEffect(() => {
    // Define an async function inside useEffect
    (async () => {
      try {
        const response = await web3Service.getAllLands();

        if (response) {
          // Use Promise.all to resolve all promises returned by getLandDetail
          const Lands = await Promise.all(
            response.map((ad) => web3Service.getLandDetail(ad))
          );
          console.log(Lands);
          setLands(Lands);
        } else {
          console.log("No land Found!");
        }
      } catch (error) {
        console.log(error);
        console.log("Lands can't be fetched!");
      }
    })();
  }, []);

  return (
    <div className="home w-full bg-gradient-to-br from-yellow-100 to-pink-100 contain-content">
      {lands.filter((land) => !land.isVerified).length === 0 ? (
        <h1>No Lands to Verify</h1>
      ) : (
        <ul className="w-full grid grid-cols-3">
          {lands
            .filter((land) => !land.isVerified) // Filter unverified lands
            .map((land) => (
              <li key={land.id}>
                <Card
                  className=""
                  {...land}
                  verifyland={() => verifyland(land.id)} // Correctly pass the function
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

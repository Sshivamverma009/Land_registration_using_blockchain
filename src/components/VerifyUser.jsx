import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import web3Service from "../Web3/web3Service.js";

export default function VerifyUser() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Define an async function inside useEffect
    (async () => {
      try {
        const response = await web3Service.getAllUsers();

        if (response) {
          // Use Promise.all to resolve all promises returned by getLandDetail
          const Users = await Promise.all(
            response.map((ad) => web3Service.getUserDetail(ad))
          );
          console.log(Users);
          setUsers(Users);
        } else {
          console.log("No User Found!");
        }
      } catch (error) {
        console.log(error);
        console.log("Users can't be fetched!");
      }
    })();
  }, []);

  const verifyuser = async (_id) => {
    try {
      const add = await web3Service.getUserAddress(_id);
      const response = await web3Service.verifyUser(add);
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      console.log("something went wrong");
    }
  };

  return (
    <div className="home w-full bg-gradient-to-br from-yellow-100 to-pink-100 contain-content">
      {(users.filter((user) => !user.isVerified).length === 0) ? (
        <h1>No Users to Verify</h1>
      ) : (
        <ul className="w-full grid grid-cols-3">
          {users
            .filter((user) => !user.isVerified) // Filter unverified users
            .map((user) => (
              <li key={user.id}>
                <Card
                  {...user} // Spread user properties into the Card component
                  verifyuser={() => verifyuser(user.id)} // Pass verify function
                />
              </li>
            ))}
        </ul>
      )}
    </div>
  );
}

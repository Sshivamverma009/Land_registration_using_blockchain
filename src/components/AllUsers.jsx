import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";
import web3Service from "../Web3/web3Service.js";

export default function AllUsers() {
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

  return (
    <div className="home w-full bg-gradient-to-br from-yellow-100 to-pink-100 contain-content">
      <ul className="w-full grid grid-cols-3">
        {users &&
          users.map((user) => (
            <li key={user.id}>
              <Card {...user} />
            </li>
          ))}
      </ul>
    </div>
  );
}

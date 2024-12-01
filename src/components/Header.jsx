import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import web3Service from "../Web3/web3Service";
import Button from "./Button";

export default function Header() {
  const navigate = useNavigate();
  const [visibility, setVisibility] = useState(true); // Use state for reactivity

  const navitems = [
    {
      name: "Home",
      slug: "/",
      visible: true,
    },
    {
      name: "Register_User",
      slug: "/userRegister",
      visible: !visibility,
    },
    {
      name: "Add_Lands",
      slug: "/landRegister",
      visible: !visibility,
    },
    {
      name: "User",
      slug: "/user",
      visible: !visibility,
    },
    {
      name: "Admin",
      slug: "/admin",
      visible: visibility,
    },
  ];

  useEffect(() => {
    const checkLandInspector = async () => {
      try {
        const response = await web3Service.isLandIns(web3Service.defaultAccount); // Pass correct parameter
        setVisibility(response); // Update visibility state
      } catch (error) {
        console.log("Error checking land inspector status:", error);
      }
    };

    checkLandInspector(); // Call the async function
  }, [web3Service.defaultAccount]); // Ensure correct dependencies

  return (
    <div className="header container w-full top-0 my-3 mx-4 flex justify-between items-center max-h-[100px] bg-gradient-to-r from-purple-500 to-purple-700 text-white shadow-lg rounded-lg p-4">
      <div className="logo flex justify-center items-center font-extrabold cursor-pointer text-2xl tracking-wide hover:text-yellow-300 transition-colors duration-300">
        LOGO
      </div>
      <div className="tags flex items-center justify-end">
        <ul className="flex space-x-4">
          {navitems &&
            navitems.map(
              (item) =>
                item.visible && (
                  <li key={item.name}>
                    <Button
                      onClick={() => navigate(item.slug)}
                      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg"
                    >
                      {item.name}
                    </Button>
                  </li>
                )
            )}
        </ul>
      </div>
    </div>
  );
}

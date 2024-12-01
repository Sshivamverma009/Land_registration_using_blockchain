import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import web3Service from "../Web3/web3Service";
import Card from "../components/Card";
import Button from "../components/Button";
import Details from "../components/Details";

export default function UserPage() {
  const [userLands, setUserLands] = useState([]);
  const [requestStatuses, setRequestStatuses] = useState({}); // To store request statuses for each land
  const [showDetails, setShowDetails] = useState({}); // To track the "DETAIL" button visibility per land
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const account = web3Service.defaultAccount;
        console.log(account);

        // Check if the account is available
        if (account) {
          const response = await web3Service.UserLands(account);
          console.log(response);

          // If no lands were found, log message, else update the state
          if (response && response.length > 0) {
            const landArray = await Promise.all(
              response.map((_id) => web3Service.getLandDetail(_id))
            );
            setUserLands(landArray);

            // Fetch request statuses for all lands
            const statuses = {};
            for (const land of landArray) {
              statuses[land.id] = await web3Service.isRequested(land.id);
            }
            setRequestStatuses(statuses);
          } else {
            console.log("No land found for this user!");
          }
        } else {
          console.log("No account found!");
        }
      } catch (error) {
        console.log("Error fetching user lands:", error.message);
      }
    })();
  }, []);

  const handleShowDetails = (landId) => {
    // Toggle visibility for the selected land
    setShowDetails((prevState) => ({
      ...prevState,
      [landId]: !prevState[landId], // Toggle the value for the clicked land ID
    }));
  };

  return (
    <div className="userPage">
      <ul className="w-full grid grid-cols-3">
        {userLands &&
          userLands.map((land) => (
            <li key={land.id} className="bg-yellow-200 mx-1 items-center">
              <Card {...land} />
              {requestStatuses[land.id] && (
                <Button
                  type="button"
                  onClick={() => handleShowDetails(land.id)} // Toggle the details visibility
                  className="font-bold px-3 py-2 w-32 bg-blue-500 text-white rounded-md hover:text-yellow-400 hover:shadow-xl"
                >
                  DETAIL
                </Button>
              )}

              <div className="flex justify-center items-center mt-4 contain-content">
                {requestStatuses[land.id] ? (
                  showDetails[land.id] && <Details _landId={land.id} />
                ) : (
                  <h1 className="px-3 py-2 bg-fuchsia-500 rounded-md w-60 text-center">
                    NO REQUEST FOUND
                  </h1>
                )}
              </div>
            </li>
          ))}
      </ul>
      <div className="userdetails">
        <Card {...user} />
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

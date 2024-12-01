import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import Footer from "../components/Footer";
import web3Service from "../Web3/web3Service";
// import RequestLand from "../components/RequestLand";
// import Header from "../components/Header";
// import lands from '../../lands.json'
// import VerifyLandBtn from "../components/VerifyLandBtn";
// import VerifyUserBtn from "../components/verifyUserBtn";
// import UserReg from "../components/User_reg";
// import VerifyLand from "../components/VerifyLand/VerifyLand"
// import VerifyUser from "../components/verifyUser/verifyUser";
// import LandReg from "../components/Land_reg";

export default function Home() {
  const [lands, setLands] = useState([]);
  useEffect(() => {
    // Define an async function inside useEffect
    (async () => {
      try {
        const response = await web3Service.getAllLands();
        console.log(web3Service.defaultAccount);

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
      <nav className="w-full"></nav>

      <ul className="w-full grid grid-cols-3">
        {lands &&
          lands.map((land) => {
            if (land.Owner !== web3Service.defaultAccount) {
              return (
                <li key={land.id}>
                  <Card
                    {...land}
                    requestland={async () =>
                      await web3Service.sendLandRequest(land.id, land.owner)
                    }
                  />
                </li>
              );
            }
            return null; // If the condition doesn't match, return null to skip rendering the item
          })}
      </ul>

      {/* <UserReg/> */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
{
  /* <VerifyUserBtn /> */
}
{
  /* <VerifyLandBtn />  */
}
{
  /* <VerifyLand/> */
}
{
  /* <VerifyUser /> */
}

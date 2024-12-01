import React from "react";
import { useNavigate } from "react-router-dom";
import web3Service from "../Web3/web3Service";
import Button from "../components/Button";
import VerifyUser from "../components/VerifyUser";
import VerifyLand from "../components/VerifyLand";

import Footer from "../components/Footer";

export default function Admin() {
    const navigate = useNavigate();
  return (
    <div className="admin w-full min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100 flex flex-col justify-between">
  <div className="btn container mx-auto flex justify-center items-center mt-10 space-x-6">
    <Button
      onClick={() => navigate('/verifyuser')}
      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg text-white"
    >
      Verify User
    </Button>
    <Button
      onClick={() => navigate('/verifyland')}
      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg text-white"
    >
      Verify Land
    </Button>
    <Button
      onClick={() => navigate('/allLands')}
      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg text-white"
    >
      All Lands
    </Button>
    <Button
      onClick={() => navigate('/allUsers')}
      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg text-white"
    >
      All Users
    </Button>
    <Button
      onClick={() => navigate('/transferOwnership')}
      className="px-6 py-3 rounded-full bg-purple-600 hover:bg-purple-800 transition-colors duration-300 font-semibold cursor-pointer shadow-md hover:shadow-lg text-white"
    >
      Transfer Ownership
    </Button>
  </div>
  <footer className="mt-auto">
    <Footer />
  </footer>
</div>

  );
}

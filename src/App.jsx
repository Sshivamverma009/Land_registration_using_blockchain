import "./App.css";
import React, { useState } from "react";
import Home from "./pages/Home.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header.jsx";
import UserReg from "./components/User_reg.jsx";
import LandReg from "./components/Land_reg.jsx";
import Admin from "./pages/Admin.jsx";
import VerifyLand from "./components/VerifyLand.jsx";
import VerifyUser from "./components/VerifyUser.jsx";
import UserPage from "./pages/User.jsx";
import Details from "./components/Details.jsx";
import AllUsers from "./components/AllUsers.jsx";
import AllLands from "./components/AllLands.jsx";
import TransferOnwership from "./components/TransferOwnership.jsx";
import { SmartContractProvider } from "./context/contextAPI.jsx";

function App() {
  const [approvedRequests, setApprovedRequests] = useState([]);
  const addApprovedRequest = (id) => {
    setApprovedRequests((prev) => new Set(prev).add(id));
  };

  const removeAppovedRequest = (id) => {
    setApprovedRequests((prev) => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  return (
    <SmartContractProvider
      value={{ approvedRequests, addApprovedRequest, removeAppovedRequest }}
    >
      <div className="w-full bg-gradient-to-br from-yellow-100 to-pink-100 contain-content">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/userRegister" element={<UserReg />} />
            <Route path="/landRegister" element={<LandReg />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/verifyuser" element={<VerifyUser />} />
            <Route path="/verifyland" element={<VerifyLand />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/allUsers" element={<AllUsers />} />
            <Route path="/allLands" element={<AllLands />} />
            <Route path="/transferOwnership" element={<TransferOnwership />} />
          </Routes>
        </BrowserRouter>
      </div>
    </SmartContractProvider>
  );
}

export default App;

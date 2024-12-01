import { createContext, useContext } from "react";

const smartContract = createContext({
    approvedRequests: [],
    addApprovedRequest: () => {},
    removeAppovedRequest: () => {},
})

export const useApprovedList = () => {
    return useContext(smartContract);
}

export const SmartContractProvider = smartContract.Provider

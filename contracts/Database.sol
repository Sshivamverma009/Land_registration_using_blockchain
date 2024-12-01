// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Database {
    uint256[] public approvedRequestList; // Array of IDs
    mapping(uint256 => bool) private isRequestApproved; // Tracks existence
    mapping(uint256 => uint256) private idToIndex; // Tracks index for O(1) lookup

    address private owner;

    // Events for tracking state changes
    event RequestAdded(uint256 id);
    event RequestRemoved(uint256 id);

    // Modifier to restrict access to the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    // Constructor to set the deployer as the owner
    constructor() {
        owner = msg.sender;
    }

    // Get the total number of approved requests
    function getApprovedListCount() public view returns (uint256) {
        return approvedRequestList.length;
    }

    // Get a paginated list of approved requests
    function getApprovedList() public view returns (uint256[] memory) {
        return approvedRequestList;
    }

    // Add a request to the list
    function addRequest(uint256 id) public {
        if (!isRequestApproved[id]) {
            approvedRequestList.push(id);
            idToIndex[id] = approvedRequestList.length - 1; // Store index
            isRequestApproved[id] = true;
            emit RequestAdded(id);
        }
    }

    // Remove a request from the list
    function removeRequest(uint256 id) public onlyOwner {
        require(isRequestApproved[id], "ID does not exist");

        uint256 index = idToIndex[id]; // Get index of the ID
        uint256 lastIndex = approvedRequestList.length - 1;

        // Swap the element to be removed with the last element
        if (index != lastIndex) {
            uint256 lastId = approvedRequestList[lastIndex];
            approvedRequestList[index] = lastId; // Move last element to the removed spot
            idToIndex[lastId] = index; // Update index mapping
        }

        // Remove the last element
        approvedRequestList.pop();
        delete idToIndex[id]; // Remove index mapping
        isRequestApproved[id] = false; // Update existence mapping

        emit RequestRemoved(id);
    }
}

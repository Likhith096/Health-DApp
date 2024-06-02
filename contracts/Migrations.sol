// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract FileStorage {
    address public owner;
    string public storedFile;

    constructor() {
        owner = msg.sender;
    }

    modifier restricted() {
        require(msg.sender == owner, "This function is restricted to the contract's owner");
        _;
    }

    function sendFile(string memory _fileContent) public {
        storedFile = _fileContent;
    }

    function receiveFile() public view returns (string memory) {
        return storedFile;
    }
}

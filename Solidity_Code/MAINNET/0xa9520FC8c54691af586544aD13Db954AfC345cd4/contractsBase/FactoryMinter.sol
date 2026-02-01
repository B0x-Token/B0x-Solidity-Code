// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

interface IPOW {
    function mintTokensSameAddress(
        uint256[] memory nonce, 
        address[] memory extraFunds, 
        address mintTo, 
        uint maxAnswersInOneSubmit, 
        uint minBlockTimeDifferencePerSolve
    ) external payable returns (bool success);
    
    function TotalForContract(uint compensation, uint blocksToReadjustMENT) 
        external 
        view
        returns (
            uint B0xYouGet, 
            uint ETHYouGet, 
            uint ETHyouSpend
        );
}

contract MinterProxy {
    address[] public extraFundsStored;
    address public immutable userToSendFundsTo;
    address public constant PROOF_OF_WORK = 0xd44Ee7dAdbF50214cA7009a29D9F88BCcD0E9Ff4;
    address public userToGetWorksFrom;
    uint256 public maxSecondsPerSubmitStored = 300;
    uint256 public maxAnswersInOneSubmitStored = 1;


    address public whoISmsgsender;
    address public whoIStxOrigin;
    
    constructor(address admin) {
        userToSendFundsTo = admin;
        userToGetWorksFrom = admin;
    }



    // Add a new address to the array
    function update_maxAnswersInOneSubmitStored(uint maxAnswers) external {
        require(msg.sender == userToSendFundsTo,"MUST BE userToSendFundsTo");
        maxAnswersInOneSubmitStored = maxAnswers;
    }
    // Add a new address to the array
    function addExtraFund(address _fund) external {
        require(msg.sender == userToSendFundsTo,"MUST BE userToSendFundsTo");
        require(_fund != address(0), "Invalid address");
        extraFundsStored.push(_fund);
    }
    
    // Remove an address at a specific index
    function removeExtraFund(uint256 _index) external {
        require(msg.sender == userToSendFundsTo,"MUST BE userToSendFundsTo");
        require(_index < extraFundsStored.length, "Index out of bounds");
        
        // Move the last element to the deleted position and pop
        extraFundsStored[_index] = extraFundsStored[extraFundsStored.length - 1];
        extraFundsStored.pop();
    }
    
    // Update an address at a specific index
    function updateExtraFund(uint256 _index, address _newFund) external {
        require(msg.sender == userToSendFundsTo,"MUST BE userToSendFundsTo");
        require(_index < extraFundsStored.length, "Index out of bounds");
        require(_newFund != address(0), "Invalid address");
        extraFundsStored[_index] = _newFund;
    }
    
    // Get the total count of stored addresses
    function getExtraFundsCount() external view returns (uint256) {
        return extraFundsStored.length;
    }


    function changeUserToGetWorksFrom(address userUser)public returns (bool){
        require(msg.sender == userToSendFundsTo,"MUST BE userToSendFundsTo");
        userToGetWorksFrom = userUser;
        return true;
    }

    function changeUserToGetWorksFrom(uint amountOfSecondsBetweenMintsMIN)public returns (bool){
        require(msg.sender == userToSendFundsTo,"MUST BE userToSendFundsTo");
        maxSecondsPerSubmitStored = amountOfSecondsBetweenMintsMIN;
        return true;
    }
    
    function withdrawERC20(address token) external {
        require(msg.sender == userToSendFundsTo, "Unauthorized");
        uint256 balance = IERC20(token).balanceOf(address(this));
        require(IERC20(token).transfer(userToSendFundsTo, balance), "Transfer failed");
    }
    
    function withdrawETH() external {
        require(msg.sender == userToSendFundsTo, "Unauthorized");
        (bool success, ) = userToSendFundsTo.call{value: address(this).balance}("");
        require(success, "ETH transfer failed");
    }
    
    
    // Estimate required ETH for mining operation
    function estimateRequiredETH(uint maxAnswersInOneSubmit) 
        public 
        view 
        returns (uint requiredETH) 
    {
        // compensation is always maxAnswersInOneSubmit
        (, , uint ETHyouSpend) = IPOW(PROOF_OF_WORK).TotalForContract(maxAnswersInOneSubmit, 211);
        // Return 1.5x the estimated cost for safety buffer
        return (ETHyouSpend * 3) / 2;
    }
    
    // Main minting function - uses contract's ETH balance
    function mintB0xTokensSameAddress(
        uint256[] memory nonce, 
        address[] memory extraFunds, 
        address mintTo, 
        uint maxAnswersInOneSubmit, 
        uint minBlockTimeDifferencePerSolve
    ) external returns (bool success) {
        require(msg.sender == userToSendFundsTo || msg.sender == userToGetWorksFrom, "Unauthorized");
        if(maxAnswersInOneSubmitStored<maxAnswersInOneSubmit){
            maxAnswersInOneSubmit = maxAnswersInOneSubmitStored;
        }
        // Calculate required ETH (compensation = maxAnswersInOneSubmit)
        uint requiredETH = estimateRequiredETH(maxAnswersInOneSubmit);
        require(address(this).balance >= requiredETH, "Insufficient ETH in contract");
        
        // Call the POW contract with contract's ETH
        return IPOW(PROOF_OF_WORK).mintTokensSameAddress{value: requiredETH}(
            nonce, 
            extraFundsStored, 
            address(this), 
            maxAnswersInOneSubmit, 
            maxSecondsPerSubmitStored
        );
    }
    
    // Main minting function - uses contract's ETH balance
    function FindMsgSenderOfTx(
        uint256[] memory nonce, 
        address[] memory extraFunds, 
        address mintTo, 
        uint maxAnswersInOneSubmit, 
        uint minBlockTimeDifferencePerSolve
    ) external returns (bool success) {
            
        whoISmsgsender = msg.sender;
        whoIStxOrigin = tx.origin;

        return true;
    }
    
    receive() external payable {}
}

contract FactoryMinter {
    mapping(address => address) public userMinters;
    
    event MinterCreated(address indexed user, address indexed minter);
    
    function createNewFactoryMinter() external returns (address) {
        require(userMinters[msg.sender] == address(0), "Minter already exists");
        MinterProxy newMinter = new MinterProxy(msg.sender);
        userMinters[msg.sender] = address(newMinter);
        emit MinterCreated(msg.sender, address(newMinter));
        return address(newMinter);
    }
    
    function getMinter(address user) external view returns (address) {
        return userMinters[user];
    }
}

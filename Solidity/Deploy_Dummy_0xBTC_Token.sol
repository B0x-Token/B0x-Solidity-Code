// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/// @notice Main contract for Test0xBitcoin token
contract Test0xBTC {
    /// @notice Token name identifier
    string public name = "Test0xBitcoin";
    /// @notice Token symbol for trading/display purposes  
    string public symbol = "T0XBTC";
    /// @notice Number of decimal places for token precision
    uint8 public decimals = 8;
   // uint256 public totalSupply;
    /// @notice Mapping to track balance of each address
    mapping(address => uint256) public balanceOf;
    /// @notice Nested mapping for allowances (owner -> spender -> amount)
    mapping(address => mapping(address => uint256)) public allowance;
    /// @notice Event emitted when tokens are transferred
    event Transfer(address indexed from, address indexed to, uint256 value);
    /// @notice Event emitted when allowance is set/approved
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    /// @notice Constructor to initialize the contract with initial token supply
    constructor() {
        /// @notice Initial token supply calculation variable
        uint256 initialSupply = 11000000 * 10 ** uint256(decimals); // 21 million tokens
        balanceOf[msg.sender] = initialSupply;
      //  totalSupply = initialSupply;
        emit Transfer(address(0), msg.sender, initialSupply);
    }
    
    /// @notice Faucet function to distribute test tokens
    function getFaucetTokens_Testnet_0xBTC() public {
        /// @notice Amount of tokens to distribute from faucet
        uint sendz = 10* 10 ** decimals; //10 tokens
        balanceOf[msg.sender] += sendz;
      //  totalSupply += sendz;
        emit Transfer(address(0), msg.sender, sendz);
    }
    
    /// @notice Standard ERC20 transfer function for sending tokens
    /// @param to recipient address for the token transfer
    /// @param value amount of tokens to transfer
    /// @return bool returns true if transfer is successful
    function transfer(address to, uint256 value) public returns (bool) {
        require(balanceOf[msg.sender] >= value, "Insufficient balance");
        _transfer(msg.sender, to, value);
        return true;
    }
    
    /// @notice Standard ERC20 approve function for setting allowances
    /// @param spender address that will be allowed to spend tokens
    /// @param value amount of tokens that can be spent
    /// @return bool returns true if approval is successful
    function approve(address spender, uint256 value) public returns (bool) {
        allowance[msg.sender][spender] = value;
        emit Approval(msg.sender, spender, value);
        return true;
    }
    
    /// @notice Standard ERC20 transferFrom function for spending approved tokens
    /// @param from address to transfer tokens from
    /// @param to address to transfer tokens to
    /// @param value amount of tokens to transfer
    /// @return bool returns true if transfer is successful
    function transferFrom(address from, address to, uint256 value) public returns (bool) {
        require(balanceOf[from] >= value, "Insufficient balance");
        require(allowance[from][msg.sender] >= value, "Allowance exceeded");
        allowance[from][msg.sender] -= value;
        _transfer(from, to, value);
        return true;
    }
    
    /// @notice Internal helper function to handle token transfers
    /// @param from address to transfer tokens from
    /// @param to address to transfer tokens to
    /// @param value amount of tokens to transfer
    function _transfer(address from, address to, uint256 value) internal {
        require(to != address(0), "Transfer to zero address");
        balanceOf[from] -= value;
        balanceOf[to] += value;
        emit Transfer(from, to, value);
    }
}

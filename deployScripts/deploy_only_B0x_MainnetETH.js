
//DONT HAVE THIS IN RETAIL WE NEED TO BRIDGE

//DONT HAVE THIS BELOW THIS IN RETAIL WE NEED TO BRIDGE FIRST


 /* NEW: Transfer tokens to the contract
  console.log("\n--- Token Transfer Section ---");
  const transferAmount = "20328200000000000000000000"; // Your specified amount
  
  try {
    console.log(`Transferring ${transferAmount} tokens to contract...`);
    
    // Transfer tokens to the deployed contract address
    const transferTx = await token.transfer(tokenAddress, transferAmount, {
      gasPrice: doubledGasPrice
    });
    
    console.log(`Transfer transaction hash: ${transferTx.hash}`);
    console.log("Waiting for transfer transaction to be mined...");
    await transferTx.wait();
    
    // Check the contract's token balance
    const contractBalance = await token.balanceOf(tokenAddress);
    console.log(`Contract token balance: ${contractBalance.toString()}`);
    
  } catch (error) {
    console.error("Error during token transfer:", error.message);
  }




  */

const hre = require("hardhat");
// Define a sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {

  
  console.log("Deploying B0x_Mainnet contract...");
  
    // Get the deployer's address
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying with account: ${deployer.address}`);

  // Get current fee data using hre (Hardhat Runtime Environment)
  let gasPrice;
  try {
    // For Hardhat with ethers v6
    const feeData = await hre.ethers.provider.getFeeData();
    gasPrice = feeData.gasPrice;
  } catch (error) {
    try {
      // Fallback for Hardhat with ethers v5
      gasPrice = await hre.ethers.provider.getGasPrice();
    } catch (error) {
      console.log("Error getting gas price, using network default");
      // Let Hardhat use the default from config
      gasPrice = undefined;
    }
  }


  let doubledGasPrice;
if (gasPrice) {
  // Check if it's a BigNumber (ethers v5) or a BigInt (ethers v6)
  if (typeof gasPrice === 'bigint') {
    // It's a BigInt (ethers v6), use BigInt multiplication
    doubledGasPrice = gasPrice * 2n; // Note the 'n' suffix for BigInt literals
    console.log(`Using doubled gas price: ${doubledGasPrice}`);
  } else if (gasPrice.mul) {
    // It's a BigNumber (ethers v5), use the mul method
    doubledGasPrice = gasPrice.mul(2);
    console.log(`Using doubled gas price: ${doubledGasPrice.toString()}`);
  } else {
    // Fallback in case we can't determine the type
    console.log("Unknown gasPrice type, using original gas price");
    doubledGasPrice = gasPrice;
  }
}





    /*

    // Get contract factory
    console.log("Getting Test0xBTC online");
    const ZeroXBTC_TestNetContract = await hre.ethers.getContractFactory("Test0xBTC");
    
    // Deploy contract
    console.log("Deploying tokens HooKMiner...");
    const ZEROXBTC_TESTNETCONTRACT = await ZeroXBTC_TestNetContract.deploy( {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await ZEROXBTC_TESTNETCONTRACT.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const Address_ZEROXBTC_TESTNETCONTRACT = await ZEROXBTC_TESTNETCONTRACT.getAddress();
    console.log(`Test0xBTC deployed to: ${Address_ZEROXBTC_TESTNETCONTRACT}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network baseSepolia ${Address_ZEROXBTC_TESTNETCONTRACT} \n\n`);

    
*/

    
    // Get contract factory
    console.log("Getting contract factory...");
    const B0xToken = await hre.ethers.getContractFactory("B0x_Mainnet");
    

  // Set a reasonable gas limit for contract deployment
  const gasLimit = 5000000; // 5M gas should be more than enough for most contracts

    const token = await B0xToken.deploy({
  gasPrice: doubledGasPrice,

    gasLimit: gasLimit
});
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await token.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const tokenAddress = await token.getAddress();
    console.log(`Token deployed to: ${tokenAddress}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run: `);
    console.log(`npx hardhat verify --network ethereum ${tokenAddress}\n\n`);
    
var rightsTo0xBitcoinAddress;
try{
        // Call the getter function for the public immutable variable
        const rightsAddress = await token._RightsTo0xBitcoin_Address();
        
        console.log('_RightsTo0xBitcoin_Address:', rightsAddress);
        rightsTo0xBitcoinAddress= rightsAddress;
        
    } catch (error) {
        console.error('Error reading contract variable:', error);
        throw error;
    }

    console.log(`\nTo verify RightsTo0xBTC on Etherscan, run: `);
    console.log(`npx hardhat verify --network ethereum ${rightsTo0xBitcoinAddress} \n\n`);
    

    





console.log("?????VERIFICATION SCRIPT BELOW FOR MAINNET ETHEREUM!!!!!!");
    
console.log("?????VERIFICATION SCRIPT BELOW FOR MAINNET ETHEREUM!!!!!!");
    
console.log("?????VERIFICATION SCRIPT BELOW! FOR MAINNET ETHEREUM!!!!!");



    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);



    console.log(`Test B0xToken deployed to: ${tokenAddress}`);
    console.log(`npx hardhat verify --network ethereum ${tokenAddress} \n\n`);
    


    console.log(`\nTo verify RightsTo0xBTC on Etherscan, run: `);
        console.log('_RightsTo0xBitcoin_Address:', rightsTo0xBitcoinAddress);
    console.log(`npx hardhat verify --network ethereum ${rightsTo0xBitcoinAddress} \n\n`);


















  }
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
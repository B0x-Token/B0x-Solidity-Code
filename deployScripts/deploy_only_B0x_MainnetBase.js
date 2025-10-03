
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

  //https://basescan.org/address/0xF10122D428B4bc8A9d050D06a2037259b4c4B83B#writeContract#F2
  //transfer tokens to Base then

const hre = require("hardhat");
// Define a sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Function to send blank transactions
async function sendBlankTransactions(deployer, gasPrice, count = 25) {
  console.log(`\n--- Sending ${count} blank transactions to increment nonce ---`);
  
  // Get the current nonce
  let currentNonce = await deployer.getNonce();
  console.log(`Starting nonce: ${currentNonce}`);
  
  for (let i = 0; i < count; i++) {
    try {
      console.log(`Sending blank transaction ${i + 1}/${count} with nonce ${currentNonce + i}...`);
      
      const tx = await deployer.sendTransaction({
        to: deployer.address, // Send to self
        value: 0, // No ETH transfer
        gasPrice: gasPrice,
        gasLimit: 21000, // Standard gas limit for simple transfer
        nonce: currentNonce + i // Explicitly set the nonce
      });
      
      console.log(`Transaction ${i + 1} hash: ${tx.hash}`);
      
      // Small delay to prevent overwhelming the network
      await sleep(500); // 500ms delay
      
    } catch (error) {
      console.error(`Error sending blank transaction ${i + 1}:`, error.message);
      // Continue with next transaction
    }
  }
  
  console.log(`Finished sending ${count} blank transactions\n`);
  console.log(`Final nonce should be: ${currentNonce + count}`);
  
  // Wait a bit for all transactions to propagate
  await sleep(2000);
}


async function main() {
const Address_ZEROXBTC_MainnetBase = "0xc4D4FD4F4459730d176844c170F2bB323c87Eb3B";
const tokenAddress_Base_Mainnet_B0x_Token = "0xa9520FC8c54691af586544aD13Db954AfC345cd4";

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





    
//We get 0xBTC and B0x from mainnet ethereum.
//We must bridge the B0x from mainnet to Base.

    /*Get contract factory
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
    


/*
    // Get contract factory
    console.log("Getting contract factory...");
    const B0xToken = await hre.ethers.getContractFactory("B0x_Mainnet");
    


    const token = await B0xToken.deploy(deployer.address, Address_ZEROXBTC_TESTNETCONTRACT, {
  gasPrice: doubledGasPrice
});
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await token.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const tokenAddress = await token.getAddress();
    console.log(`Token deployed to: ${tokenAddress}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run: `);
    console.log(`npx hardhat verify --network baseSepolia ${tokenAddress} "${deployer.address}" "${Address_ZEROXBTC_TESTNETCONTRACT}" \n\n`);
    
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
    console.log(`npx hardhat verify --network baseSepolia ${rightsTo0xBitcoinAddress} \n\n`);
    

    
// Ensure both addresses are properly formatted (lowercase)
const addr1 = Address_ZEROXBTC_TESTNETCONTRACT.toLowerCase();
const addr2 = tokenAddress.toLowerCase();


if (BigInt(addr1) > BigInt(addr2)) {
    console.log("Failed Zerox greater than B0x");
    await main();
    return;
}
*/


  // *** SEND BLANK TRANSACTIONS HERE ***
  await sendBlankTransactions(deployer, doubledGasPrice, 25);

if(tokenAddress_Base_Mainnet_B0x_Token == "UnknownYet"){
console.log("ENTER THE BASE MAINNET OF B0x Token BASE MAINNET, also have the tokens in the wallet of the deployer")
console.log("https://basescan.org/address/0xF10122D428B4bc8A9d050D06a2037259b4c4B83B#writeContract#F2");
console.log("Then EVERY SINGLE TOKEN Bridge Tokens to Base")
console.log("Then it shouldn't be able to openmining Either because we dont start til Nov 1st")
  //transfer tokens to Base then")
  return;
}

    // Get contract factory
    console.log("Getting contract factory... HooKMiner");
    const Univ4Hook_Contract = await hre.ethers.getContractFactory("HookMiner");
    
    // Deploy contract
    console.log("Deploying tokens HooKMiner...");
    const UniV4Hook = await Univ4Hook_Contract.deploy( {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await UniV4Hook.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const Address_Univ4HookMiner = await UniV4Hook.getAddress();
    console.log(`Address_Univ4HookMiner deployed to: ${Address_Univ4HookMiner}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network base ${Address_Univ4HookMiner} \n\n`);

    



    console.log("Calling findValidSalt function...");
    let startSalt = 0;
    const maxAttempts = 5000;

    // Use 'let' instead of 'int' for the loop variable
    // Add proper spacing in the for loop condition
    // Add missing closing parenthesis
    let HookAddress;
    let validSaltz = 0;
    for(let x = 0; x < 110; x++) {
      sleep(2000);
      // Update startSalt for each iteration
      startSalt = maxAttempts * x;
      
      try {
        // Call the view function
        const result = await UniV4Hook.findValidSalt(startSalt, maxAttempts);
        
        // Since the function returns multiple values, you can destructure them
        const [validSalt, predictedAddress] = result;
        
        console.log(`Iteration ${x}:`);
        console.log(`Found valid salt: ${validSalt}`);
        console.log(`Predicted hook address: ${predictedAddress}`);
        validSaltz = validSalt; 
        HookAddress = predictedAddress;
        break;
        // If you want to use these values for further operations
        // For example, if there's a deploy function that uses the salt
        // await UniV4Hook.deploy(validSalt);
        
      } catch (error) {
        console.error(`Error finding valid salt in iteration ${x}:`, error);
      }
    }



    console.log("Done checking for hook addresses we got one hopefully, Salt: ", validSaltz, "   HOOK ADDY: ",HookAddress);



    // Deploy the hook with the found salt
    try {
      console.log("Deploying the hook using salt:", validSaltz);
      
      // IMPORTANT: deployHook is a STATE-CHANGING function (not a view function)
      // It needs to be treated as a transaction
      console.log("Sending deployHook transaction...");
      const tx = await UniV4Hook.deployHook(validSaltz, {
  gasPrice: doubledGasPrice
});
      
      console.log("Hook deployment transaction sent:", tx.hash);
      console.log("Waiting for transaction confirmation...");
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("Hook deployment transaction confirmed in block:", receipt.blockNumber);
      
      // Try to extract the deployed address from events if the contract emits them
      // Example: If there's a DeployedHook(address hookAddress) event
      try {
        // Look for the event that might contain the hook address
        // This is contract-specific - you need to check your contract's events
        console.log("Looking for hook address in transaction events...");
        
        if (receipt.logs && receipt.logs.length > 0) {
          // Try to decode events from the receipt logs
          // This approach depends on your contract's event structure
          console.log("Transaction has", receipt.logs.length, "logs");
          
          // Alternatively, you might need to use the interface to parse events
          // const iface = new ethers.utils.Interface(["event DeployedHook(address hookAddress)"]);
          // const events = receipt.logs.map(log => iface.parseLog(log));
          
          // For now, let's stick with the predicted address
          console.log("Using predicted hook address:", HookAddress);
        } else {
          console.log("No logs found in receipt, using predicted address:", HookAddress);
        }
      } catch (eventError) {
        console.log("Could not parse events, using predicted address:", HookAddress);
      }
      
    } catch (error) {
      console.error("Error deploying hook:", error);
      console.log("Continuing with the predicted address:", HookAddress);
      // Continue with the predicted address if deployment fails
    }


      console.log("HOOK DEPLOYED TO HOOKADDRESS: ",HookAddress );

        console.log(`npx hardhat verify --network base ${HookAddress} `);

      console.log("HOOK DEPLOYED TO HOOKADDRESS: ",HookAddress, "\n\n");







    // Get contract factory
    console.log("Getting contract factory... LP Rewards");
    const B0xToken_Rewards = await hre.ethers.getContractFactory("B0x_LP_Rewards");
    
    // Deploy contract
    console.log("Deploying tokens Rewards LP Rewards...");
    const LPRewards = await B0xToken_Rewards.deploy(tokenAddress_Base_Mainnet_B0x_Token, Address_ZEROXBTC_MainnetBase, HookAddress, {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await LPRewards.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const tokenAddress_Rewards = await LPRewards.getAddress();
    console.log(`tokenAddress_Rewards deployed to: ${tokenAddress_Rewards}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
  console.log(`npx hardhat verify --network base ${tokenAddress_Rewards} "${tokenAddress_Base_Mainnet_B0x_Token}" "${Address_ZEROXBTC_MainnetBase}" "${HookAddress}" \n\n`);






    // Get contract factory
    console.log("Getting contract factory... POW!");
    const B0xToken_POW = await hre.ethers.getContractFactory("B0x_Mining_Proof_of_Work");
    
    // Deploy contract
    console.log("Deploying tokens ProofOFWork...");
    const tokenPOW = await B0xToken_POW.deploy(tokenAddress_Base_Mainnet_B0x_Token, tokenAddress_Rewards, {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await tokenPOW.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const tokenAddress_Proof_Of_Work = await tokenPOW.getAddress();
    console.log(`tokenAddress_Proof_Of_Work deployed to: ${tokenAddress_Proof_Of_Work}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network base ${tokenAddress_Proof_Of_Work} "${tokenAddress_Base_Mainnet_B0x_Token}" "${tokenAddress_Rewards}"`);

    
/*
    // Get contract factory
    console.log("Getting contract factory... NFT721!");
    const DummyNFT721 = await hre.ethers.getContractFactory("MyERC721");
    
    // Deploy contract
    console.log("Deploying tokens NFT721...");
    const NFT721 = await DummyNFT721.deploy("Test721NFT", "T721", "https://forgetoken.org/img/gem.png", tokenAddress_Proof_Of_Work, {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await NFT721.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const NFT721Address = await NFT721.getAddress();
    console.log(`NFT721 Address deployed to: ${NFT721Address}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network baseSepolia ${NFT721Address} "Test721NFT" "T721" "https://forgetoken.org/img/gem.png" "${tokenAddress_Proof_Of_Work}"`);

    

    // Get contract factory
    console.log("Getting contract factory... NFT1155!");
    const DummyNFT1155  = await hre.ethers.getContractFactory("MyERC1155");
    
    // Deploy contract
    console.log("Deploying tokens NFT1155...");
    const NFT1155 = await DummyNFT1155.deploy("https://forgetoken.org/img/gem.png", tokenAddress_Proof_Of_Work, {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await NFT1155.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const NFT1155Address = await NFT1155.getAddress();
    console.log(`NFT1155Address deployed to: ${NFT1155Address}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network baseSepolia ${NFT1155Address} "https://forgetoken.org/img/gem.png" "${tokenAddress_Proof_Of_Work}"`);

    

*/

     try {
        // Call the view function

        const tx = await LPRewards.setPOW_Contract(tokenAddress_Proof_Of_Work, {
  gasPrice: doubledGasPrice
});
        //const tx = await tokenSwapper.getUnsiwapv4Fees( NFTTOkenID, tokenAddress, deployer.address);
        
        
      console.log("setPOW_Contract setPOW_Contract tx sent:", tx.hash);
         
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
        // If you want to use these values for further operations
        // For example, if there's a deploy function that uses the salt
        // await UniV4Hook.deploy(validSalt);
        
      } catch (error) {
        console.error(`Error finding getUnsiwapv4Fees`, error);
      }

      console.log("setPOW_Contract: ", tokenAddress_Proof_Of_Work);


console.log("3 sec sleep");
await sleep(3000);




  try {
    console.log(`Calling OpenMining!!!!`);
    
    // Transfer tokens to the deployed contract address
    const transferTx = await tokenPOW.openMining( {
      gasPrice: doubledGasPrice
    });
    
    console.log(`OpenMining called transaction hash: ${transferTx.hash}`);
    console.log("Waiting for OpenMining called transaction to be mined...");
    await transferTx.wait();
    
    
  } catch (error) {
    console.error("Error during OpenMining before Token Transfer called:", error.message);
  }


//DONT HAVE THIS IN RETAIL WE NEED TO BRIDGE

//DONT HAVE THIS IN RETAIL WE NEED TO BRIDGE FIRST


 // NEW: Transfer tokens to the contract
  console.log("\n--- Token Transfer Section ---");
  const transferAmount = "20328200000000000000000000"; // Your specified amount
    // Standard ERC20 ABI for the functions we need
const ERC20_ABI = [
 "function transfer(address to, uint256 amount) external returns (bool)",
 "function balanceOf(address account) external view returns (uint256)"
];
  
  try {
    console.log(`Transferring ${transferAmount} tokens to contract...`);
    
    // Create token contract instance using existing deployer signer
    const token = new hre.ethers.Contract(tokenAddress_Base_Mainnet_B0x_Token, ERC20_ABI, deployer);
    
    // Transfer tokens to the deployed contract address
    const transferTx = await token.transfer(tokenAddress_Proof_Of_Work, transferAmount, {
      gasPrice: doubledGasPrice
    });
    
    console.log(`Transfer transaction hash: ${transferTx.hash}`);
    console.log("Waiting for transfer transaction to be mined...");
    await transferTx.wait();
    
    // Check the contract's token balance
    const contractBalance = await token.balanceOf(tokenAddress_Proof_Of_Work);
    console.log(`Contract token balance: ${contractBalance.toString()}`);
    
  } catch (error) {
    console.error("Error during token transfer:", error.message);
  }



  try {
    console.log(`Calling OpenMining!!!!`);
    
    // Transfer tokens to the deployed contract address
    const transferTx = await tokenPOW.openMining( {
      gasPrice: doubledGasPrice
    });
    
    console.log(`OpenMining called transaction hash: ${transferTx.hash}`);
    console.log("Waiting for OpenMining called transaction to be mined...");
    await transferTx.wait();
    
    
  } catch (error) {
    console.error("Error during OpenMining called After token Transfer:", error.message);
  }














    // Get contract factory
    console.log("Getting contract factory... PoolMaker!");
    const B0xToken_CreatePool = await hre.ethers.getContractFactory("UniswapV4PoolCreator");
    
    // Deploy contract
    console.log("Deploying tokens ProofOFWork...");
    const tokenPooLCreator = await B0xToken_CreatePool.deploy(tokenAddress_Base_Mainnet_B0x_Token, {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await tokenPooLCreator.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const address_tokenPooLCreator = await tokenPooLCreator.getAddress();
    console.log(`tokenPooLCreator address deployed to: ${address_tokenPooLCreator}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network base ${address_tokenPooLCreator} "${tokenAddress_Base_Mainnet_B0x_Token}" \n\n`);

    


//const startingX96PriceFor2000to1 = 3543191142285914378072636784640n;
     try {
  // Call the view function
        const tx = await tokenPooLCreator.createNewPool(Address_ZEROXBTC_MainnetBase, tokenAddress_Base_Mainnet_B0x_Token, HookAddress, {
  gasPrice: doubledGasPrice
});
         console.log("Sending createNewPool transaction...");

      console.log("createNewPool transaction sent:", tx.hash);
      console.log("Waiting for transaction confirmation...");
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("createNewPool transaction confirmed in block:", receipt.blockNumber);
      
      

      } catch (error) {
        console.error(`Error createNewPool`, error);
      }


      

















































    // Get contract factory
    console.log("Getting contract factory... Univ4MakeSwap!");
    const B0xToken_Swap = await hre.ethers.getContractFactory("UniswapV4Swap");
    
    // Deploy contract
    console.log("Deploying tokens Univ4MakeSwap...");
    const tokenSwapper = await B0xToken_Swap.deploy({
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await tokenSwapper.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const tokenAddress_Swapper= await tokenSwapper.getAddress();
    console.log(`Univ4MakeSwap deployed to: ${tokenAddress_Swapper}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network base ${tokenAddress_Swapper}`);

    



    // Get contract factory
    console.log("Getting contract factory... positionFinderPro!");
    const positionFinderExpert = await hre.ethers.getContractFactory("positionFinderPro");
    
    // Deploy contract
    console.log("Deploying positionFinderPro positionFinderPro...");
    const positionFinder = await positionFinderExpert.deploy(tokenAddress_Rewards, {
  gasPrice: doubledGasPrice
});
    
    // Wait for deployment
    console.log("Waiting for deployment transaction to be mined...");
    await positionFinder.waitForDeployment();
    
    // Get the deployed address (ethers v6 way)
    const tokenAddress_PositionFinder= await positionFinder.getAddress();
    console.log(`positionFinderPro deployed to: ${tokenAddress_PositionFinder}`);
    
    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);
    console.log(`npx hardhat verify --network base ${tokenAddress_PositionFinder} "${tokenAddress_Rewards}"`);

    
console.log("?????VERIFICATION SCRIPT BELOW!!!!!!");
    
console.log("?????VERIFICATION SCRIPT BELOW!!!!!!");
    
console.log("?????VERIFICATION SCRIPT BELOW!!!!!!");



    // Print verification command
    console.log(`\nTo verify on Etherscan, run:`);


    console.log(`0xBTC deployed to: ${Address_ZEROXBTC_MainnetBase}`);
    //console.log(`npx hardhat verify --network baseSepolia ${Address_ZEROXBTC_TESTNETCONTRACT} \n`);

    console.log(`Test B0xToken deployed to: ${tokenAddress_Base_Mainnet_B0x_Token}`);
   // console.log(`npx hardhat verify --network baseSepolia ${tokenAddress} "${deployer.address}" "${Address_ZEROXBTC_TESTNETCONTRACT}" \n\n`);
    


    //console.log(`\nTo verify RightsTo0xBTC on Etherscan, run: `);
   // console.log(`npx hardhat verify --network baseSepolia ${rightsTo0xBitcoinAddress} \n\n`);



    // Print verification command
      console.log("Uni v4 Hook Miner Deployed to Address: ",Address_Univ4HookMiner);
    console.log(`npx hardhat verify --network base ${Address_Univ4HookMiner} \n`);

      console.log("HOOK DEPLOYED TO HOOKADDRESS: ",HookAddress);
        console.log(`npx hardhat verify --network base ${HookAddress} \n\n`);


    console.log(`\nTo verify on LP Rewards use this Etherscan, run:`);
  console.log(`npx hardhat verify --network base ${tokenAddress_Rewards} "${tokenAddress_Base_Mainnet_B0x_Token}" "${Address_ZEROXBTC_MainnetBase}" "${HookAddress}" \n\n`);


  
    // Print verification command
    console.log(`\nTo verify on Etherscan tokenAddress_Proof_Of_Work , run:`);
    //MINING CONTRACT VERIFICATION NOT YET
    console.log(`npx hardhat verify --network base ${tokenAddress_Proof_Of_Work} "${tokenAddress_Base_Mainnet_B0x_Token}" "${tokenAddress_Rewards}"`);

    

    
    
    // Print verification command
    console.log(`\nTo verify on Etherscan address_tokenPooLCreator , run:`);
    console.log(`npx hardhat verify --network base ${address_tokenPooLCreator} "${tokenAddress_Base_Mainnet_B0x_Token}" \n\n`);


    console.log(`Univ4MakeSwap deployed to: ${tokenAddress_Swapper}`);
    console.log(`npx hardhat verify --network base ${tokenAddress_Swapper} \n`);

    console.log(`positionFinderPro deployed to: ${tokenAddress_PositionFinder}`);
    console.log(`npx hardhat verify --network base ${tokenAddress_PositionFinder} "${tokenAddress_Rewards}" \n\n \n\n \n\n`);

console.log("Done with setup SUPER SUCCESS EVERYTHING IS ONLINE NOW JUST FOR CHECKS WITH SWAPS");
console.log("\n\n");

console.log("\n\n");

console.log(`const UnsiwapV4PoolCreatorAddress = "${address_tokenPooLCreator}";`)
console.log(`const USDCToken = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";`)
console.log(`const positionManager_address = "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80";`);
console.log("const contractAddress_PositionFinderPro = '"+tokenAddress_PositionFinder+"'; // Replace with actual contract address")
console.log("const contractAddress_Swapper = '"+tokenAddress_Swapper+"'; // Replace with actual contract address");
console.log("const contractAddressLPRewardsStaking = '"+tokenAddress_Rewards+"';");
console.log("const hookAddress = '"+HookAddress+"';");
console.log("const ProofOfWorkAddresss = '"+tokenAddress_Proof_Of_Work+"';");

console.log(`
// Token addresses mapping
const tokenAddresses = {
'ETH': '0x0000000000000000000000000000000000000000', // addresses
'B0x': '${tokenAddress_Base_Mainnet_B0x_Token}',
'0xBTC': '${Address_ZEROXBTC_MainnetBase}',
'WETH': '0x4200000000000000000000000000000000000006',
'RightsTo0xBTC': '0x0000000000000000000000000000000000000000', //temp until mainnet fill in with actual token on launch
'USDC': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', //mainnet base USDC
};



    const tokenMap = {
        "0x4200000000000000000000000000000000000006": "WETH",
        "0x0000000000000000000000000000000000000000": "ETH",
        "${tokenAddress_Base_Mainnet_B0x_Token}": "B0x",
        "${Address_ZEROXBTC_MainnetBase}": "0xBTC",
        "0x0000000000000000000000000000000000000000": "RightsTo0xBTC",  //temp until mainnet fill in with actual token on launch
        "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913": "USDC", //mainnet base USDC
        // Add more token mappings as needed
    };


   


// Token addresses mapping FOR ETHEREUM MAINNET ONLY but using testnet base sepolia instead of mainnet ETH
  const tokenAddressesETH = {
      'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
      'B0x': '0x0000000000000000000000000000000000000000', //TEMP UNTIL MAINNET FILL IN WITH ACTUAL TOKEN ON LAUNCH
      '0xBTC': '0xB6eD7644C69416d67B522e20bC294A9a9B405B31',
      'RightsTo0xBTC': '0x0000000000000000000000000000000000000000', //TEMP UNTIL MAINNET FILL IN WITH ACTUAL TOKEN ON LAUNCH
      };




`);






console.log("Sleep 11 seconds");



  }
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
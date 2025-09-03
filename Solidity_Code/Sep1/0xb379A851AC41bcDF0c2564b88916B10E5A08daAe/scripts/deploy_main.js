//"0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14" need to edit this to right vault
const hre = require("hardhat");
// Define a sleep function
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
  console.log("Deploying CauldronToken_Mainnet contract...");
  
    // Get the deployer's address
    const [deployer] = await hre.ethers.getSigners();
    console.log(`Deploying with account: ${deployer.address}`);
    
    // Get contract factory
    console.log("Getting contract factory...");
    const CauldronToken = await hre.ethers.getContractFactory("CauldronToken_Mainnet");
    

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
    const token = await CauldronToken.deploy(deployer.address, {
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
    console.log(`npx hardhat verify --network sepolia ${tokenAddress} "${deployer.address}"  \n\n`);
    

    











































    // Get contract factory
    console.log("Getting contract factory... Univ4MakeSwap!");
    const CauldronToken_Swap = await hre.ethers.getContractFactory("UniswapV4Swap_mainnet");
    
    // Deploy contract
    console.log("Deploying tokens Univ4MakeSwap...");
    const tokenSwapper = await CauldronToken_Swap.deploy(tokenAddress, {
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
    console.log(`npx hardhat verify --network sepolia ${tokenAddress_Swapper} "${tokenAddress}"`);

    



const startingX96PriceFor2000to1 = 3543191142285914378072636784640n;
     try {
  // Call the view function
        const tx = await tokenSwapper.createNewPool("0x0000000000000000000000000000000000000000", tokenAddress, startingX96PriceFor2000to1, {
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


      
console.log("SUPER SUCCESS EVERYTHING IS ONLINE NOW JUST FOR CHECKS WITH SWAPS");















const amountToApprove = ethers.parseEther("20000000");  // Correctly represents 200 * 10^18
     try {

    console.log("Done Getting swapper stuff lets actually do something on chain");

      // This approach uses the ABI from the contract factory and connects to the deployed address
      const tokenContract = CauldronToken.attach(tokenAddress);
      
      console.log(`Approving ${tokenAddress_Swapper} to spend ${amountToApprove} tokens...`);
      const approveTx = await tokenContract.approve(tokenAddress_Swapper, amountToApprove, {
  gasPrice: doubledGasPrice
});
      console.log("Waiting for approval transaction to be mined...");
      await approveTx.wait();
      console.log("Token approval successful!");

      } catch (error) {
        console.error(`Error finding approval swapper stuff`, error);
      }



const amountToDeposit = ethers.parseEther("2");  // Correctly represents 20000 * 10^18

await sleep(1*1000);


let readableAmountOut = 0;
let ratioAsWei =0;
      try {
        // Call the view function
        const result = await tokenSwapper.getPriceRatio();



          // First debug what we're getting back
          console.log("Raw result type:", typeof result);
          console.log("Raw result structure:", Object.keys(result).join(", "));
          
          let ratioz;
          if (typeof result === 'bigint' || typeof result === 'number') {
            // If it's already a primitive value
            ratioz = result;
          } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
            // For ethers v5 BigNumber
            ratioz = result;
          } else if (typeof result === 'object' && result !== null) {
            // For objects, try to extract the value
            // With ethers v6, we might get the value directly
            if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
              ratioz = result;
            } else {
              // Attempt to extract value based on common patterns
              ratioz = result[0] || result.amountOut || result._hex || result.value || result;
            }
          }
          
          console.log(`Found valid Ratio x10**18: ${ratioz.toString()}`);
          // Format to display as a readable number
          readableAmountOut = ethers.formatEther(ratioz);
          ratioAsWei = ethers.parseEther(readableAmountOut);
          console.log(`Found valid Ratio x10**18: ${readableAmountOut} mutliplier`);
        } catch (error) {
          console.error(`Error finding valid getOutput for swap:`, error);
        }



        const amountInEth = ethers.formatEther(amountToDeposit); // "200.0"
const ratioInEth = ethers.formatEther(ratioAsWei);      // "2000.0"

var amountToDepositETH = parseFloat(amountInEth) / parseFloat(ratioInEth);
console.log(`Estimated Deposit ETH amount: ${amountToDepositETH}`); // "0.1"

amountToDepositETH = ethers.parseEther(amountToDepositETH.toString());
let liquiditySalt = 0;

      var NFTTOkenID = 0;

     try {
              const tx = await tokenSwapper.createPositionWithETH(amountToDeposit,0, {
  gasPrice: doubledGasPrice,
    value: amountToDepositETH
  });
        
      console.log("createPositionWithETH with custom perfect deposit of ETH transaction sent:", tx.hash);
      console.log("Waiting for transaction confirmation...");
      
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
      console.log("createPositionWithETH transaction confirmed in block:", receipt.blockNumber);
      
const eventSignatureHash = "0x97c3f5c9077358c7266488de6a3ebba41df38417797d90b665239fcb506c840a";// ethers.id("PositionCreated(uint256)"); // ethers.utils.id in ethers v5
for (const log of receipt.logs) {
  //console.log("Log: :",log);
  if (log.topics[0] == eventSignatureHash) {
    const tokenIdHex = log.topics[1];
    const tokenIdNumber = Number(BigInt(tokenIdHex));
  //  console.log("here333");
    NFTTOkenID = tokenIdNumber;
    console.log("Token NFT ID = ", tokenIdNumber);+
    console.log("https://app.uniswap.org/positions/v4/ethereum_sepolia/"+tokenIdNumber);
  }else if(log.topics[0] == "0xf208f4912782fd25c7f114ca3723a2d5dd6f3bcc3ac8db5af63baa85f711d5ec"){
      console.log("Found ModifyLiquidity event!");
      
      // Decode the event data
      // The ModifyLiquidity event has format:
      // ModifyLiquidity(bytes32 indexed id, address indexed sender, int24 tickLower, int24 tickUpper, int256 liquidityDelta, bytes32 salt)
      
      // The data field contains: tickLower, tickUpper, liquidityDelta, salt
      const data = log.data.substring(2); // Remove '0x' prefix
      
      // Each parameter is 32 bytes (64 hex characters)
      // Skip the first 3 parameters to get the salt (4th parameter in data)
      const saltHex = '0x' + data.substring(64 * 3, 64 * 4);
      
      // Convert to a more readable format if needed
      liquiditySalt = saltHex;
      console.log("ModifyLiquidity salt:", liquiditySalt);
      
      // If you need to just get the right-most part (the number)
    }
  }
  


        // If you want to use these values for further operations
        // For example, if there's a deploy function that uses the salt
        // await UniV4Hook.deploy(validSalt);

      } catch (error) {
        console.error(`Error creating pool`, error);
      }



for (let i = 0; i < 50; i++) {
            console.log("sleeping 60 seconds");
            console.log("Withdrawal #: ", i);
            await sleep(60*1000);


            const amountToDepositDECREASELIQ = ethers.parseEther("80");  // Correctly represents 20000 * 10^18

            const amountToDepositETHDECREASELIQ  = ethers.parseEther("0.04");  // Correctly represents 20000 * 10^18

            console.log("Sleep for 60 second to let arbis get up to speed");

                try {
                        const tx = await tokenSwapper.DecreaseLIq(10000, NFTTOkenID, {
            gasPrice: doubledGasPrice
            });
                    
                console.log("DECREASED Liquidity transaction sent:", tx.hash);
                console.log("Waiting for transaction confirmation...");
                
                // Wait for the transaction to be mined
                const receipt = await tx.wait();
                console.log("Increased Liquidity transaction confirmed in block:", receipt.blockNumber);
                console.log("REMOVED 40% of the tokens from tokenID: ", NFTTOkenID);

                    // If you want to use these values for further operations
                    // For example, if there's a deploy function that uses the salt
                    // await UniV4Hook.deploy(validSalt);

                } catch (error) {
                    console.error(`Error DecreaseLIq liquidty on token`, error);
                }



            console.log("NFT ID: ", NFTTOkenID);





            const amountToDepositINCREASELIQ = ethers.parseEther("100");  // Correctly represents 20000 * 10^18

            let readableAmountOut2 = 0;
            let ratioAsWei2 =0;
                try {
                    // Call the view function
                    const result = await tokenSwapper.getPriceRatio();



                    // First debug what we're getting back
                    console.log("Raw result type:", typeof result);
                    console.log("Raw result structure:", Object.keys(result).join(", "));
                    
                    let ratioz;
                    if (typeof result === 'bigint' || typeof result === 'number') {
                        // If it's already a primitive value
                        ratioz = result;
                    } else if (result._isBigNumber || result instanceof ethers.BigNumber) {
                        // For ethers v5 BigNumber
                        ratioz = result;
                    } else if (typeof result === 'object' && result !== null) {
                        // For objects, try to extract the value
                        // With ethers v6, we might get the value directly
                        if (typeof result.toString === 'function' && result.toString().match(/^[0-9]+$/)) {
                        ratioz = result;
                        } else {
                        // Attempt to extract value based on common patterns
                        ratioz = result[0] || result.amountOut || result._hex || result.value || result;
                        }
                    }
                    
                    console.log(`Found valid Ratio x10**18: ${ratioz.toString()}`);
                    // Format to display as a readable number
                    readableAmountOut2 = ethers.formatEther(ratioz);
                    ratioAsWei2 = ethers.parseEther(readableAmountOut2);
                    console.log(`Found valid Ratio x10**18: ${readableAmountOut2} mutliplier`);
                    } catch (error) {
                    console.error(`Error finding valid getOutput for swap:`, error);
                    }



                    const amountInEth2 = ethers.formatEther(amountToDepositINCREASELIQ); // "200.0"
            const ratioInEth2 = ethers.formatEther(ratioAsWei2);      // "2000.0"

            var amountToDepositETHINCREASELIQ = parseFloat(amountInEth2) / parseFloat(ratioInEth2);
            console.log(`Estimated Deposit ETH amount: ${amountToDepositETHINCREASELIQ}`); // "0.1"

            amountToDepositETHINCREASELIQ = ethers.parseEther(amountToDepositETHINCREASELIQ.toString());





                try {
                        const tx = await tokenSwapper.increaseLIq(amountToDepositINCREASELIQ, NFTTOkenID, {
            gasPrice: doubledGasPrice,
                value: amountToDepositETHINCREASELIQ
            });
                    
                console.log("Increased Liquidity transaction sent:", tx.hash);
                console.log("Waiting for transaction confirmation...");
                
                // Wait for the transaction to be mined
                const receipt = await tx.wait();
                console.log("Increased Liquidity transaction confirmed in block:", receipt.blockNumber);
                console.log(`Deposited ${ ethers.formatEther(amountToDepositINCREASELIQ.toString())} tokens and another ${ethers.formatEther(amountToDepositETHINCREASELIQ.toString())} ETH into tokenID: ${NFTTOkenID}`);

                    // If you want to use these values for further operations
                    // For example, if there's a deploy function that uses the salt
                    // await UniV4Hook.deploy(validSalt);

                } catch (error) {
                    console.error(`Error increasing liquidty on token`, error);
                }



            console.log("NFT ID: ", NFTTOkenID);











    }


















































     try {
        // Call the view function

        // const tx = await tokenSwapper.WITHDRAW_NFTintoStakingContract(NFTTOkenID, {
         const tx = await tokenSwapper.withdrawNFT(NFTTOkenID, {
  gasPrice: doubledGasPrice
});
        //const tx = await tokenSwapper.getUnsiwapv4Fees( NFTTOkenID, tokenAddress, deployer.address);
        
        
      console.log("withdrawNFT FROM CONTRACT TO OURS FOR SAFE KEEPING:", tx.hash);
      console.log("withdrawNFT FROM CONTRACT TO OURS FOR SAFE KEEPING:", tx.hash);
         
      // Wait for the transaction to be mined
      const receipt = await tx.wait();
        // If you want to use these values for further operations
        // For example, if there's a deploy function that uses the salt
        // await UniV4Hook.deploy(validSalt);
        
      } catch (error) {
        console.error(`Error finding WITHDRAW_NFTintoStakingContractcheck`, error);
      }


      
      console.log("WITHDRAW_NFTintoStakingContractcheck DONE please my good sir");


  console.log("WITHDRAW_NFTintoStakingContractcheck DONE please my good sir");

















  }
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
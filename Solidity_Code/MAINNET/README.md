To verify on Etherscan, run:
npx hardhat verify --network base 0x6be8BAFFC70696404Cdc191129e832238d242C34 "0xe66EA3fe7659310d3392363673aFB39fd1019AdA"
?????VERIFICATION SCRIPT BELOW!!!!!!
?????VERIFICATION SCRIPT BELOW!!!!!!
?????VERIFICATION SCRIPT BELOW!!!!!!

To verify on Etherscan, run:
0xBTC deployed to: 0xc4D4FD4F4459730d176844c170F2bB323c87Eb3B
Test B0xToken deployed to: 0xa9520FC8c54691af586544aD13Db954AfC345cd4
Uni v4 Hook Miner Deployed to Address:  0x92732DB1362233c56aE3265BE2C41F2a145F61F9
npx hardhat verify --network base 0x92732DB1362233c56aE3265BE2C41F2a145F61F9 

HOOK DEPLOYED TO HOOKADDRESS:  0x983dD6eF6A9360331ba80Ed6322ea47fEb9AD000
npx hardhat verify --network base 0x983dD6eF6A9360331ba80Ed6322ea47fEb9AD000 



To verify on LP Rewards use this Etherscan, run:
npx hardhat verify --network base 0xe66EA3fe7659310d3392363673aFB39fd1019AdA "0xa9520FC8c54691af586544aD13Db954AfC345cd4" "0xc4D4FD4F4459730d176844c170F2bB323c87Eb3B" "0x983dD6eF6A9360331ba80Ed6322ea47fEb9AD000" 



To verify on Etherscan tokenAddress_Proof_Of_Work , run:
npx hardhat verify --network base 0x97bBa9F710DE42536843Bd1061514b5104D7DE50 "0xa9520FC8c54691af586544aD13Db954AfC345cd4" "0xe66EA3fe7659310d3392363673aFB39fd1019AdA"

To verify on Etherscan address_tokenPooLCreator , run:
npx hardhat verify --network base 0xE82F72200f54968Dcc3b6900d4B33701dA62A48C "0xa9520FC8c54691af586544aD13Db954AfC345cd4" 


Univ4MakeSwap deployed to: 0x7efA6a3B86B630013a1541c1DEe4Abf729a3a775
npx hardhat verify --network base 0x7efA6a3B86B630013a1541c1DEe4Abf729a3a775 

positionFinderPro deployed to: 0x6be8BAFFC70696404Cdc191129e832238d242C34
npx hardhat verify --network base 0x6be8BAFFC70696404Cdc191129e832238d242C34 "0xe66EA3fe7659310d3392363673aFB39fd1019AdA" 

 

 


Done with setup SUPER SUCCESS EVERYTHING IS ONLINE NOW JUST FOR CHECKS WITH SWAPS






const UnsiwapV4PoolCreatorAddress = "0xE82F72200f54968Dcc3b6900d4B33701dA62A48C";
const USDCToken = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const positionManager_address = "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80";
const contractAddress_PositionFinderPro = '0x6be8BAFFC70696404Cdc191129e832238d242C34'; // Replace with actual contract address
const contractAddress_Swapper = '0x7efA6a3B86B630013a1541c1DEe4Abf729a3a775'; // Replace with actual contract address
const contractAddressLPRewardsStaking = '0xe66EA3fe7659310d3392363673aFB39fd1019AdA';
const hookAddress = '0x983dD6eF6A9360331ba80Ed6322ea47fEb9AD000';
const ProofOfWorkAddresss = '0x97bBa9F710DE42536843Bd1061514b5104D7DE50';

// Token addresses mapping
const tokenAddresses = {
'ETH': '0x0000000000000000000000000000000000000000', // addresses
'B0x': '0xa9520FC8c54691af586544aD13Db954AfC345cd4',
'0xBTC': '0xc4D4FD4F4459730d176844c170F2bB323c87Eb3B',
'WETH': '0x4200000000000000000000000000000000000006',
'RightsTo0xBTC': '0x0000000000000000000000000000000000000000', //temp until mainnet fill in with actual token on launch
'USDC': '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', //mainnet base USDC
};



    const tokenMap = {
        "0x4200000000000000000000000000000000000006": "WETH",
        "0x0000000000000000000000000000000000000000": "ETH",
        "0xa9520FC8c54691af586544aD13Db954AfC345cd4": "B0x",
        "0xc4D4FD4F4459730d176844c170F2bB323c87Eb3B": "0xBTC",
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





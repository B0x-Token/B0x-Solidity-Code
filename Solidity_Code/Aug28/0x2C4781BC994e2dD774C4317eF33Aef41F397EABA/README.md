Deployed aug 28th



const USDCToken = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const positionManager_address = "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80";
const contractAddress_PositionFinderPro = '0x7ce4D55e220ad40585610EAaF7265e30155B96b7'; // Replace with actual contract address
const contractAddress_Swapper = '0xf98904F3c9F3ca4e2ABdF403D91c0720Fc1127Af'; // Replace with actual contract address
const contractAddressLPRewardsStaking = '0xEb9bEf1ED4E3A8aDaC59B8ce0AC4440AC4680c7D';
const hookAddress = '0x7245075DCe71A78AB5768add60f2093514a51000';
const ProofOfWorkAddresss = '0x18E62Cc299017a7Da761C73824fF8ec4c83831C6';

// Token addresses mapping
const tokenAddresses = {
'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
'B0x': '0x2C4781BC994e2dD774C4317eF33Aef41F397EABA',
'0xBTC': '0x16981caE0961362E179b6b1b22ccefE001857D8E',
'WETH': '0x4200000000000000000000000000000000000006',
'RightsTo0xBTC': '0x4f4Fc634c398076E730dadf2fF52d5cf6B2aA0C0', //temp until mainnet
'USDC': '0x036CbD53842c5426634e7929541eC2318f3dCF7e', //temp until mainnet
};



    const tokenMap = {
        "0x4200000000000000000000000000000000000006": "WETH",
        "0x0000000000000000000000000000000000000000": "ETH",
        "0x2C4781BC994e2dD774C4317eF33Aef41F397EABA": "B0x",
        "0x16981caE0961362E179b6b1b22ccefE001857D8E": "0xBTC",
        "0x4f4Fc634c398076E730dadf2fF52d5cf6B2aA0C0": "RightsTo0xBTC", //temp until mainnet
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e": "USDC", //temp until mainnet
        // Add more token mappings as needed
    };


   


// Token addresses mapping FOR ETHEREUM MAINNET ONLY but using testnet base sepolia instead of mainnet ETH
  const tokenAddressesETH = {
      'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
      'B0x': '0x2C4781BC994e2dD774C4317eF33Aef41F397EABA',
      '0xBTC': '0x16981caE0961362E179b6b1b22ccefE001857D8E',
      'RightsTo0xBTC': '0x4f4Fc634c398076E730dadf2fF52d5cf6B2aA0C0',
      };




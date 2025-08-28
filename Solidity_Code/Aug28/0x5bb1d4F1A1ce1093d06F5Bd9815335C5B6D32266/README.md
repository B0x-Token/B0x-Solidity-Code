0x5bb1d4F1A1ce1093d06F5Bd9815335C5B6D32266 B0x Token created on Aug 28






const USDCToken = "0x036CbD53842c5426634e7929541eC2318f3dCF7e";
const positionManager_address = "0x4B2C77d209D3405F41a037Ec6c77F7F5b8e2ca80";
const contractAddress_PositionFinderPro = '0x034161ea14156497B742980A8Fe4085313Fb6Fd7'; // Replace with actual contract address
const contractAddress_Swapper = '0x559f8F753c0F941fcf327B59E31ac21C310ae1C0'; // Replace with actual contract address
const contractAddressLPRewardsStaking = '0xC1d817c5F57637AF440f3f165fc6942c74DBab2a';
const hookAddress = '0xaDebd3A54886A44617AA2dCD24976f5898bf9000';
const ProofOfWorkAddresss = '0x9863EA71038BE19E4E64Af3fd2d161703a6bd68A';

// Token addresses mapping
const tokenAddresses = {
'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
'B0x': '0x5bb1d4F1A1ce1093d06F5Bd9815335C5B6D32266',
'0xBTC': '0x007FeE78A025A677f9416C31A7a24fF14FF0A6E2',
'WETH': '0x4200000000000000000000000000000000000006',
'RightsTo0xBTC': '0x1069c3fc94AAb52770abE34Ec88317897Cfd4F73', //temp until mainnet
'USDC': '0x036CbD53842c5426634e7929541eC2318f3dCF7e', //temp until mainnet
};



    const tokenMap = {
        "0x4200000000000000000000000000000000000006": "WETH",
        "0x0000000000000000000000000000000000000000": "ETH",
        "0x5bb1d4F1A1ce1093d06F5Bd9815335C5B6D32266": "B0x",
        "0x007FeE78A025A677f9416C31A7a24fF14FF0A6E2": "0xBTC",
        "0x1069c3fc94AAb52770abE34Ec88317897Cfd4F73": "RightsTo0xBTC", //temp until mainnet
        "0x036CbD53842c5426634e7929541eC2318f3dCF7e": "USDC", //temp until mainnet
        // Add more token mappings as needed
    };


   


// Token addresses mapping FOR ETHEREUM MAINNET ONLY but using testnet base sepolia instead of mainnet ETH
  const tokenAddressesETH = {
      'ETH': '0x0000000000000000000000000000000000000000', // Example addresses
      'B0x': '0x5bb1d4F1A1ce1093d06F5Bd9815335C5B6D32266',
      '0xBTC': '0x007FeE78A025A677f9416C31A7a24fF14FF0A6E2',
      'RightsTo0xBTC': '0x1069c3fc94AAb52770abE34Ec88317897Cfd4F73',
      };




// SPDX-License-Identifier: MIT
import "./Lenton_Proof_Of_Work.sol";
import "./Lenton_LP_Rewards.sol";
import "./Lenton_ERC20_Deployer.sol";
import "./Lenton_Dynamic_Pool_Creator.sol";
import "./Univ4Hook5.sol";
import "./Univ4MAKESWAP.sol";

contract thisContract {
    Lentum_Mining_Proof_of_Work public LentumMining;
    Lenton_LP_Rewards public LentonRewards;
    CauldronToken_Mainnet public LentumToken;
    UniswapV4PoolCreator public Lentom_Univ4_PoolCreator;
    HookMiner public hook_Factory;
    address public HookAddress;
    UniswapV4Swap public position_Factory;
    constructor() {
        LentumToken = new CauldronToken_Mainnet(msg.sender);
        LentumMining = new Lentum_Mining_Proof_of_Work();
        LentonRewards = new Lenton_LP_Rewards(IERC20(address(LentumToken)));
        Lentom_Univ4_PoolCreator = new UniswapV4PoolCreator();
        hook_Factory = new HookMiner();
        position_Factory = new UniswapV4Swap();

      //  Lentom_Univ4_PoolCreator.createNewPool(address(0), IERC20(address(LentumToken)), 3543191142285914378072636784640); //2000 Tokens to 1 Default

    }

    function step1_HookContract(uint StartSalt, uint TotalSaltsToDo)public returns (bool){

        (uint saltNum, address newHookAddress) = hook_Factory.findValidSalt(StartSalt, TotalSaltsToDo, msg.sender);
        HookAddress = newHookAddress;
    
    }
    function step2_PoolContract()public returns (bool){

       Lentom_Univ4_PoolCreator.createNewPool(address(0), address(LentumToken), HookAddress, 3543191142285914378072636784640); //2000 Tokens to 1 Default
    
    }
    function step3_Deploy_Position()public returns (bool){


        IERC20(address(LentumToken)).approve(address(position_Factory),2000*1000*10**18);
        position_Factory.createPositionWithETH(
        address(LentumToken),
        2000 * 1e18,
        0,
        HookAddress,
        msg.sender);


        return true;

    }

    function step4_SwapOnPool()public returns (bool){


        IERC20(address(LentumToken)).approve(address(position_Factory),2000*1000*10**18);
        position_Factory.swapTokenToETH(
        address(LentumToken),
        500 * 1e18,
        0,
        HookAddress,
        msg.sender);


        return true;

    }

    function step5_DepositNFT_into_Staking()public returns (bool){

    }
    function AddToken_To_Staking() public returns (bool){


    }

    function startNewStakingPerioda() public returns (bool){

    }
}
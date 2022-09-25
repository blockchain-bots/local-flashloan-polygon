// SPDX-License-Identifier: MIT
pragma solidity ^0.8;

import "hardhat/console.sol";

import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract FlashLoan is FlashLoanSimpleReceiverBase {
    event Log(address asset, uint val);

    constructor(IPoolAddressesProvider provider)
    FlashLoanSimpleReceiverBase(provider)
    {}

    function flashLoan(address asset, uint amount) external {
        address receiver = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        POOL.flashLoanSimple(
            receiver,
            asset,
            amount,
            params,
            referralCode
        );
    }

    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params // abi.decode(params) to decode params
    ) external returns (bool){
        require(amount <= IERC20(asset).balanceOf(address(this)), "Invalid balance, was the flashLoan successful?");

        // do stuff with flash loan here

        uint amountOwing = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwing);
        emit Log(asset, amountOwing);
        // Repay Aave
        return true;
    }
}

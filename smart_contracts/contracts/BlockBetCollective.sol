// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This is the main contract.
contract BlockBetCollective is ERC20 {
    uint256 public current_max_bet;
    uint256 public coinflip_win_percentage = 55; 

    // Constructor for BB Token
    constructor() ERC20("BlockBet Token", "BB") {}

    // Function to bet
    function bet() public payable {
        require(msg.value > 0, "Bet amount must be greater than zero");
        require(msg.value <= current_max_bet, "Bet exceeds max bet amount");

        if (get_randomness() > coinflip_win_percentage) {
            // You won.
            current_max_bet -= msg.value / 10;
            payable(msg.sender).transfer(msg.value * 2);
        } else {
            // You lost.
            current_max_bet += msg.value / 10;
        }
    }

    // Function to simulate pseudorandomness (should be replaced in production by a call to a VRF e.g. Chainlink because it can be gamed otherwise)
    function get_randomness() private view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender))) %
            100;
    }

    // Function to deposit funds and receive BB tokens
    function deposit_funds() public payable {
        require(msg.value > 0, "Deposit must be greater than zero");
        uint256 tokensToMint;
        if (totalSupply() != 0) {
            tokensToMint =
                (totalSupply() * msg.value) /
                (address(this).balance - msg.value);
        } else {
            tokensToMint = msg.value;
        }

        _mint(msg.sender, tokensToMint);
        update_max_bet();
    }

    // Function to update the max bet
    function update_max_bet() private {
        current_max_bet = address(this).balance / 10;
    }

    // Function to withdraw funds
    function withdraw_funds(uint256 tokenAmount) public {
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient BB tokens");
        uint256 ethToWithdraw = (address(this).balance * tokenAmount) /
            totalSupply();
        _burn(msg.sender, tokenAmount);
        payable(msg.sender).transfer(ethToWithdraw);
        update_max_bet();
    }
}

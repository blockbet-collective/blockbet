// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

// This is the main contract.
contract BlockBetCollective is ERC20, ERC1155 {
    uint256 public current_max_bet;
    uint256 public coinflip_win_percentage = 55;

    event Won();
    event Lost();
    event DepositFunds(uint amount, address user);
    event WithdrawFunds(uint amount, address user);

    string URL_0 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/1.json";
    string URL_1 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/2.json";
    string URL_2 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/3.json";
    string URL_3 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/4.json";
    string URL_4 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/5.json";
    string URL_5 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/6.json";
    string URL_6 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/7.json";
    string URL_7 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/8.json";
    string URL_8 =
        "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/9.json";

    // Constructor for BB Token
    constructor()
        ERC20("BlockBet Token", "BB")
        ERC1155(
            "https://bafybeia3fhtkn52dfplyx4p5f3cvcvggyvauvfbpgnt4h2dqen6pvtwrrm.ipfs.nftstorage.link/"
        )
    {}

    // Function to bet
    function bet() public payable {
        require(msg.value > 0, "Bet amount must be greater than zero");
        require(msg.value <= current_max_bet, "Bet exceeds max bet amount");

        if (get_randomness() % 100 > coinflip_win_percentage) {
            // You won.
            current_max_bet -= msg.value / 10;
            payable(msg.sender).transfer(msg.value * 2);

            emit Won();
        } else {
            // You lost.
            current_max_bet += msg.value / 10;

            emit Lost();
        }
    }

    function uri(uint256 tokenId) public view override returns (string memory) {
        if (tokenId == 0) {
            return URL_0;
        } else if (tokenId == 1) {
            return URL_1;
        } else if (tokenId == 2) {
            return URL_2;
        } else if (tokenId == 3) {
            return URL_3;
        } else if (tokenId == 4) {
            return URL_4;
        } else if (tokenId == 5) {
            return URL_5;
        } else if (tokenId == 6) {
            return URL_6;
        } else if (tokenId == 7) {
            return URL_7;
        } else {
            return URL_8;
        }
    }

    // Function to simulate pseudorandomness (should be replaced in production by a call to a VRF e.g. Chainlink because it can be gamed otherwise)
    function get_randomness() private view returns (uint256) {
        return
            uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender)));
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

        // Mint shares of Casino
        _mint(msg.sender, tokensToMint);

        // Mint NFT (we have 9 NFT pictures)
        _mint(msg.sender, get_randomness() % 9, 1, "");
        update_max_bet();

        emit DepositFunds(msg.value, msg.sender);
    }

    // Function to withdraw funds
    function withdraw_funds(uint256 tokenAmount) public {
        require(balanceOf(msg.sender) >= tokenAmount, "Insufficient BB tokens");
        uint256 ethToWithdraw = (address(this).balance * tokenAmount) /
            totalSupply();
        _burn(msg.sender, tokenAmount);
        payable(msg.sender).transfer(ethToWithdraw);
        update_max_bet();

        emit WithdrawFunds(ethToWithdraw, msg.sender);
    }

    // Internal/Private functions

    // Function to update the max bet
    function update_max_bet() private {
        current_max_bet = address(this).balance / 10;
    }
}

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// This contract is just for testing
contract TestContract is ERC20 {
    address payable block_bet_collective;
    uint256 public current_max_bet;
    uint256 public coinflip_win_percentage = 55;
    bool public last_bet_invoke_won;
    address public last_msg_sender;

    // Constructor
    constructor(
        address payable _block_bet_collective
    ) ERC20("BlockBet Token", "BB") {
        block_bet_collective = _block_bet_collective;
    }

    receive() external payable {}

    function withdraw() external {
        payable(last_msg_sender).transfer(address(this).balance);
    }

    // Function to bet
    function bet() public payable {
        TestContract(block_bet_collective).bet{value: msg.value}();
        last_msg_sender = msg.sender;

        if (get_randomness() > coinflip_win_percentage) {
            last_bet_invoke_won = true;
        } else {
            last_bet_invoke_won = false;
        }
    }

    // Function to simulate pseudorandomness (should be replaced in production by a call to a VRF e.g. Chainlink because it can be gamed otherwise)
    function get_randomness() public view returns (uint256) {
        return
            uint256(
                keccak256(abi.encodePacked(block.timestamp, address(this)))
            ) % 100;
    }
}

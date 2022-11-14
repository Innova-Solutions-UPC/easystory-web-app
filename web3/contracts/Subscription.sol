// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CSubscription {
    uint256 totalWaves;

    event NewSubscription(address indexed from, uint256 timestamp, uint price, string since, string monthDuration);

    struct Subscription {
        address waver;
        uint price;
        string from;
        string monthDuration;
        uint256 timestamp;
    }

    Subscription[] subscriptions;

    mapping(address => uint256) public lastSubscriptionAt;

    constructor() payable {
    }

    function subscript(uint  _price, string memory from, string memory monthDuration) public {
        require(
            lastSubscriptionAt[msg.sender] + 60 seconds < block.timestamp,
            "Please wait 60 seconds before waving again."
        );

        lastSubscriptionAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has added!", msg.sender);

        subscriptions.push(Subscription(msg.sender, _price,from,monthDuration, block.timestamp));

        emit NewSubscription(msg.sender, block.timestamp, _price, from, monthDuration);
    }

    function getAllWaves() public view returns (Subscription[] memory) {
        return subscriptions;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}

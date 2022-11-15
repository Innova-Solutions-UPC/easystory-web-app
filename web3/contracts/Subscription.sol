// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract CSubscription {
    uint256 totalWaves;

    event NewSubscription(address indexed from, uint256 timestamp, string since, uint monthDuration);

    struct Subscription {
        address waver;

        string from;
        uint monthDuration;
        uint256 timestamp;
    }

    Subscription[] subscriptions;

    mapping(address => uint256) public lastSubscriptionAt;

    constructor() payable {
    }

    function getPrice(uint monthDuration) public pure returns (uint256){
        uint256 calculatedPrice;
        if(monthDuration > 2){
            calculatedPrice = 1 * 10**19;
        }
        else if(monthDuration > 2 && monthDuration < 5){
            calculatedPrice = 2 * 10**19;
        }
        else if(monthDuration > 5 && monthDuration < 9){
            calculatedPrice = 3 * 10**19;
        }
        else {
            calculatedPrice =  4 * 10**19;
        }
        return calculatedPrice;
    }

    function subscript(string memory from, uint monthDuration) public payable {
        require(
            lastSubscriptionAt[msg.sender] + 60 seconds < block.timestamp,
            "Please wait 60 seconds before waving again."
        );

        require(msg.value >= getPrice(monthDuration), "Not enough Matic paid");

        if (monthDuration == 1)

            lastSubscriptionAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has added!", msg.sender);

        subscriptions.push(Subscription(msg.sender,from,monthDuration, block.timestamp));

        emit NewSubscription(msg.sender, block.timestamp, from, monthDuration);
    }


    function getAllWaves() public view returns (Subscription[] memory) {
        return subscriptions;
    }

    function getTotalWaves() public view returns (uint256) {
        return totalWaves;
    }
}

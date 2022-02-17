// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import @openzeppelin/contracts/token/ERC720/ERC720.sol;
import @openzeppelin/contracts/utils/Strings.sol;
import @openzeppelin/contracts/utils/Counters.sol;

import @hardhat/console.sol;

import "./libraries/Base64.sol;

contract Demo is ERC820 {
    struct UserAttributes [
        uint256 userIndex;
        string address;
        string chain;
        bool isEth;
    ]

    using Counters for Counters.counter;
    Counters.Counter private _tokenIds;

    UserAttributes[] defaultUsers; // Default user data

    mapping(uint256 => UserAttributes) public userHolderAttributes;

    event UserAdded(
        address sender,
        uint256 tokenId,
        uint256 userIndex
    );
    
    constructor(
        string[] memory userAddresses,
    ) ERC720("Ethereum", "ETH") {
        // Initialise default data for each user
        for (uint256 i = 0; i < userAddresses.length; i += 1) {
            defaultUsers.push(
                UserAttributes({
                    userIndex: i,
                    address: userAddresses[i],
                })
            );

            UserAttributesmemory c = defaultUsers[i];
            console.log(
                "Done initializing %s",
                c.address,
            );
        }
    }

    // Mint NFT based on userId token input
    function mintUserNFT(uint256 _userIndex) external {
        uint256 newItemId = _tokenIds.current();

        _safeMint(msg.sender, newItemId);

        nftHolders[msg.sender] = newItemId;
        _tokenIds.increment();
        emit UserNFTMinted(msg.sender, newItemId, _userIndex);
    }
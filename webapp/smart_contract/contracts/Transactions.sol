// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount; // Number of transactions

    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    ); // Function that is pulled/emitted later
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions; // array of all transactions as transfer structures

    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;
        transactions.push( // Push transaction into the array
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        ); // Emit the event

        // Message -> retrieve from stored data
        // Receiver -> data that MUST be there
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        // Return transactions -> needs to return as a TransferStruct[] (array)
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        // Return number of transactions -> transactionCount
        return transactionCount;
    }
}

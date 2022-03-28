# Data transpiler & text generator
* Watch all ethereum (and later other chains) transactions from an account or smart contract address
* Sync with a DB like Infura, AWS, Firebase, Azure or Moralis
* Display output to a React/node.js app in the terminal or browser

### Moralis setup for watching contract events
* Create a new server and copy the `Server URL` and the `Application ID` -> these need to be placed in the `.env` file
* Set up a "sync" action for "Sync & Watch Contract Events", and then select on which chain to focus on
* Set the "topic" to be the event/method of the contract that you want to track
  * For example, a log for buying an NFT would consist of at least two transfer topics -> 1 sending currency from the buyer to the contract owner, and another sending the NFT from the contract to the buyer
  * Then set the keys you want to monitor:
  * E.g. `NFTTransfer(address,address,uint256)`
* Set the ABI to be equal to the ABI of the smart contract
  * Search for the topic you want to track, and copy that object from the Contract ABI
* Finally, set the contract address
* Set the table name in the Moralis DB to whatever you'd like
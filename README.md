# Artfi Task by Gabriel Fialho

This repository contains a backend system to interact with TestNFT smart contract: https://testnet.snowtrace.io/address/0xEf0071536081Dce8B0233A4D1dF508e3FDe32Aa4#code

# APIs

**POST /mint and /mintError**: APIs to invoke mint and mintError functions of the contract.

Body Parameters:

- id: string (required) - id of the NFT
- amount: string (required) - amount of NFT you want to mint
- privateKey: string (required) - the wallet's private key you want the NFT go to.

# How to Run

1. First you need to install all packages with:
   `npm install`
2. Start the ExpressJs server:
   `npm run start`
3. Send request to the APIs:

- Mint: http://localhost:3000/api/mint
- MintError: http://localhost:3000/api/mintError

## Example of Request:

`{ "id": 1, "amount": 1, "privateKey": "123456" }`

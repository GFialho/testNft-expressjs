# Artfi Task by Gabriel Fialho

This repository contains a backend system to interact with TestNFT smart contract: https://testnet.snowtrace.io/address/0xEf0071536081Dce8B0233A4D1dF508e3FDe32Aa4#code

# APIs

**POST /sign**: API to sign a transaction (just for testing purpose), it returns a signed transaction to be used on the other endpoints.

Body Parameters:

- id: string (required) - id of the NFT
- amount: string (required) - amount of NFT you want to mint
- privateKey: string (required) - the wallet's private key you want the NFT go to
- method: string (required) - function name that you want to call from the contract, for example "mint"

**POST /mint and /mintError**: APIs to invoke mint and mintError functions of the contract.

Body Parameters:

- signedTransaction: string (required) - the signed transaction to be broadcasted to blockchain

# How to Run

1. First you need to install all packages with:
   `npm install`
2. Start the ExpressJs server:
   `npm run start`
3. Send request to the APIs:

- Sign: http://localhost:3000/api/sign
- Mint: http://localhost:3000/api/mint
- MintError: http://localhost:3000/api/mintError

## Example of Request:

`{ "signedTransaction": "0xf8ac0d8505d21dba0082799394ef0071536081dce8b0233a4d1df508e3fde32aa480b8441b2ef1ca00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000001830150f5a0b9121a9790f0353e423dc4bc33a8f30312b8c17dd4ebfdf670f76c8e99be8027a06c6fc18139540241333ce952d0e8c9420dfe755f11e7a1a3a39e6060a23e675f" }`

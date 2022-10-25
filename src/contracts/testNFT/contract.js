/* eslint-disable no-underscore-dangle */
const { ethers } = require('ethers');
const abi = require('./abi.json');

class TestNFTContract {
  constructor(signer) {
    this._contractAddress = '0xEf0071536081Dce8B0233A4D1dF508e3FDe32Aa4';
    this._provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
    this._wallet = new ethers.Wallet(signer, this._provider);
    this._contract = new ethers.Contract(
      this._contractAddress,
      new ethers.utils.Interface(abi),
      this._wallet,
    );
  }

  async call(functionName, ...functionArguments) {
    const gasPrice = await this._provider.getGasPrice();

    const estimatedGas = await this._contract.estimateGas[functionName](...functionArguments);

    const response = await this._contract[functionName](...functionArguments, {
      gasLimit: estimatedGas,
      gasPrice,
    });

    return response;
  }
}

module.exports = { TestNFTContract };

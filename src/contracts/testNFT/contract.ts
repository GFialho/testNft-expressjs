import { ethers } from "ethers";
const abi = require("../../contracts/testNFT/abi.json");

class TestNFTContract {
  provider: ethers.providers.JsonRpcProvider;
  interface: ethers.utils.Interface;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      "https://api.avax-test.network/ext/bc/C/rpc"
    );
    this.interface = new ethers.utils.Interface(abi);
  }

  _verify(signedTransaction: string) {
    const decodedTransaction = ethers.utils.parseTransaction(signedTransaction);

    if (decodedTransaction.chainId !== 43113)
      throw new Error("Chain Id incorrect");

    const decodedInput = this.interface.parseTransaction({
      data: decodedTransaction.data,
      value: decodedTransaction.value,
    });

    const functionName = decodedInput.functionFragment.name;
    const args = decodedInput.args;

    if (functionName !== "mint" && functionName !== "mintError")
      throw new Error("Method incorrect for TestNFT Contract");

    if (args.length !== 2)
      throw new Error(
        "Arguments are not correct, it must have 2: id and amount"
      );
  }

  async send(signedTransaction: string) {
    this._verify(signedTransaction);

    const submittedTx = await this.provider.sendTransaction(signedTransaction);
    return submittedTx;
  }
}

module.exports = { TestNFTContract };

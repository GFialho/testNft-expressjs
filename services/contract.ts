import { ethers } from "ethers";
const abi = require("../config/testNFT/abi.json");

export class TestNFTContract {
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
    try {
      this._verify(signedTransaction);

      const submittedTx = await this.provider.sendTransaction(
        signedTransaction
      );
      return submittedTx;
    } catch (error: any) {
      const code = error.error?.error?.data?.replace("Reverted ", "");

      let reason = code
        ? ethers.utils.toUtf8String("0x" + code.substr(138))
        : null;

      console.log(`Revert reason: ${reason}`);

      error.reason = reason ? `Revert reason: ${reason}` : error.reason;
      throw error;
    }
  }
}

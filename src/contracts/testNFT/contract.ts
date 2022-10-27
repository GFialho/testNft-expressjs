import { ethers } from "ethers";

class TestNFTContract {
  provider: ethers.providers.JsonRpcProvider;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      "https://api.avax-test.network/ext/bc/C/rpc"
    );
  }

  async send(signedTransaction: string) {
    const submittedTx = await this.provider.sendTransaction(signedTransaction);
    return submittedTx;
  }
}

module.exports = { TestNFTContract };

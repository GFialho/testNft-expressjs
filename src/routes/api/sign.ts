import express from "express";
import { ethers } from "ethers";
const abi = require("../../contracts/testNFT/abi.json");

const router = express.Router();

router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { id, amount, privateKey, method } = req.body;

      const contractAddress = "0xEf0071536081Dce8B0233A4D1dF508e3FDe32Aa4";
      const provider = new ethers.providers.JsonRpcProvider(
        "https://api.avax-test.network/ext/bc/C/rpc"
      );
      const wallet = new ethers.Wallet(privateKey, provider);

      const contract = new ethers.Contract(
        contractAddress,
        new ethers.utils.Interface(abi),
        wallet
      );

      const gasPrice = await provider.getGasPrice();

      const estimatedGasLimit = await contract.estimateGas[method](id, amount);

      const txUnsigned = await contract.populateTransaction[method](id, amount);

      txUnsigned.gasLimit = estimatedGasLimit;
      txUnsigned.gasPrice = gasPrice;
      txUnsigned.nonce = await provider.getTransactionCount(
        await wallet.getAddress()
      );
      txUnsigned.chainId = 43113;

      const txSigned = await wallet.signTransaction(txUnsigned);

      res.status(200);
      res.send({ txSigned });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;

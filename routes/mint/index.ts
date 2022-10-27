import express from "express";

const router = express.Router();
import { TestNFTContract } from "../../services/contract";

router.post(
  "/",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { signedTransaction } = req.body;
      const testNFTContract = new TestNFTContract();

      await testNFTContract.send(signedTransaction);

      res.status(200);
      res.send();
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

export default router;

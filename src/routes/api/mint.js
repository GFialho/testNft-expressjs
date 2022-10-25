const express = require('express');

const router = express.Router();
const { TestNFTContract } = require('../../contracts/testNFT/contract');

router.post('/', async (req, res, next) => {
  try {
    const { id, amount, privateKey } = req.body;
    const testNFTContract = new TestNFTContract(privateKey);

    await testNFTContract.call('mint', id, amount);

    res.status(200);
    res.send();
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;

const express = require('express');

const app = express();
const mintRouter = require('./src/routes/api/mint');
const mintErrorRouter = require('./src/routes/api/mintError');

app.use(express.json());
app.use('/api/mint', mintRouter);
app.use('/api/mintError', mintErrorRouter);

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      name: err.code,
      message: err.reason,
    },
  });
});

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server.address().port}`);
});

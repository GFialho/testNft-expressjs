import express from "express";

const app = express();
import mintRouter from "./src/routes/api/mint";
import mintErrorRouter from "./src/routes/api/mintError";
import signRouter from "./src/routes/api/sign";

app.use(express.json());
app.use("/api/mint", mintRouter);
app.use("/api/mintError", mintErrorRouter);
app.use("/api/sign", signRouter);

// eslint-disable-next-line no-unused-vars
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({
      error: {
        name: err.code,
        message: err.reason,
      },
    });
  }
);

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Listening on port ${server?.address()?.port}`);
}) as any;

import mintRouter from "./mint";
import mintErrorRouter from "./mintError";
import signRouter from "./sign";

const routes = (app: any) => {
  app.use("/api/mint", mintRouter);
  app.use("/api/mintError", mintErrorRouter);
  app.use("/api/sign", signRouter);
};

export default routes;

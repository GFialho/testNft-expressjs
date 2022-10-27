import express from "express";
import routes from "../routes";

class ExpressLoader {
  server: import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >;
  constructor(config: { port: number }) {
    const app = express();

    app.use(express.json());

    routes(app);

    // Setup error handling
    app.use(ExpressLoader.errorHandler);

    // Start application
    this.server = app.listen(config.port, () => {
      console.log(`Express running, now listening on port ${config.port}`);
    });
  }

  get Server() {
    return this.server;
  }

  static errorHandler(
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ): any {
    res.status(err.status || 500);
    res.json({
      error: {
        name: err.code,
        message: err.reason || err.message,
      },
    });
  }
}

export default ExpressLoader;

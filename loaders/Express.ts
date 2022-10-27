import express from "express";
import routes from "../routes";

class ExpressLoader {
  server: import("http").Server<
    typeof import("http").IncomingMessage,
    typeof import("http").ServerResponse
  >;
  constructor(config: { port: number }) {
    const app = express();

    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);

    app.use(express.json());

    routes(app);

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

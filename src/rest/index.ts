import express, { Express, ErrorRequestHandler, RequestHandler } from 'express';
import debug from 'debug';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { NotFound, MockcordError } from './errors';

import routes from './routes';

const dbgLog = debug("mockcord:api");

export class Rest {
  private app: Express;

  constructor() {
    this.app = express();
    this.start();
  }

  public start() {
    const port = 5000;

    this.app.use(bodyParser.json());
    this.app.use(morgan("dev"));
    this.app.use(cors());

    this.app.use(routes);

    this.app.use(((_req, _res, next) => {
      let error = new NotFound();
      next(error);
    }) as RequestHandler);

    this.app.use(((error: MockcordError, req, res, _next) => {
      res.status(error.status || 500);

      if (error.code !== 0) {
        console.log(error);
      }

      res.send({
        message: error.code ? error.message : `${error.status}: ${error.message}`,
        code: error.code
      });
    }) as ErrorRequestHandler);

    this.app.listen(port, () => dbgLog("API listening on port", port));
  }
}
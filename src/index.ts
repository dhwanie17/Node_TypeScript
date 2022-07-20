/**
 * Required External Modules
 */
import * as dotenv from 'dotenv';
import express,{ Express } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import * as routes from './routes/';
import { logger } from 'logger/Logger';
import { environment } from 'config';
import { errorHandlerMiddleware, responseHandling } from 'middleware';
import { I18n } from 'i18n';
import path from 'path';
dotenv.config();

const i18n = new I18n();
i18n.configure({
  locales: [ 'en', 'de' ],
  directory: path.join(__dirname, './locales')
});

if (!environment.port) {
  process.exit(1);
}
const PORT: number = environment.port || 3000;

export class Server {
  private app: Express;
  constructor() {
    this.app = express();
    this.app.use(i18n.init);
    this.app.use(cors({
      optionsSuccessStatus: 200
    }));
    this.app.use(urlencoded({
      extended: true
    }));
    this.app.use(json());
    this.app.use(responseHandling);
    routes.initRoutes(this.app);
    this.app.use(errorHandlerMiddleware);
    this.app.listen(PORT, () => {
      logger.info(`👍 Server successfully started at port ${PORT}`);
    });
  }

  getApp() {
    return this.app;
  }
}
new Server();


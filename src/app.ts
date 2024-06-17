import dotenv from "dotenv";
import express from "express";
import { useExpressServer } from "routing-controllers";
import "reflect-metadata";
dotenv.config();

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.setupControllers();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  setupControllers() {
    useExpressServer(this.app, {
      controllers: [__dirname + "/controllers/*.{ts,js}"],
    });
  }
}

export default new App().app;

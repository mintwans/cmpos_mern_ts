import * as express from "express";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import jwt from "./utils/jwt";
import * as cors from "cors";

console.log("process.env.ROOT_PATH: " + process.env.ROOT_PATH);

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(express.static(process.env.ROOT_PATH + "/uploaded"));

    // register express routes from defined application routes

    Routes.forEach((route) => {
      (app as any)[route.method](
        "/api/v2" + route.route,
        // (req, res, next) => {},
        // (req, res, next) => {},
        // (req, res, next) => {},
        jwt.verify,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](req, res, next);
          if (result instanceof Promise) {
            result.then((result) => (result !== null && result !== undefined ? res.send(result) : undefined));
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // setup express app here
    // ...

    // start express server
    app.listen(8081);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");
  })
  .catch((error) => console.log(error));
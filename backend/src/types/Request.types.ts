import { Query } from "typeorm/driver/Query";
import * as Express from "express";

export interface TypedBodyRequest<U> extends Express.Request {
  body: U;
}

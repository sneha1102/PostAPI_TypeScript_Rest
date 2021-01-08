import express from "express";
import { Server } from "typescript-rest";
import bodyparser from "body-parser";
import dotenv from "dotenv";

import apiCallService from "./controller/index";
import { MongoConnectorClass } from "./mongoConnector";

let app: express.Application = express();
app.use(bodyparser.urlencoded({ extended: true }));
dotenv.config();

//register services
Server.buildServices(app, ...apiCallService);

//listening to port 3000
app.listen(3000, () => {
  console.log("listening on port 3000!");

  //connect to database
  MongoConnectorClass.mongooseConnection();
});

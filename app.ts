import express from "express";
import { Server } from "typescript-rest";
import mongoose from "mongoose";
import bodyparser from "body-parser";

import apiCallService from "./controller/index";
import { ExcelFileController } from "./controller/ExcelFileController";
//mongoose connection

const mongooseConnection = () => {
  mongoose
    .connect("mongodb://localhost/PostTypeRest", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected To mongodb"))
    .catch((err) => console.log(err));
};

let app: express.Application = express();
app.use(bodyparser.urlencoded({ extended: true }));
//register services
Server.buildServices(app, ExcelFileController);

//listening to port 3000
app.listen(3000, () => {
  console.log("listening on port 3000!");

  //connect to database
  mongooseConnection();
});

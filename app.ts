import express from "express";
import { Server } from "typescript-rest";
import mongoose from "mongoose";

import apiCallService from "./controller/index";

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

//register services
Server.buildServices(app, ...apiCallService);

//listening to port 3000
app.listen(3000, () => {
  console.log("listening on port 3000!");

  //connect to database
  mongooseConnection();
});

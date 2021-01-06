import express from "express";
import { Server, Path, GET, PathParam, POST } from "typescript-rest";
import mongoose from "mongoose";
import apiCallService from "./controller/apiCall";

//mongoose connection

mongoose
  .connect("mongodb://localhost/PostTypeRest", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Connected To mongodb"))
  .catch((err) => console.log(err));

let app: express.Application = express();

//register services
Server.buildServices(app, ...apiCallService);

//listening to port 3000
app.listen(3000, function () {
  console.log("listening on port 3000!");
});

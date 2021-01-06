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

Server.buildServices(app, ...apiCallService);

app.listen(3000, function () {
  console.log("listening on port 3000!");
});

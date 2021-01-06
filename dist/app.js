"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const typescript_rest_1 = require("typescript-rest");
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./controller/index"));
//mongoose connection
const mongooseConnection = () => {
    mongoose_1.default
        .connect("mongodb://localhost/PostTypeRest", {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
    })
        .then(() => console.log("Connected To mongodb"))
        .catch((err) => console.log(err));
};
let app = express_1.default();
//register services
typescript_rest_1.Server.buildServices(app, ...index_1.default);
//listening to port 3000
app.listen(3000, () => {
    console.log("listening on port 3000!");
    //connect to database
    mongooseConnection();
});

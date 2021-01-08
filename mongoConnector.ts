import mongoose from "mongoose";

//mongoose connection
export function mongooseConnection() {
  mongoose
    .connect("mongodb://localhost/PostTypeRest", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(() => console.log("Connected To mongodb"))
    .catch((err) => console.log(err));
}

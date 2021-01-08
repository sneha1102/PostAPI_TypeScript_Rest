import mongoose from "mongoose";

export class MongoConnectorClass {
  //mongoose connection
  public static mongooseConnection(): void {
    mongoose
      .connect(process.env.URL_MONGO, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      .then(() => console.log("Connected To mongodb"))
      .catch((err) => console.log(err));
  }
}

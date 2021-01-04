import * as express from "express";
import { Server, Path, GET, PathParam } from "typescript-rest";

@Path("/hello")
class HelloService {
  @Path(":name")
  @GET
  sayHello(@PathParam("name") name: string): string {
    return "Hello " + name;
  }
}

let app: express.Application = express();

Server.buildServices(app);

app.listen(3000, function () {
  console.log("listening on port 3000!");
});

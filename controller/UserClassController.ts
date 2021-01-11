import { GET, Path, PathParam, POST } from "typescript-rest";
import { Inject } from "typescript-ioc";

import { UserModel, MessageModel } from "../model/index";
import { UserService } from "../services/index";

@Path("/users")
export class UserClassController {
  @Inject
  private injectedService: UserService;

  //to add new user "/users"
  @POST
  public addNewUser(user: UserModel): Object {
    return this.injectedService.addNewUser(user);
  }

  //to get user by id "/users/:id"
  @GET
  @Path(":id")
  public async getUserById(@PathParam("id") id: string): Promise<Object> {
    return this.injectedService.getUserById(id);
  }

  //to get all users "/users"
  @GET
  public async getAllUser(): Promise<Object> {
    return this.injectedService.getAllUser();
  }

  //to send message "/users/:senderId/messages"
  @POST
  @Path(":senderId")
  public sendMessage(
    @PathParam("senderId") senderId: string,
    message: MessageModel
  ): Object {
    return this.injectedService.sendMessage(senderId, message);
  }

  //to get all messages by time "/users/:userId/messages"
  @GET
  @Path(":userId/messages")
  public async getAllMessageByTime(
    @PathParam("userId") userId: string
  ): Promise<Object> {
    return this.injectedService.getAllMessageByTime(userId);
  }
}

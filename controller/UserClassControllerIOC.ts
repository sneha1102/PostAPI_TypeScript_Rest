import { GET, Path, PathParam, POST } from "typescript-rest";

import { UserModel } from "../model/user";
import { MessageModel } from "../model/message";
import { UserService } from "../services/UserServiceIOC";
import { Inject } from "typescript-ioc";

@Path("/users")
export class UserClassControllerIOC {
  @Inject
  private injectedService: UserService;

  //to add new user "/users"

  @POST
  public addNewUser(user: UserModel): Promise<UserModel> {
    return this.injectedService.addNewUser(user);
  }

  //to get user by id "/users/:id"

  @GET
  @Path(":id")
  public async getUserById(@PathParam("id") id: string): Promise<UserModel> {
    return this.injectedService.getUserById(id);
  }

  //to get all users "/users"

  @GET
  public async getAllUser(): Promise<Array<UserModel>> {
    return this.injectedService.getAllUser();
  }

  //to send message "/users/:senderId/messages"

  @POST
  @Path(":senderId")
  public async sendMessage(
    @PathParam("senderId") senderId: string,
    message: MessageModel
  ): Promise<MessageModel> {
    return this.injectedService.sendMessage(senderId, message);
  }

  //to get all messages by time "/users/:userId/messages"

  @GET
  @Path(":userId/messages")
  public async getAllMessageByTime(
    @PathParam("userId") userId: string
  ): Promise<Array<MessageModel>> {
    return this.injectedService.getAllMessageByTime(userId);
  }
}

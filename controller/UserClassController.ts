import { GET, Path, PathParam, POST } from "typescript-rest";
import { Inject } from "typescript-ioc";

import { UserModel, MessageModel } from "../model";
import { UserService } from "../services";

@Path("/users")
export class UserClassController {
  @Inject
  private injectedService: UserService;

  //to add new user "/users"
  @POST
  public async addNewUser (user: UserModel): Promise<UserModel> {
    return this.injectedService.addNewUser(user);
  }

  //to get user by id "/users/:id"
  @GET
  @Path(":id")
  public async getUserById(@PathParam("id") id: string): Promise<UserModel>{
    return this.injectedService.getUserById(id);
  }

  //to get all users "/users"
  @GET
  public async getAllUser(): Promise<UserModel[]> {
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
  ): Promise<MessageModel[]> {
    return this.injectedService.getAllMessageByTime(userId);
  }
}

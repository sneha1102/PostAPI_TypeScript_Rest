import { UserModel,MessageModel } from '../model';

export abstract class UserService
{
   /**
   * Create new user
   * @param user UserModel data
   * @return user UserModel
   */
  public abstract addNewUser (user: UserModel): Promise<UserModel>;
  
  /**
     * Returns a user info
     * @param id user identity
     * @return user UserModel
     */
  public abstract getUserById (id: string): Promise<UserModel>;
  
  /**
     * Returns array of user
     * @return user UserModel[]
     */
  public abstract getAllUser (): Promise<UserModel[]>;
  
  /**
   * Create new message
   * @param senderId User identity
   * @param message MessageModel
   * @return message MessageModel
   */
  public abstract sendMessage (senderId: string, message: MessageModel): Promise<MessageModel>
  
  /**
     * Returns array of message
     * @param userId user identity
     * @return array of message MessageModel[]
     */
  public abstract getAllMessageByTime(userId: string): Promise<MessageModel[]>;
}

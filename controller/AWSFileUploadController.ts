import { Inject } from "typescript-ioc";
import { FileParam, Path, POST } from "typescript-rest";

import { AWSFileUploadService } from "../services/index";

@Path("/aws")
export class AWSFileUploadController {
  @Inject
  public injectedService: AWSFileUploadService;

  //upload file to aws s3
  @POST
  @Path("posts")
  public fileUploadToAwsS3(
    @FileParam("file") imageFile: Express.Multer.File
  ): String {
    return this.injectedService.fileUploadToAwsS3(imageFile);
  }
}

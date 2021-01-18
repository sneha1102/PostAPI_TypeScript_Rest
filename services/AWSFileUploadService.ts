export abstract class AWSFileUploadService
{
   /**
   * Upload new image file to aws s3
   * @param file: Express.Multer.File
   * @return file uploaded to s3
   */
  public abstract fileUploadToAwsS3(image: Express.Multer.File): Promise<{message:string}>;
}

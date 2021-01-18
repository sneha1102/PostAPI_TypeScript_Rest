import { Container } from "typescript-ioc";
import S3 from "aws-sdk/clients/s3";
import {Errors} from 'typescript-rest';

import { fileExtensionValidatorClass,isFileEmptyClass } from "../../validator";
import {AWSFileUploadService} from '../AWSFileUploadService';

export class AWSFileUploadServiceImpl implements AWSFileUploadService
{
    /**
   * Upload new image file to aws s3
   * @param file: Express.Multer.File
   * @return file uploaded to s3
   */
  public async fileUploadToAwsS3 (file: Express.Multer.File): Promise<{message: string;}> {
    try
    {
    const imageFileExt: string = file.originalname.split(".")[1];
    let validImageExtension: string[] = ["jpg", "jpeg", "png"];

    //check image file extension
    if (
      !fileExtensionValidatorClass.isValidFileExtension(
        imageFileExt,
        validImageExtension
      )
    ) {
      return { message: "Please provide valid image file format" };
    }

    //check if file is empty
    if (!isFileEmptyClass.isFileEmpty(file)) {
      return { message: "Please upload valid image file" };
    }

    //s3 bucket config details
    const s3: S3 = new S3({
      accessKeyId: "*",
      secretAccessKey: "*",
    });
    const bucket = {
      Bucket: "*",
      Key: file.originalname,
      Body: file.buffer,
    };

    //upload file to s3  bucket
      s3.upload(bucket);
      return { message: "File Uploaded to AWS Bucket Successfully" };
    } catch (error) {
      throw new Errors.BadRequestError(error);
    }
  }
}
Container.bind(AWSFileUploadService).to(AWSFileUploadServiceImpl);

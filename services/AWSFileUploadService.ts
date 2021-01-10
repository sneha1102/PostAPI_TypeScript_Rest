import { Container } from "typescript-ioc";
import S3 from "aws-sdk/clients/s3";

import { imageFileExtensionValidatorClass } from "../validator/index";
import { isFileEmptyClass } from "../validator/index";

export abstract class AWSFileUploadService {
  public abstract fileUploadToAwsS3(image: Express.Multer.File): String;
}

export class AWSFileUploadServiceImpl implements AWSFileUploadService {
  public fileUploadToAwsS3(file: Express.Multer.File): String {
    //check image file extension
    const imageFileExt: string = file.originalname.split(".")[1];
    if (
      !imageFileExtensionValidatorClass.isValidImageFileExtension(imageFileExt)
    ) {
      return "Please provide valid image file format";
    }

    //check if file is empty
    if (!isFileEmptyClass.isFileEmpty(file)) {
      return "Please upload valid image file";
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
    try {
      //upload file to s3  bucket
      s3.upload(bucket);
      return "File Uploaded to AWS Bucket Successfully";
    } catch (error) {
      return error;
    }
  }
}
Container.bind(AWSFileUploadService).to(AWSFileUploadServiceImpl);

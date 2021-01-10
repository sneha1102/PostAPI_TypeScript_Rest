export class imageFileExtensionValidatorClass {
  //check for image file extension
  public static isValidImageFileExtension(fileExt: string): boolean {
    let validExtension: string[] = ["jpg", "jpeg", "png"];
    return validExtension.includes(fileExt, 0);
  }
}

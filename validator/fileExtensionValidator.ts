export class fileExtensionValidatorClass
{
  //function to check file extension
  public static isValidFileExtension(
    fileExt: string,
    validExtension: string[]
  ): boolean {
    return validExtension.includes(fileExt, 0);
  }
}

export class excelFileExtensionValidatorClass {
  //function to check file extension for excel file
  public static isValidExcelFileExtension(fileExt: string): boolean {
    if (fileExt === "xlsx") {
      return true;
    }
    return false;
  }
}

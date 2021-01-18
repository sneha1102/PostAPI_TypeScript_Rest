export class isFileEmptyClass
{
  //function to check if file is empty
  public static isFileEmpty(file: Express.Multer.File): boolean {
    if (file.buffer.length > 0) {
      return true;
    } else {
      return false;
    }
  }
}

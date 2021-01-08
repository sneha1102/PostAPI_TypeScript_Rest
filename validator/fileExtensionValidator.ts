//function to check file extension for excel file
export function fileExtensionValidator(file: Express.Multer.File): boolean {
  if (file.originalname.split(".")[1] === "xlsx") {
    return true;
  }
  return false;
}

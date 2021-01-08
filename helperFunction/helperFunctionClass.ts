import excelToJson from "convert-excel-to-json";

export class helperFunctionClass {
  //function to convert excel file to json format
  public static ExcelToJson(file: Express.Multer.File): Array<any> {
    const excelContent: Array<any> = excelToJson({
      source: file.buffer,
      header: {
        rows: 1,
      },
      columnToKey: {
        "*": "{{columnHeader}}",
      },
    }).Sheet1;
    return excelContent;
  }
}

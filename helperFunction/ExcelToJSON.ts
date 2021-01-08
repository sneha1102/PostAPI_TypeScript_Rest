import excelToJson from "convert-excel-to-json";

//function to convert excel file to json format
export default function ExcelToJson(file: Express.Multer.File): Array<any> {
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

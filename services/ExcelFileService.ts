import { Container } from "typescript-ioc";
import ExcelData, { ExcelDataModel } from "../model/excelData";

const excelToJson = require("convert-excel-to-json");
export abstract class ExcelFileService {
  public abstract addNewExcelSheet(
    file: Express.Multer.File
  ): Promise<ExcelDataModel>;
}

//implement excelfileservice

export class ExcelFileServiceImpl implements ExcelFileService {
  //add excelsheet data in mongodb

  public addNewExcelSheet(file: Express.Multer.File): Promise<ExcelDataModel> {
    //conversion of excel data to json

    const result = excelToJson({
      source: file.buffer,
      header: {
        rows: 1,
      },

      columnToKey: {
        "*": "{{columnHeader}}",
      },
    });

    //store excel data in mongodb

    return ExcelData.create(result.Sheet1);
  }
}
Container.bind(ExcelFileService).to(ExcelFileServiceImpl);

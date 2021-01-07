import { Inject } from "typescript-ioc";

import { ExcelDataModel } from "../model/index";
import { ExcelFileService } from "../services/index";
import { FileParam, Path, POST } from "typescript-rest";

@Path("/excelData")
export class ExcelFileController {
  //inject
  @Inject
  private injectedService: ExcelFileService;

  // add new excel sheet data in mongodb

  @POST
  public addNewExcelSheet(
    @FileParam("file") file: Express.Multer.File
  ): Promise<ExcelDataModel> {
    return this.injectedService.addNewExcelSheet(file);
  }
}

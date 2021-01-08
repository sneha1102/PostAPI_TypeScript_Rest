import { Inject } from "typescript-ioc";

import { EmpSalaryModel } from "../model/index";
import { EmpSalaryService } from "../services/index";
import { FileParam, Path, POST } from "typescript-rest";

@Path("/excelData")
export class EmpSalaryController {
  //inject
  @Inject
  private injectedService: EmpSalaryService;
  // add new excel sheet data in mongodb
  @POST
  public addNewExcelSheet(
    @FileParam("file") file: Express.Multer.File
  ): Promise<Array<EmpSalaryModel>> {
    return this.injectedService.addNewExcelSheet(file);
  }
}

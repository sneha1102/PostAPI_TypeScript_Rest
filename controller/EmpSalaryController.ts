import { Inject } from "typescript-ioc";

import { EmpSalaryModel } from "../model/index";
import { EmpSalaryService } from "../services/index";
import { FileParam, Path, POST } from "typescript-rest";

@Path("/empsal")
export class EmpSalaryController {
  @Inject
  private injectedService: EmpSalaryService;

  // add new excel sheet data in mongodb
  @POST
  public addNewExcelSheet(
    @FileParam("file") file: Express.Multer.File
  ): Promise<Array<EmpSalaryModel> | string> {
    return this.injectedService.addNewExcelSheet(file);
  }
}

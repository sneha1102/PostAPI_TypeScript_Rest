import { Inject } from "typescript-ioc";

import { EmpSalaryModel } from "../model/index";
import { EmpSalaryService } from "../services/index";
import { FileParam, Path, POST } from "typescript-rest";

@Path("/empsal")
export class EmpSalaryController {
  @Inject
  private injectedService: EmpSalaryService;

  // add new excel sheet with employee salary info in mongodb
  @POST
  public addNewExcelSheet(
    @FileParam("file") file: Express.Multer.File
  ): Object {
    return this.injectedService.addNewExcelSheet(file);
  }
}

import { Inject } from "typescript-ioc";
import {FileParam, Path, POST} from "typescript-rest";

import { EmpSalaryService } from "../services";


@Path("/empsal")
export class EmpSalaryController {
  @Inject
  private injectedService: EmpSalaryService;

  // add new excel sheet with employee salary info in mongodb
  @POST
  public async addNewExcelSheet(
    @FileParam("file") file: Express.Multer.File
  ): Promise<{message:string}> {
    return this.injectedService.addNewEmpSalaryInfo(file);
  }
}

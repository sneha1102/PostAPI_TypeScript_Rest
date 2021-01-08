import Joi from "joi";
import { Container } from "typescript-ioc";
import { helperFunctionClass } from "../helperFunction/helperFunctionClass";

import { EmpSalary, EmpSalaryModel } from "../model/index";
import {
  fileExtensionValidatorClass,
  fileContentValidatorClass,
} from "../validator/index";

export abstract class EmpSalaryService {
  public abstract addNewExcelSheet(
    file: Express.Multer.File
  ): Promise<Array<EmpSalaryModel>>;
}

//implement excelfileservice
export class EmpSalaryServiceImpl implements EmpSalaryService {
  //add excelsheet data in mongodb
  public async addNewExcelSheet(
    file: Express.Multer.File
  ): Promise<Array<EmpSalaryModel>> {
    try {
      //check for excel file extension
      if (fileExtensionValidatorClass.fileExtensionValidator(file)) {
        //conversion of emp salary data to json
        const result: Array<EmpSalaryModel> = helperFunctionClass.ExcelToJson(
          file
        );
        //file content/type validator
        let services: Joi.ArraySchema = fileContentValidatorClass.fileContentValidator();
        let test: Joi.ValidationResult = services.validate(result);
        if (test.error) {
          console.log("file content validation error");
          throw new Error();
        }
        // console.log(test.value);
        //store emp salary data from excel sheet to mongodb
        return EmpSalary.create(result);
      }
    } catch (err) {
      return err;
    }
  }
}
Container.bind(EmpSalaryService).to(EmpSalaryServiceImpl);

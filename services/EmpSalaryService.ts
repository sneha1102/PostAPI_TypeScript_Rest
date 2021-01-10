import Joi from "joi";
import { Container } from "typescript-ioc";
import { helperFunctionClass } from "../helperFunction/helperFunctionClass";

import { EmpSalary, EmpSalaryModel } from "../model/index";
import {
  excelFileExtensionValidatorClass,
  excelFileContentValidatorClass,
} from "../validator/index";

export abstract class EmpSalaryService {
  public abstract addNewExcelSheet(
    file: Express.Multer.File
  ): Promise<Array<EmpSalaryModel> | string>;
}

//implement excelfileservice
export class EmpSalaryServiceImpl implements EmpSalaryService {
  //add excelsheet data in mongodb
  public async addNewExcelSheet(
    file: Express.Multer.File
  ): Promise<Array<EmpSalaryModel> | string> {
    try {
      let fileExt: string = file.originalname.split(".")[1];

      //check for excel file extension
      if (
        !excelFileExtensionValidatorClass.isValidExcelFileExtension(fileExt)
      ) {
        return "Please provide valid excel file";
      } else {
        //conversion of emp salary data to json
        const result: Array<EmpSalaryModel> = helperFunctionClass.ExcelToJson(
          file
        );

        //file content/type validator
        let test: Joi.ValidationResult = excelFileContentValidatorClass.excelFileContentValidator(
          result
        );
        if (test.error) {
          //console.log("file content is not valid");
          //throw new Error();
          return "File content is not valid";
        }

        //store emp salary data from excel sheet to mongodb
        return EmpSalary.create(result);
      }
    } catch (err) {
      return err;
    }
  }
}
Container.bind(EmpSalaryService).to(EmpSalaryServiceImpl);

import Joi from "joi";
import { Container } from "typescript-ioc";

import { helperFunctionClass } from "../helperFunction/helperFunctionClass";
import { EmpSalary, EmpSalaryModel } from "../model/index";
import {
  fileExtensionValidatorClass,
  fileContentValidatorClass,
  isFileEmptyClass,
} from "../validator/index";

export abstract class EmpSalaryService {
  public abstract addNewExcelSheet(file: Express.Multer.File): Object;
}

//implement excelfileservice
export class EmpSalaryServiceImpl implements EmpSalaryService {
  //add excelsheet data in mongodb
  public addNewExcelSheet(file: Express.Multer.File): Object {
    try {
      let fileExt: string = file.originalname.split(".")[1];
      let validExcelExtension: string[] = ["xlsx"];

      //check for excel file extension
      if (
        !fileExtensionValidatorClass.isValidFileExtension(
          fileExt,
          validExcelExtension
        )
      ) {
        return { message: "Please provide valid excel file" };
      }

      //check if file is empty
      else if (!isFileEmptyClass.isFileEmpty(file)) {
        return { message: "Please upload valid image file" };
      }

      //conversion of emp salary data to json
      else {
        const excelResult: Array<EmpSalaryModel> = helperFunctionClass.ExcelToJson(
          file
        );

        //file content/type validator
        let test: Joi.ValidationResult = fileContentValidatorClass.isValidExcelFileContent(
          excelResult
        );
        if (test.error) {
          return { message: "File content is not valid" };
        }

        //store emp salary data from excel sheet to mongodb
        let result: Promise<Array<EmpSalaryModel>> = EmpSalary.insertMany(
          excelResult
        );
        return {
          message: "Employee salary info inserted successfully",
        };
      }
    } catch (err) {
      return { Error: err };
    }
  }
}
Container.bind(EmpSalaryService).to(EmpSalaryServiceImpl);

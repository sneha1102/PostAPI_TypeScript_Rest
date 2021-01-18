import Joi from 'joi';
import {Container} from 'typescript-ioc';
import {Errors} from 'typescript-rest';
import {EmpSalaryService} from '../EmpSalaryService';

import { helperFunctionClass } from '../../helperFunction/helperFunctionClass';
import {EmpSalary, EmpSalaryModel } from '../../model';
import
    {
        fileExtensionValidatorClass,
        fileContentValidatorClass,
        isFileEmptyClass,
} from '../../validator';
    

/**
 * Implementation of Employee Salary Service
`*/
export class EmpSalaryServiceImpl implements EmpSalaryService {
  
    /**
   * Create new employee salary info
   * @param file: Express.Multer.File
   * @return array of newly created employee salary info 
   */
  public  async addNewEmpSalaryInfo(file: Express.Multer.File): Promise<{message:string}> {
    try {
      let fileName: string[] = file.originalname.split(".");
      let fileExt: string = fileName[fileName.length - 1];
      let validExcelExtension: string[] = ["xlsx"];

      //check for excel file extension
      if (
        !fileExtensionValidatorClass.isValidFileExtension(
          fileExt,
          validExcelExtension
        )
      )
      {
        return { message: "Please provide valid excel file" };
      }

      //check if file is empty
      if (!isFileEmptyClass.isFileEmpty(file)) {
        return { message: "Please upload valid image file" };
      }

      //conversion of emp salary data to json
      const excelResult: Array<EmpSalaryModel> = helperFunctionClass.ExcelToJson(
        file
      );

      //file content validator
      let test: Joi.ValidationResult = fileContentValidatorClass.isValidExcelFileContent(
        excelResult
      );
      if (test.error) {
        return { message: "File content is not valid" };
      }

      //store emp salary data from excel sheet to mongodb
      await EmpSalary.insertMany(excelResult);
      return {
        message: "Employee salary info inserted successfully",
      };
    } catch (err) {
      throw new Errors.BadRequestError(err);
    }
  }
}
Container.bind(EmpSalaryService).to(EmpSalaryServiceImpl);

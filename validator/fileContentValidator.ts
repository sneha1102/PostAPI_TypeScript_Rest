import Joi from "joi";

import { EmpSalaryModel } from "../model/index";

export class fileContentValidatorClass {
  //fuction for validating file content
  public static isValidExcelFileContent(
    result: Array<EmpSalaryModel>
  ): Joi.ValidationResult {
    let service: Joi.ObjectSchema<any> = Joi.object().keys({
      EmpId: Joi.number().required(),
      Salary: Joi.number().required(),
      Name: Joi.string().allow(""),
    });

    let services: Joi.ArraySchema = Joi.array().items(service);
    let test: Joi.ValidationResult = services.validate(result);
    return test;
  }
}

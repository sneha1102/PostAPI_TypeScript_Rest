import Joi from "joi";

export class fileContentValidatorClass {
  //fuction for validating file content
  public static fileContentValidator(): Joi.ArraySchema {
    let service: Joi.ObjectSchema<any> = Joi.object().keys({
      EmpId: Joi.number().required(),
      Salary: Joi.number().required(),
      Name: Joi.string().allow(""),
    });

    let services: Joi.ArraySchema = Joi.array().items(service);
    return services;
  }
}

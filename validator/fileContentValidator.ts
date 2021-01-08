import Joi from "joi";

//fuction for validating file content
export function fileContentValidator(): Joi.ArraySchema {
  let service: Joi.ObjectSchema<any> = Joi.object().keys({
    EmpId: Joi.number().required(),
    Salary: Joi.number().required(),
    Name: Joi.string().allow(""),
  });

  let services: Joi.ArraySchema = Joi.array().items(service);
  return services;
}

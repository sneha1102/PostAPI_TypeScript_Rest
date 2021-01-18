import { Document, Schema, model,Model } from "mongoose";

export interface EmpSalaryModel extends Document {
  Name: String;
  EmpId: Number;
  Salary: Number;
}

//Employee Salary Schema
const empSalarySchema: Schema = new Schema(
  {
    Name: String,
    EmpId: {
      type: Number,
      required: true,
      unique: true,
      index: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

const EmpSalary : Model<EmpSalaryModel>= model<EmpSalaryModel>("EmpSalary", empSalarySchema);
export {EmpSalary};

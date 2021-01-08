import { Document, Schema, model } from "mongoose";

export interface EmpSalaryModel extends Document {
  Name: String;
  EmpId: Number;
  Salary: Number;
}

const empSalarySchema = new Schema(
  {
    Name: String,
    EmpId: {
      type: Number,
      required: true,
      //unique: true,
      //index: true,
    },
    Salary: {
      type: Number,
      required: true,
    },
  },

  { timestamps: true }
);

let EmpSalary = model<EmpSalaryModel>("EmpSalary", empSalarySchema);
export default EmpSalary;

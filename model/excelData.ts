import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ExcelDataModel extends Document {
  //excelData: Object;
  NAME: String;
  EMPID: Number;
  SALARY: Number;
}

const excelDataSchema = new mongoose.Schema(
  {
    //excelData: Object,
    NAME: String,
    EMPID: Number,
    SALARY: Number,
  },
  {
    timestamps: true,
  }
);

let ExcelData = mongoose.model<ExcelDataModel>("EXcelData", excelDataSchema);
export default ExcelData;

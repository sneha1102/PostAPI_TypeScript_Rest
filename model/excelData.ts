import mongoose from "mongoose";
import { Document } from "mongoose";

export interface ExcelDataModel extends Document {
  excelData: Object;
}

const excelDataSchema = new mongoose.Schema(
  {
    excelData: Object,
  },
  {
    timestamps: true,
  }
);

let ExcelData = mongoose.model<ExcelDataModel>("EXcelData", excelDataSchema);
export default ExcelData;

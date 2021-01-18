export abstract class EmpSalaryService
{
  /**
   * Create new employee salary info
   * @param file: Express.Multer.File
   * @return array of newly created employee salary info 
   */
  public abstract addNewEmpSalaryInfo(file: Express.Multer.File): Promise<{message:string}>;
}

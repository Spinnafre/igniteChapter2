import { ImportCategoryService } from "./importCategoryService";
import { importCategoryController } from "./importCategoryController";
import { CategoryRepository } from "../../infra/typeORM/repositories/CategoriesRepository";

export default (): importCategoryController => {
  const importCategoryRepository = new CategoryRepository();
  const importCatService = new ImportCategoryService(importCategoryRepository);
  const importCatController = new importCategoryController(importCatService);
  return importCatController;
};

import { CategoryRepository } from './../../repositories/CategoriesRepository';
import { ImportCategoryService } from "./importCategoryService";
import { importCategoryController } from "./importCategoryController";

export default (): importCategoryController => {
  const importCategoryRepository = new CategoryRepository();
  const importCatService = new ImportCategoryService(importCategoryRepository);
  const importCatController = new importCategoryController(importCatService);
  return importCatController;
};

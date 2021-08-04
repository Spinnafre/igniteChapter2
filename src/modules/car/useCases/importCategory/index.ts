import { CategoryRepository } from './../../repositories/CategoriesRepository';
import { ImportCategoryService } from './importCategoryService';
import { importCategoryController } from "./importCategoryController";

const importCategoryRepository=CategoryRepository.getInstance()
const importCatService=new ImportCategoryService(importCategoryRepository)
const importCatController=new importCategoryController(importCatService)
export{importCatController}
import { CategoryRepository } from './../../repositories/CategoriesRepository';
import { ShowCategoryController } from "./ShowCategoryController";
import { ShowCategoryService } from './ShowCategoryService';

const categoryRepository=CategoryRepository.getInstance()
const categoryService=new ShowCategoryService(categoryRepository)
const showCategoryController=new ShowCategoryController(categoryService)
export {showCategoryController}
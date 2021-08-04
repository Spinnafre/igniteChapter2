import { CategoryRepository } from "../../repositories/CategoriesRepository"
import { CategoryController } from "./CreateCategoryController"
import { CreateCategoryService } from "./CreateCategoryService"

const categoryRepository=CategoryRepository.getInstance()
const categoryService=new CreateCategoryService(categoryRepository)
const categoryController=new CategoryController(categoryService)

export {categoryController}
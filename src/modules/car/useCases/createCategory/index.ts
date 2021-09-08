import { CategoryRepository } from "../../infra/typeORM/repositories/CategoriesRepository"
import { CategoryController } from "./CreateCategoryController"
import { CreateCategoryService } from "./CreateCategoryService"


export default ():CategoryController => {
    const categoryRepository = new CategoryRepository()
    const categoryService = new CreateCategoryService(categoryRepository)
    const categoryController = new CategoryController(categoryService)
    return categoryController
}
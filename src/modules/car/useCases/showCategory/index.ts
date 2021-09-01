import { CategoryRepository } from "../../repositories/CategoriesRepository";
import { ShowCategoryController } from "./ShowCategoryController";
import { ShowCategoryService } from "./ShowCategoryService";

export default () => {
  const categoryRepository = new CategoryRepository();
  const categoryService = new ShowCategoryService(categoryRepository);
  const showCategoryController = new ShowCategoryController(categoryService);
  return showCategoryController;
};

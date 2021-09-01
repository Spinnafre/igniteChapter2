import { CategoryProtocol } from "../../Protocols/Category/categoryProtocol";
import { ICreateCategoryRepository } from "../../Protocols/Category/CategoryRespositoryProtocol";
export class ShowCategoryService {
  constructor(private categoryService: ICreateCategoryRepository) {}
  async execute(): Promise<Array<CategoryProtocol>> {
    return await this.categoryService.show();
  }
}

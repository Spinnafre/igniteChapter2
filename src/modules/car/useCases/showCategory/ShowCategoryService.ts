import { CategoryProtocol } from '../../Protocols/Category/categoryProtocol';
import { ICreateCategoryRepository } from '../../Protocols/Category/CategoryRespositoryProtocol';
export class ShowCategoryService{
    constructor(private categoryService:ICreateCategoryRepository){}
    execute():Array<CategoryProtocol>{
        return this.categoryService.show()
    }
}
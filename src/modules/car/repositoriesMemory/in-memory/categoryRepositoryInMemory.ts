import { Category } from "../../infra/typeORM/entities/category";
import { CategoryProtocol } from "../../Protocols/Category/categoryProtocol";
import { ICreateCategoryRepository } from "../../Protocols/Category/CategoryRespositoryProtocol";

class CategoryRepositoryInMemory implements ICreateCategoryRepository{
    private categoryRepository=[]
    async create({ name, description}: CategoryProtocol):Promise<void>{
        const category=new Category()
        Object.assign(category,{
            name,description
        })
        this.categoryRepository.push(category)
    }
    async show():Promise<Array<Category>>{
        return this.categoryRepository
    }
    async findByCategory(name:string):Promise<boolean>{
        const category=this.categoryRepository.find(cat=>cat.name==name)
        return category
    }
}

export {CategoryRepositoryInMemory} 
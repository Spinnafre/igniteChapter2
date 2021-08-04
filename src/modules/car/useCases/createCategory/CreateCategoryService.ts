import { CategoryProtocol } from "../../Protocols/Category/categoryProtocol"
import { ICreateCategoryRepository } from "../../Protocols/Category/CategoryRespositoryProtocol"

export class CreateCategoryService{
    constructor(private categoryRepository:ICreateCategoryRepository){}
    execute({name,description}:CategoryProtocol){
        if(this.categoryRepository.findByCategory(name)){
            throw new Error('Category already exists')
        }
        this.categoryRepository.create({name,description})
    }
}
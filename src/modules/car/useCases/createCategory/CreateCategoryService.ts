import { AppErrors } from '../../../../shared/errors/AppErrors';
import { CategoryProtocol } from "../../Protocols/Category/categoryProtocol"
import { ICreateCategoryRepository } from "../../Protocols/Category/CategoryRespositoryProtocol"

export class CreateCategoryService{
    constructor(private categoryRepository:ICreateCategoryRepository){}
    async execute({name,description}:CategoryProtocol):Promise<void>{
        if(await this.categoryRepository.findByCategory(name)){
            throw new AppErrors('Category already exists')
        }
        await this.categoryRepository.create({name,description})
    }
}
import { AppErrors } from "../../../../shared/errors/AppErrors"
import { ICategoryService } from "../../Protocols/Category/CreateCategoryService"
import { CategoryRepositoryInMemory } from "../../repositoriesMemory/in-memory/categoryRepositoryInMemory"
import { CreateCategoryService } from "./CreateCategoryService"

let categoryRepositoryInMemory:CategoryRepositoryInMemory
let categoryUseCase:ICategoryService
describe('Create Category', () => {
    // Antes de cada mock irá criar um novo repositório
    // para evitar com que fique dados armazenados sem necessidades
    beforeEach(() =>{
        categoryRepositoryInMemory=new CategoryRepositoryInMemory();
        categoryUseCase=new CreateCategoryService(categoryRepositoryInMemory);
    })
    it('Should be able to create a category',async ()=>{
        const category={
            name:"Consoles",
            description:"Category description for testing purposes"
        }

        await categoryUseCase.execute(category)

        const created=await categoryRepositoryInMemory.findByCategory(category.name)
        expect(created).toHaveProperty('id')
    })
    it('Should not be able to create a category with same name',async ()=>{
        const category={
            name:"Consoles",
            description:"Category description for testing purposes"
        }
        await categoryUseCase.execute(category)

        
        await expect(
            categoryUseCase.execute(category)
        ).rejects.toEqual(new AppErrors('Category already exists'))
    })
})
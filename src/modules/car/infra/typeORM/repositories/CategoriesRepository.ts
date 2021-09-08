import { CategoryProtocol } from './../../../Protocols/Category/categoryProtocol';
import { getRepository, Repository } from "typeorm";
import { ICreateCategoryRepository } from "../../../Protocols/Category/CategoryRespositoryProtocol";
import { Category } from "../entities/category";


export class CategoryRepository  implements ICreateCategoryRepository{
  // public categories: Array<CategoryProtocol>;
  private categories: Repository<Category>;
  constructor() {
    this.categories=getRepository(Category)
  }
  async create({ name, description}: CategoryProtocol): Promise<void>{
    const category=this.categories.create({
      name,
      description
    })
    await this.categories.save(category)

  }
  async show():Promise<Array<Category>>{
    return await this.categories.find()
  }
  async findByCategory(name:string):Promise<boolean>{
    const category=await this.categories.findOne({name})
    return !!category
  }
}

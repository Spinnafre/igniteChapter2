import { getRepository, Repository } from "typeorm";
import { Category } from "../entities/category";
import { CategoryProtocol } from "../Protocols/Category/categoryProtocol";
import { ICreateCategoryRepository} from "../Protocols/Category/CategoryRespositoryProtocol";

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

import { Category } from "../models/category";
import { CategoryProtocol } from "../Protocols/Category/categoryProtocol";
import { ICreateCategoryRepository} from "../Protocols/Category/CategoryRespositoryProtocol";

export class CategoryRepository  implements ICreateCategoryRepository{
  public categories: Array<CategoryProtocol>;
  private static INSTANCE:ICreateCategoryRepository|null=null
  private constructor() {
    this.categories=[]
  }
  static getInstance(){
    if(CategoryRepository.INSTANCE === null){
      CategoryRepository.INSTANCE=new CategoryRepository()
    }
    return CategoryRepository.INSTANCE
  }
  create({ name, description}: CategoryProtocol): void {
    const categorie: CategoryProtocol = new Category();
    Object.assign(categorie, {
      name,
      description,
      created_at:new Date(),
    });
    this.categories.push(categorie);
  }
  show():Array<CategoryProtocol>{
      return this.categories
  }
  findByCategory(name:string):boolean{
    let category=this.categories.some(c=>c.name===name)
    return category
  }
}

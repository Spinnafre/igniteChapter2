import { Category } from '../../entities/category';
import { CategoryProtocol } from './categoryProtocol';
export interface ICreateCategoryRepository{
    create({ name, description}: CategoryProtocol):Promise<void>,
    show():Promise<Array<Category>>,
    findByCategory(name:string):Promise<boolean>
}
import { CategoryProtocol } from './categoryProtocol';
export interface ICreateCategoryRepository{
    create({ name, description}: CategoryProtocol):void,
    show():Array<CategoryProtocol>,
    findByCategory(name:string):boolean
}
import { CategoryProtocol } from "./categoryProtocol";

export interface ICategoryService{
    execute({name,description}:CategoryProtocol):void
}
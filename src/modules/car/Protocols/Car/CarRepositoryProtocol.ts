import { ICar } from './CarProtocol';
export interface ICarRepository{
    create(data:ICar):Promise<ICar>,
    findByLicensePlate(license_plate:string):Promise<ICar>,
    findAvailable(category_id?:string,brand?:string,name?:string):Promise<ICar[]>
    findById(id:string):Promise<ICar>,
}
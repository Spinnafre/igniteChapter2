import { Category } from "modules/car/infra/typeORM/entities/category";
import { Specification } from "modules/car/infra/typeORM/entities/Specification";

export interface ICar{
    id?: string;
    name: string;
    description: string;
    daily_rate:number;
    available?:boolean;
    license_plate: string;
    fine_amount:number;
    brand:string;
    category_id:string;
    created_at?: Date;
    category?:Category
    specifications?:Specification[]
}
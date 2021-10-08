import { ICarsImage } from "./ICarsImage";

export interface ICarsImageRepository{
    create(car_id:string,image_name:string):Promise<ICarsImage>
}
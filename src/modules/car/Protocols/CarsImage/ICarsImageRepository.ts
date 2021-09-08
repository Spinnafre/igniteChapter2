import { ICarsImage } from "./ICarsImage";

export interface ICarsImageRepository{
    create(data: ICarsImage):Promise<ICarsImage>
}
import { ICarImageUseCase } from '../../Protocols/CarsImage/ICarImageUseCase/ICarImageUseCase';
import { Response,Request } from 'express';

interface IFile{
    filename: string;
}

export class CreateCarImagesController{
    constructor (private carImageUseCase:ICarImageUseCase){}
    async handle(req: Request, res: Response):Promise<Response>{
        const {id:car_id}=req.params
        const images=req.files as IFile[]

        const images_names=images.map(file =>{
            return file.filename
        })

        await this.carImageUseCase.execute({car_id,images_names})
        return res.status(201).json({msg:"Car Image created successfully"})
    }
}
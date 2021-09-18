import { Response,Request } from 'express';
import { RefreshTokenUseCase } from "./refreshTokenUseCase";

export class RefreshTokenController{
    constructor(private refreshTokenUseCase:RefreshTokenUseCase){}
    async handle(req:Request, res:Response){
        const refresh_token=req.body.token || req.query.token || req.headers['x-access-token'];
        const new_refresh_toke=await this.refreshTokenUseCase.execute(refresh_token)
        return res.status(201).json(new_refresh_toke)
    }
}
import { Response, Request } from "express";
import { IUserAuthService } from "../../Protocols/User/UserAuthService";
export class AuthenticateUserController {
    constructor(private userUserCase: IUserAuthService) { }
    async handle(req: Request, res: Response): Promise<Response> {
        const { email, password } = req.body;
        const userToken = await this.userUserCase.execute({ email, password });
        return res.status(200).json(userToken);

    }
}

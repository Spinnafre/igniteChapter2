import { Request } from "express";
import { Response } from "express";
import { IcreateUser } from "../../Protocols/User/CreateUserUserCase";
export class UserController {
  constructor(private createUserUserCase: IcreateUser) { }
  async handler(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body;

    await this.createUserUserCase.execute({
      name,
      email,
      password,
      driver_license,
    });
    return res.status(201).json({ msg: "Usuario criado com sucesso" });

  }
}

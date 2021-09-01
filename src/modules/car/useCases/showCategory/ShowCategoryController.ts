import { Request, Response } from "express";
import { CategoryProtocol } from "../../Protocols/Category/categoryProtocol";

interface ShowCategoryUseCase {
  execute(): Promise<Array<CategoryProtocol>>;
}

export class ShowCategoryController {
  constructor(private showcategoryRepository: ShowCategoryUseCase) {}
  async handler(req: Request, res: Response): Promise<Response> {
    return res.status(200).json(await this.showcategoryRepository.execute());
  }
}

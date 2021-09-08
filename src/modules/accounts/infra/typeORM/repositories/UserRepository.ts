import { getRepository } from "typeorm";
import { Repository } from "typeorm";
import { IUser } from "../../../Protocols/User/UserProtocol";
import { IUserRepository } from "../../../Protocols/User/UserRepository";
import { User } from "../entities/UserAccount";

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }
  async create({
    name,
    email,
    password,
    driver_license,
    id,
    avatar
  }: IUser): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id
    });
    await this.repository.save(user)
  }
  async findByEmail(email:string):Promise<IUser>{
    const user=await this.repository.findOne({email})
    return user
  }
  async findById(id:string):Promise<IUser>{
    const user=await this.repository.findOne(id)
    return user
  }
}

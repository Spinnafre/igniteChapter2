import { IUser } from '../../../Protocols/User/UserProtocol';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid4 } from "uuid";

@Entity("users")
export class User implements IUser{
    @PrimaryColumn()
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    driver_license: string;
    @Column()
    admin: boolean;
    @CreateDateColumn()
    @Column()
    avatar:string
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid4();
        }
    }
}

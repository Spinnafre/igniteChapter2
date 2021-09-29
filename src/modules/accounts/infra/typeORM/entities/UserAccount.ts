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
    @Column()
    avatar:string
    @CreateDateColumn()
    created_at: Date;

    get avatar_url():string{
        switch (process.env.disk){
            case 'local':
                return `http://localhost:3333/avatar/${this.avatar}`
            case 's3':
                return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
            default:
                return null
        }
    }

    constructor() {
        if (!this.id) {
            this.id = uuid4();
        }
    }
}

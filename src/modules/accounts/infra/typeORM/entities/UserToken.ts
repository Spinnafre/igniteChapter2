import { User } from './UserAccount';
import { Entity, PrimaryColumn,CreateDateColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { IUserToken } from './../../../Protocols/Token/IUserToken';
import {v4 as uuidv4} from 'uuid'

@Entity('users_tokens')
class UsersTokens implements IUserToken{
    @PrimaryColumn()
    id: string;
    @Column()
    refresh_token: string;
    @Column()
    user_id: string;

    @ManyToOne(type=>User)
    @JoinColumn({name:'user_id'})
    user: User;

    @Column()
    expires_date: Date;
    @CreateDateColumn()
    created_at?: Date;

    constructor(){
        if(!this.id){
            this.id=uuidv4()
        }
    }

}

export {UsersTokens}
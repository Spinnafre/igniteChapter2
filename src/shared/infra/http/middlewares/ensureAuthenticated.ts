import { AppErrors } from '../../../errors/AppErrors';
import { UserRepository } from '../../../../modules/accounts/infra/typeORM/repositories/UserRepository';
import { NextFunction, Response,Request  } from 'express';
import { verify } from 'jsonwebtoken';

interface IToken{
    sub:string,
    ext:number
}

export async function authorizationUser(req:Request,res:Response,next:NextFunction){
    const headerToken= req.headers.authorization

    if(!headerToken){
        throw new AppErrors('No permission',401)
    }

    const [,token]=headerToken.split(" ")
    
    try {
        //Extraio as informações do token por meio da chave de acesso criada
        const {sub:id_user}=verify(token,'934850186e4397c2227e386e48fa40d4a8ee6302') as IToken
        const userRepository=new UserRepository()
        const user=await userRepository.findById(id_user)
        if(!user){
            throw new AppErrors('User not exists',400)
        }
        //Para tornar possível adicionar um novo atributo no request do express será necessário 
        // sobrescrever a tipagem do express, criando um arquivo @types com o nome da lib e com 
        // o arquivo de configuração da tipagem adicionando o novo atributo
        req.user={
            id:id_user
        }
        console.log(req.user)
        next()

    } catch (error) {
        throw new AppErrors(error.message,500)
    }
}
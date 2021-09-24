import { UserTokenRepository } from './../../../../modules/accounts/infra/typeORM/repositories/TokenRepository';
import { auth } from '../../../../config/auth';
import { AppErrors } from '../../../errors/AppErrors';
// import { UserRepository } from '../../../../modules/accounts/infra/typeORM/repositories/UserRepository';
import { NextFunction, Response,Request  } from 'express';
import { verify } from 'jsonwebtoken';


interface IToken{
    sub:string,
    ext:number
}

export async function authorizationUser(req:Request,res:Response,next:NextFunction){
    //Extrai o token
    const headerToken= req.headers.authorization

    if(!headerToken){
        throw new AppErrors('No permission',401)
    }
    const [,token]=headerToken.split(" ")
    
    try {
        //Extraio as informações do token por meio da chave de acesso criada
        const {sub:id_user}=verify(token,auth.secret_token) as IToken

        //Para tornar possível adicionar um novo atributo no request do express será necessário 
        // sobrescrever a tipagem do express, criando um arquivo @types com o nome da lib e com 
        // o arquivo de configuração da tipagem adicionando o novo atributo
        req.user={
            id:id_user
        }
        next()

    } catch (error) {
        throw new AppErrors(error.message,500)
    }
}
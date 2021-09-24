import { Connection} from 'typeorm';
import supertest from 'supertest'
import {app} from '../../../../shared/infra/http/app'
import { hash } from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import createConnection from '../../../../shared/infra/typeORM'

//Criar a conexão com o banco de dados de teste
// Criar usuário admin
//Passar o token em cada requisição

let connection:Connection
describe('Create Category Controller', () => {
    beforeAll(async()=>{
        connection=await createConnection()
        //Irá criar os esquemas do banco de dados
        await connection.runMigrations()
        const password =await hash('admin',8)
        await connection.query(`INSERT INTO users(id, name, email, password,driver_license,"admin",created_at) 
        VALUES('${uuidv4()}','admin','admin@gmail.com','${password}','XXXXXX',true,'now()')
        `)
        
    })
    afterAll(async()=>{
        await connection.dropDatabase()
        await connection.close()
    })
    it('should be able to create a category',async ()=>{
        const session=await supertest(app)
        .post('/session')
        .send({
            email:"admin@gmail.com",
            password:"admin"
        })


        const resp=await supertest(app)
        .post('/categories')
        .send({
            name:"category test",
            description: "test category"
        })
        .set({
            Authorization:`Bearer ${session.body.refreshToken}`
        })
        
        expect(resp.status).toBe(201)
    })
    it('should not be able to create a category with name exists',async ()=>{
        const session=await supertest(app)
        .post('/session')
        .send({
            email:"admin@gmail.com",
            password:"admin"
        })


        const resp=await supertest(app)
        .post('/categories')
        .send({
            name:"category test",
            description: "test category"
        })
        .set({
            Authorization:`Bearer ${session.body.refreshToken}`
        })
        
        expect(resp.status).toBe(400)
    })
})
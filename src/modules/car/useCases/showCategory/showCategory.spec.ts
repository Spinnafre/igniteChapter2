import { Connection} from 'typeorm';
import supertest from 'supertest'
import {app} from '../../../../shared/infra/http/app'
import { hash } from 'bcrypt';
import {v4 as uuidv4} from 'uuid'
import createConnection from '../../../../shared/infra/typeORM'

let connection:Connection
describe('List categories', () => {
    beforeAll(async()=>{
        connection=await createConnection()
        await connection.runMigrations()
        const password =await hash('admin',8)
        await connection.query(`INSERT INTO users(id, name, email, password,driver_license,"admin",created_at) 
        VALUES('${uuidv4()}','admin','admin@gmail.com','${password}','XXXXXX',true,'now()')`)
    })
    afterAll(async()=>{
        await connection.dropDatabase()
        await connection.close()
    })

    it('should be able to list all categories',async()=>{
        const session=await supertest(app)
        .post('/session')
        .send({
            email:"admin@gmail.com",
            password:"admin"
        })

        await supertest(app)
        .post('/categories')
        .send({
            name:"category test",
            description: "test category"
        })
        .set({
            Authorization:`Bearer ${session.body.token}`
        })

        const categories=await supertest(app)
        .get('/categories')
        .set({
            Authorization:`Bearer ${session.body.token}`
        })

        expect(categories.status).toBe(200)
        expect(categories.body.length).toBe(1)
        
    })
})
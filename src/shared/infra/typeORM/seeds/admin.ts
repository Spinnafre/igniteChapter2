import {hash} from 'bcrypt'
import {v4 as uuidv4} from 'uuid'
import createConnection from '../index'
async function createSeed(){
    const connection=await createConnection()
    const password= await hash('admin',8)
    await connection.query(`INSERT INTO users(id, name, email, password,driver_license,"admin",created_at) 
    VALUES('${uuidv4()}','admin','admin@gmail.com','${password}','XXXXXX',true,'now()')
    `)

    await connection.close()
}

createSeed().then(_=>console.log('User admin created successfully'))
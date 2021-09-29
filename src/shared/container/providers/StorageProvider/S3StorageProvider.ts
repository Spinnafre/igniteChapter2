import upload  from '../../../../config/upload';
import { S3 } from "aws-sdk";

import fs from "fs/promises";
import mime from "mime";
import { resolve } from "path";

import { IStorageProvider } from "./Protocols/IStorageProvider";

export class S3StorageProvider implements IStorageProvider{
    private static instance:IStorageProvider|null=null
    private client:S3
    private constructor(){
        this.client=new S3({
            region:process.env.AWS_BUCKET_REGION
        })
    }
    public static getInstance(){
        if(!S3StorageProvider.instance){
            S3StorageProvider.instance= new S3StorageProvider()
        }
        return S3StorageProvider.instance
    }
    async save(file: string, folder: string): Promise<string> {
        const filePath=resolve(upload.tmpFolder,file)
        const ContentType= mime.getType(filePath)
        
        const fileContent=await fs.readFile(filePath)

        await this.client.putObject({
            Bucket:`${process.env.AWS_BUCKET}/${folder}`,
            Key:file,
            //Irá ficar visível para o público visualizar
            ACL:'public-read',
            Body:fileContent,
            //Importante para conseguir previsualizar o arquivo no Browser
            ContentType
        })
        .promise()
        return file
    }
    async delete(file: string, folder: string): Promise<string> {
        await this.client.deleteObject({
            Bucket:`${process.env.AWS_BUCKET}/${folder}`,
            Key:file
        })
        .promise()
        return file
    }
}
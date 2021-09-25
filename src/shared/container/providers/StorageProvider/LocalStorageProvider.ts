import { resolve } from 'path';
import fs from 'fs';
import upload from '../../../../config/upload'

import { IStorageProvider } from './Protocols/IStorageProvider';
export class localStorageProvider implements IStorageProvider{
    async save(file:string,folder:string): Promise<string> {
        // Irá pegar o arquivo que está salvo dentro da tmp,
        //irá jogar ele dentro da pasta especificada
        await fs.promises.rename(
            resolve(upload.tmpFolder,file),
            resolve(`${upload.tmpFolder}/${folder}`,file)
        )
        return file
    }
    async delete(file:string,folder:string): Promise<string> {
        // Diretório do arquivo que irá apagar
        const filename=resolve(`${upload.tmpFolder}/${folder}`,file)
        try {
            // Irá verificar se o arquivo está no diretório
            await fs.promises.stat(filename)
        } catch (error) {   
            // Se não estiver no diretório irá sair do método
            return
        }
        // Irá remover o arquivo 
        await fs.promises.unlink(filename)
    }

} 
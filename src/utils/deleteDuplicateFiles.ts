import fs  from 'fs';
export const deleteFile=async(filename:string)=>{
    try {
        // Verifica se o arquivo já existe
        await fs.promises.stat(filename)
    } catch (error) {
        // Se não existir irá sair
        return 
    }
    // Se o arquivo já existir irá excluir ele
    await fs.promises.unlink(filename)

}
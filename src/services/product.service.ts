import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const createProduct = async (body: any) => {
    try{
        
        let result = await prisma.user.create({
            data:body
        })
        return(result)
        
    }catch (e){
        return("bad")
    }
}

const updateProduct = async (body: any) => {
    try{
        const {username,password,name,phone, id} = body
        let result = await prisma.user.update({
            where:{
                id: id
            },
            data:body
        })
        return(result)
        
    }catch (e){
        return("bad")
    }
}
// const findProduct = async (body: any) => {
//     try{
//         const {username,password,name,phone} = body
//         let result = await prisma.user.find({
//             data:{username,password,name,phone}
//         })
//         return(result)
        
//     }catch (e){
//         return("bad")
//     }
// }
const deleteProduct = async (body: any) => {
    try{
        const {username,password,name,phone} = body
        let result = await prisma.user.create({
            data:{username,password,name,phone}
        })
        return(result)
        
    }catch (e){
        return("bad")
    }
}

export default {createProduct,updateProduct}
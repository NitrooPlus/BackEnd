import {Request,Response,NextFunction,Router} from 'express'
import create_product from './controller/create_product'
import delete_product from './controller/delete_product'
import get_product from './controller/get_product'


const router=Router()

router.get('/get_product',async(req:Request,res:Response,next:NextFunction)=>{
    let request:any=req.query

    let data=await get_product(request.url,request.company_url)

    res.status(data.status).json(data.content)

})

router.post('/create_product',async(req:Request,res:Response,next:NextFunction)=>{
    let request:any=req.query

    let data=await create_product(req.body,request.user)

    res.status(data.status).json(data.content)

})


router.delete('/delete_product',async(req:Request,res:Response,next:NextFunction)=>{
    
    let request:any=req.query
    console.log(request)
    let data=await delete_product(request.url,request.user,request.company_url)

    res.status(data.status).json(data.content)

})


export default router
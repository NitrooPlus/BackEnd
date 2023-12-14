import {Request,Response,NextFunction,Router} from 'express'
import multer from 'multer'
import path from 'path'
import search_company from './controller/get_company'
import search_product from './controller/get_product'

const router=Router()

router.get('/company',async(req:Request,res:Response,next:NextFunction)=>{
    console.log(1)

    const request:any=req.query

    let data=await search_company(request.q,request.skip || 0,request.count || 12)

    res.status(data.status).json(data.content)
    
})



router.get('/product',async(req:Request,res:Response,next:NextFunction)=>{
    console.log(1)

    const request:any=req.query

    let data=await search_product(request.q,request.skip || 0,request.count || 12)

    res.status(data.status).json(data.content)
    
})


export default router
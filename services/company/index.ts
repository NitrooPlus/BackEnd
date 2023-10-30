import {Request,Response,NextFunction,Router} from 'express'
import get_company_information from './controller/get_company_information'
import delete_company from './controller/delete_company'
import create_company from './controller/create_company'


const router=Router()


router.get('/get_company_information',async(req:Request,res:Response,next:NextFunction)=>{
    
    let request:any=req.query

    let data=await get_company_information(request.url)

    res.status(data.status).json(data.content)

})

router.delete('/delete_company',async(req:Request,res:Response,next:NextFunction)=>{
    
    let request:any=req.query

    let data=await delete_company(request.url,request.user)

    res.status(data.status).json(data.content)

})

router.post('/create_company',async(req:Request,res:Response,next:NextFunction)=>{
    let request:any=req.query

    let data=await create_company(req.body,request.user)

    res.status(data.status).json(data.content)

})



export default router
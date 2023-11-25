import {Request,Response,NextFunction,Router} from 'express'
import add_to_basket from './controller/add_to_basket'
import delete_from_basket from './controller/delete_from_basket'
import get_basket_list from './controller/get_basket_list'


const router=Router()

router.get('/get_basket_list',async(req:Request,res:Response,next:NextFunction)=>{
    
    let request:any=req.query

    let data=await get_basket_list(request.user)

    res.status(data.status).json(data.content)

})

router.post('/add_to_basket',async(req:Request,res:Response,next:NextFunction)=>{
    let request:any=req.query

    let data=await add_to_basket(request.user,req.body.product_id)

    res.status(data.status).json(data.content)

})


router.delete('/delete_from_basket',async(req:Request,res:Response,next:NextFunction)=>{
    
    let request:any=req.query

    let data=await delete_from_basket(request.user,request.product_id)

    res.status(data.status).json(data.content)

})


export default router
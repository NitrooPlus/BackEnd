import {Request,Response,NextFunction,Router} from 'express'
import sign_up from './controller/sign_up'
import bcrypt from 'bcrypt'
import verify_phone from './controller/verify_phone'
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Phone } from './validation/phone';
import transform_error from '../../helper/transform_error';

const router=Router()

router.post('/send_code',async(req:Request,res:Response,next:NextFunction)=>{
       
        //validate user with validation schema start ...
        const obj=plainToInstance(Phone,req.body)

        const err= await validate(obj);

        const errObj=transform_error(err);

        if(Object.keys(errObj)?.[0])
            return res.status(400).json(errObj)
            

        //end

        const token=700000
        let hashed=await bcrypt.hash(`${req.body.phone}${process.env.BCRYPT_KEY}${token}`,10)
        res.status(200).json({hashed})

})

router.post('/verify_phone',async(req:Request,res:Response,next:NextFunction)=>{
    
    let data=await verify_phone(req.body.phone,req.body.hashed,req.body.code)

    if(data.content.token){
        let content:any=data.content
        res.cookie(process.env.COOKIE_NAME || 'cookie',content.token,{httpOnly:true,expires: new Date(Date.now() + 900000000)})
        res.status(data.status).json(data.content)
    }
    else
        res.status(data.status).json(data.content)

})

router.post('/sign_up',async(req:Request,res:Response,next:NextFunction)=>{
    
    let data=await sign_up(req.body)

    if(data.status==200){
        let content:any=data.content
        res.cookie(process.env.COOKIE_NAME || 'cookie',content.token,{httpOnly:true,expires: new Date(Date.now() + 900000000)})
        res.status(data.status).json(data.content)
    }
    else
        res.status(data.status).json(data.content)

})

router.get('/log_out',async(req:Request,res:Response,next:NextFunction)=>{

    res.cookie(process.env.COOKIE_NAME || 'cookie','deleted',{httpOnly:true})
    res.clearCookie(process.env.COOKIE_NAME || 'cookie',{httpOnly:true})
    res.json({status:'token deleted'})
    res.end()

})


router.get('/get_user',async(req:Request,res:Response,next:NextFunction)=>{

        
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0");
        res.status(200).json(req.query.user)
        res.end()

})

export default router
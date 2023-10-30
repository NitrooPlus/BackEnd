import express,{Express,Request,Response,NextFunction} from 'express'
import body_parser from 'body-parser'
import cors from 'cors'
import cookie_parser from 'cookie-parser'
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
import db from './DB/db'
import { check_auth } from './helper/check_auth'
import auth_service from './services/auth/index'

const app:Express=express()

app.use(cors({credentials:true,origin:true}))
app.use(body_parser.json())
app.use(body_parser.urlencoded({extended:true}))
app.use(cookie_parser())

app.use(async(req:Request,res:Response,next:NextFunction)=>{
    try{

    const result:any=await check_auth(req.cookies?.[process.env.COOKIE_NAME || 'cookie'],async(dec)=>{
        return true
    })

    if(result.status==200 && result?.decoded?.id){

        
        const users: any[] =await db.execute(`SELECT id,first_name,last_name,phone from user where id=${result?.decoded?.id}`);

        if (users?.[0]?.[0])
            req.query.user=users[0][0]
        else
            req.query.user={}
    }
}catch(e){

}finally{
    next()
}

})

app.use('/auth',auth_service)

app.get('/',async(req:Request,res:Response,next:NextFunction)=>{

    res.status(200).json({message:'welcome'})

})

app.listen(process.env.PORT ? +process.env.PORT : 8000)
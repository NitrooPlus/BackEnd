import {Request,Response,NextFunction,Router} from 'express'
import {CustomerProfile} from './controller/CustomerProfile'
import {validateCustomerProfile} from './validation/CustomerProfile'

const router=Router()

router.post('/create_customer',async(req:Request,res:Response,next:NextFunction)=>{
       
        const obj=plainToInstance(CustomerProfile,req.body)

        const err= await validateCustomerProfile(obj);

        const errObj=transform_error(err);

        if(Object.keys(errObj)?.[0])
            return res.status(400).json(errObj)
            

        //end

        const customerProfile=new CustomerProfile(...obj)
        await customerProfile.save()
        res.status(200).json(customerProfile)

})

router.get('/get_customer',async(req:Request,res:Response,next:NextFunction)=>{

    const customerProfile=await CustomerProfile.findOne({_id:req.query.id})
    if(!customerProfile)
        return res.status(404).json({status:'not found'})

    res.status(200).json(customerProfile)

})

router.put('/update_customer',async(req:Request,res:Response,next:NextFunction)=>{
       
        const obj=plainToInstance(CustomerProfile,req.body)

        const err= await validateCustomerProfile(obj);

        const errObj=transform_error(err);

        if(Object.keys(errObj)?.[0])
            return res.status(400).json(errObj)
            

        //end

        const customerProfile= await CustomerProfile.findOneAndUpdate({_id:req.query.id},{...obj}, {new:true})
        if(!customerProfile)
            return res.status(404).json({status:'not found'})

        res.status(200).json(customerProfile)

})

router.delete('/delete_customer',async(req:Request,res:Response,next:NextFunction)=>{

    const customerProfile= await CustomerProfile.findOneAndDelete({_id:req.query.id})
    if(!customerProfile)
        return res.status(404).json({status:'not found'})

    res.status(200).json({status:'deleted'})

})

export default router

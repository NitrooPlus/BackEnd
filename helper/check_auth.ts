import jwt from 'jsonwebtoken';


export const check_auth=async(token:any,state:(e:any)=>Promise<boolean>)=>{
        if(!token){
            return({message:'No token provided',status:401})
        }
        else {
            try {
                var decoded = jwt.verify(token, process.env.JWT_KEY || 'iust');

                const a=await state(decoded)

                if(a)
                  return{status:200,decoded:decoded}
                else
                  return({message:'Not permission',status:403})
              } catch(err) {
                  return({message:'Token is not true',status:401})
              }
        }
}
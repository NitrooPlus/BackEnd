import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";
import { plainToInstance } from "class-transformer";
import { Company } from "../validation/company";
import { validate } from "class-validator";
import transform_error from "../../../helper/transform_error";

async function create_company(company:any,user:any) {
  try {
    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }
    //validate company with validation schema start ...
    const obj=plainToInstance(Company,company)

    const err= await validate(obj);

    const errObj=transform_error(err);

    if(Object.keys(errObj)?.[0])
        return({status:400,content:errObj})

    //end


    await db.execute(`INSERT INTO company (title,url,location,logo,description,for_user)
    VALUES ('${obj.title}','${obj.url}','${obj.location}',${obj.logo ? `'${obj.logo}'`:null},${obj.description ? `'${obj.description}'`:null},${user.id})`);

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}

  } catch (e:any) {
    console.log(e.message)
    if(e?.message?.indexOf("company.title_index")>=0)
      return {status:400,content:{title:'عنوان تکراری است'}}

    if(e?.message?.indexOf("company.url_index")>=0)
      return {status:400,content:{url:'عنوان تکراری است'}}

    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
    
  }
}

export default create_company;

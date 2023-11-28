import { plainToInstance } from "class-transformer";
import db from "../../../DB/db";
import { validate } from "class-validator";
import transform_error from "../../../helper/transform_error";
import { Product } from "../validation/product";

async function create_product(product:any,user:any) {
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }

    //validate company with validation schema start ...
    const obj=plainToInstance(Product,product)

    const err= await validate(obj);

    const errObj=transform_error(err);

    if(Object.keys(errObj)?.[0])
        return({status:400,content:errObj})

    //end

    const company:any=await db.execute(`SELECT id from company where for_user=${user.id} AND url='${obj.company_url}'`);

    if(!company?.[0]?.[0]?.id)
        return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }


    await db.execute(`INSERT INTO products (title,url,price,short_description,description,company_id,images)
    VALUES ('${obj.title}','${obj.url}',${obj.price},${obj.short_description ? `'${obj.short_description}'`:null},${obj.description ? `'${obj.description}'`:null},${company[0][0].id},${obj.images?.length >0 ?`'${JSON.stringify(obj.images)}'`:null})`);

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}

  } catch (e:any) {
    console.log(e)
    if(e?.message?.indexOf("fk_company_product_unique")>=0)
      return {status:400,content:{url:'عنوان تکراری است'}}
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
    
  }
}

export default create_product;

import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";

async function get_company_information(url:string) {
  try {

    if(!url)
        return {status:400,content:{message:'نام غرفه باید مشخص باشد'}}

    let data:any=await db.execute(`SELECT c.id,c.title,c.url,c.last_seen,c.description,c.logo,c.header_image,c.create_date,count(p.id) as product_count
    FROM 
    company c
    LEFT JOIN products p
    ON c.id=p.company_id
    where c.url='${url}'
    group by c.id`)

    if(data?.[0]?.[0])
        return {status:200,content:data[0][0]}
    else
        return {status:404,content:{message:'غرفه یافت نشد'}}

  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default get_company_information;

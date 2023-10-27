import bcrypt from "bcrypt";
import db from "../../../DB/db";
import jwt from "jsonwebtoken";

async function get_company_information(url:string) {
  try {

    if(!url)
        return {status:400,content:'نام غرفه باید مشخص باشد'}

    let data:any=await db.execute(`SELECT c.id,c.persian_name,c.english_name,c.last_seen,c.description,c.logo,c.create_date,count(p.id) as product_count
    FROM 
    company c
    LEFT JOIN products p
    ON c.id=p.company_id
    where c.english_name='${url}'
    group by c.id`)

    if(data?.[0]?.[0])
        return {status:200,content:data[0][0]}
    else
        return {status:404,content:'غرفه یافت نشد'}

  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default get_company_information;

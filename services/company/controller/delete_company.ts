import db from "../../../DB/db";

async function delete_company(url:string) {
  try {

    if(!url)
        return {status:400,content:'نام غرفه باید مشخص باشد'}

    let data:any=await db.execute(`DELETE FROM 
    company c
    where c.english_name='${url}'`)

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default delete_company;

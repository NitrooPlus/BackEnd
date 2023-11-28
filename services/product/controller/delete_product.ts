import db from "../../../DB/db";

async function delete_product(url:string,user:any,company_url:string) {
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }
    
    if(!url || !company_url)
        return {status:400,content:'نام غرفه و محصول باید مشخص باشد'}

    const company:any=await db.execute(`SELECT id from company where for_user=${user.id} AND url='${company_url}'`);

    if(!company?.[0]?.[0]?.id)
        return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }

    await db.execute(`DELETE FROM 
    products c
    where c.url='${url}' AND company_id=${company[0][0].id}`)

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default delete_product;


async function delete_customer(url:string,user:any) {
  /*
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }
    
    if(!url)
        return {status:400,content:'نام غرفه باید مشخص باشد'}

    let data:any=await db.execute(`DELETE FROM 
    company c
    where c.url='${url}' AND for_user=${user.id}`)

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
  */
}

export default delete_customer;

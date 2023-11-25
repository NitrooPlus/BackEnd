import db from "../../../DB/db";

async function delete_from_basket(user:any,product_id:string) {
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }

    if(product_id)
        await db.execute(`DELETE FROM 
        basket
        where user_id=${user.id} AND product_id=${product_id}
        LIMIT 1`)
    else
        await db.execute(`DELETE FROM 
            basket
            where user_id=${user.id}`)


    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
  } catch (e) {
    console.log(e)
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default delete_from_basket;

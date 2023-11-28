import db from "../../../DB/db";

async function add_to_basket(user:any,product_id:string) {
  try {

    if(!user?.id)
      return { status: 403, content: { message: "شما توانایی این کار را ندارید" } }


    if(!product_id)
      return { status: 400, content: { message: "درخواست اشتباه است" } }

        await db.execute(`INSERT INTO basket (user_id,product_id)
        VALUES(${user.id},${product_id})`)

    return {status:200,content:{message:'عملیات با موفقیت انجام شد'}}
  } catch (e) {
    return { status: 500, content: { message: "مشکلی پیش آمده است" } };
  }
}

export default add_to_basket;